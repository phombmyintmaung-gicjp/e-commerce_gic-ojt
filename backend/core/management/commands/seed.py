import os
import requests
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from faker import Faker
from random import uniform, randint, choice
from core.models import Product, Category

fake = Faker()

class Command(BaseCommand):
    help = "Seed fake products with images"

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Number of fake products to create')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        categories = list(Category.objects.all())

        if not categories:
            self.stdout.write(self.style.ERROR("⚠️ No categories found. Creating some first."))
            for _ in range(5):  # Create 5 sample categories
                category = Category.objects.create(
                    title=fake.word().capitalize(),
                    description=fake.sentence(nb_words=10)
                )
                categories.append(category)
            self.stdout.write(self.style.SUCCESS(f"✅ Created {len(categories)} categories."))
            return

        for _ in range(total):
            title = fake.unique.word().capitalize() + " " + fake.word().capitalize()
            description = fake.sentence(nb_words=15)
            price = round(uniform(10.0, 999.99), 2)
            stock = randint(5, 100)
            attributes = {
                "color": fake.color_name(),
                "material": fake.word(),
                "weight": f"{round(uniform(0.1, 5.0), 2)} kg"
            }

            # Get a random category
            category = choice(categories)

            # Download a random image
            image_file = None
            img_name = f"{fake.uuid4()}.jpg"
            image_url = f"https://dummyimage.com/600x600/cccccc/000000&text={title}+Image"

            try:
                response = requests.get(image_url, timeout=5)
                if response.status_code == 200:
                    image_file = ContentFile(response.content, img_name)
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"⚠️ Failed to download image: {e}"))


            # Create the product
            product = Product(
                category=category,
                title=title,
                description=description,
                price=price,
                attributes=attributes
            )

            if image_file:
                product.image.save(img_name, image_file, save=False)

            product.save()

        self.stdout.write(self.style.SUCCESS(f"✅ Created {total} fake products with images."))
