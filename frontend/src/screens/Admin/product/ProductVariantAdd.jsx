import React, { useState } from 'react'

const mockProducts = [
    {
        id: 1,
        name: "Levi T-shirt",
        creationDate: "2025-07-29"
    },
    {
        id: 2,
        name: "Jean Trouser",
        creationDate: "2025-07-20"
    },
    {
        id: 3,
        name: "Slipper",
        creationDate: "2025-07-25",
    },
    {
        id: 4,
        name: "Casino Watch",
        creationDate: "2025-07-18",
    },
    {
        id: 5,
        name: "Rayben Sun Glass",
        creationDate: "2025-07-28"
    }
];
const sizes = ["XS", "S", "M", "L", "XL"];
const colors = [
    { name: "Black", value: "black", hex: "#000000" },
    { name: "Navy", value: "navy", hex: "#001f3f" },
    { name: "Gray", value: "gray", hex: "#808080" },
    {
        name: "White",
        value: "white",
        hex: "#ffffff",
        border: "border border-gray-300",
    },
];
const ProductVariantAdd = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [isActiveOn, setIsActiveOn] = useState(false);
    const [isDefaultActiveOn, setIsDefaultActiveOn] = useState(false);
    const [selectedColor, setSelectedColor] = useState("black");
    const [selectedSize, setSelectedSize] = useState("M");

    const handleToggle = (e) => {
        // optional: e.preventDefault(); if inside a form
        e.preventDefault();
        setIsActiveOn(!isActiveOn);
    };

    const handleDefaultToggle = (e) => {
        // optional: e.preventDefault(); if inside a form
        e.preventDefault();
        setIsDefaultActiveOn(!isDefaultActiveOn);
    };

    const handleColorChange = (e) => {
        e.preventDefault();
        setSelectedColor(e.target.value)
    }

    const handleProductChange = (e) => {
        e.preventDefault();
        setSelectedProduct(e.target.value)
    }

    return (
        <section>
            <div className='container'>
                <label className='block text-[24px] text-left'>Product Variants</label>
                <form action="#" method="post" className='flex'>
                    <div className='mx-4 my-4 flex flex-col'>
                        <p className='text-[14px] text-left'>Product</p>
                        <select
                            id="selectBox"
                            value={selectedProduct}
                            onChange={handleProductChange}
                            className="text-[14px] my-2 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[400px]"
                        >
                            <option value="">-- Select --</option>
                            {mockProducts.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>

                        <div className='text-left my-2'>
                            <span className='text-[14px] text-left'>Variant</span>
                            <button
                                onClick={handleToggle}
                                className={`ml-3 w-12 h-6 items-center rounded-full p-1 transition duration-300 ${isActiveOn ? 'bg-[var(--color-highlight)]' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isActiveOn ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                />
                            </button>

                        </div>
                        <div className=" rounded-xl w-[400px] overflow-hidden shadow-lg bg-white">
                            <div className="px-4 py-4">
                                <h2 className="text-left mb-2 text-base text-[14px]">Product Variant</h2>
                                <div className='flex gap-3'>
                                    <div>
                                        <p className='text-left'>size</p>
                                        <input type="text" className='my-4 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[86px]' placeholder='Size' />
                                    </div>
                                    <div>
                                        <p className='text-left'>color</p>
                                        <select id="color_picker" className='my-4 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[86px]'
                                            onChange={handleColorChange}
                                        >
                                            {colors.map((color) => (
                                                <option key={color.id} value={color.id}
                                                    style={{ backgroundColor: color.hex }}
                                                    title={color.name}
                                                    aria-label={color.name}>
                                                    {color.name}
                                                </option>
                                            ))}

                                        </select>
                                    </div>

                                    <div className='content-center pt-[1.5rem] text-left my-'>
                                        <div className='align-text-bottom align-bottom'>
                                            <span className='text-[14px] text-left'>Default</span>
                                            <button
                                                onClick={handleDefaultToggle}
                                                className={`ml-3 w-12 h-6 items-center rounded-full p-1 transition duration-300 ${isDefaultActiveOn ? 'bg-[var(--color-highlight)]' : 'bg-gray-300'
                                                    }`}
                                            >
                                                <div
                                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isDefaultActiveOn ? 'translate-x-6' : 'translate-x-0'
                                                        }`}
                                                />
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-2 text-right '>
                            <input type="submit" className='text-center my-2 w-32 text-left bg-[var(--color-highlight)] text-white px-4 py-1.5 rounded hover:opacity-90' value="Save" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ProductVariantAdd