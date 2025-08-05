from django.apps import AppConfig
from django.db.models.signals import post_migrate



def populate_townships(sender, **kwargs):
    print("🗂️ Populating Townships from CSV...")
    from .models import Region, Township
    import os
    import csv
    from django.conf import settings
    print("🗂️ Populating Townships from CSV...")
    from .models import Region, Township

    csv_path = os.path.join(settings.BASE_DIR, 'Myanmar_Locations_Postal_Code_EN.csv')

    if not os.path.exists(csv_path):
        print(f"⚠️ CSV file not found at {csv_path}")
        return

    seen = set()
    with open(csv_path, newline='', encoding='utf-8-sig') as f:  # ✅ fixed here
        reader = csv.DictReader(f)
        print(f"CSV headers: {reader.fieldnames}")  # ✅ debug print (can remove later)

        for row in reader:
            region_name = row['Region'].strip()
            township_name = row['Town / Township'].strip()

            if (region_name, township_name) in seen:
                continue
            seen.add((region_name, township_name))

            region, _ = Region.objects.get_or_create(name=region_name)
            township, created = Township.objects.get_or_create(name=township_name, region=region)

            if created:
                print(f"✔ Created: {township_name} in {region_name}")


        

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        print("Core app is ready")
        
        import core.signals  # Ensure signals are imported
        # post_migrate.connect(populate_townships, sender=self)  # ✅ This is the fix!
        print("🗂️ Populating Townships from CSV...")
        from .models import Region, Township
        import os
        import csv
        from django.conf import settings
        print("🗂️ Populating Townships from CSV...")
        from .models import Region, Township

        csv_path = os.path.join(settings.BASE_DIR, 'Myanmar_Locations_Postal_Code_EN.csv')

        if not os.path.exists(csv_path):
            print(f"⚠️ CSV file not found at {csv_path}")
            return

        seen = set()
        with open(csv_path, newline='', encoding='utf-8-sig') as f:  
            reader = csv.DictReader(f)
            print(f"CSV headers: {reader.fieldnames}") 

            for row in reader:
                region_name = row['Region'].strip()
                township_name = row['Town / Township'].strip()

                if (region_name, township_name) in seen:
                    continue
                seen.add((region_name, township_name))

                region, _ = Region.objects.get_or_create(name=region_name)
                township, created = Township.objects.get_or_create(name=township_name, region=region)

                if created:
                    print(f"✔ Created: {township_name} in {region_name}")
