import React, { useEffect } from 'react'
import { useState } from 'react';
import camera_icon from "../../../assets/camera.svg";
import plus_icon from "../../../assets/plus_icon.svg";
import { addProduct, getCategory } from '../../../api/apiService';
import ProductAttributeAddModal from '../../../components/Product/ProductAttributeAddModal';
import { Navigate } from 'react-router-dom';

const mockVariants = [
    {
        id: 1,
        name: "Size",
        value: "M, L, XL"
    },
    {
        id: 2,
        name: "Color",
        value: "Red, Black, Blue"
    },

];

const productAdd = () => {
    const [categoriesList, setCategoriesList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {

        getCategories()

    }, [])

    const getCategories = async (e) => {
        setIsLoading(true);
        try {
            const response = await getCategory()
            setCategoriesList(response.data)

        } catch (error) {
            setError("error");
        } finally {
            setIsLoading(false);
        }
    };

    const [selectedValue, setSelectedValue] = useState('');
    const [isDiscountOn, setIsDiscountOn] = useState(false);

    const [title, setTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.0)
    const [active, setActive] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [discountStart, setDiscountStart] = useState('')
    const [discountEnd, setDiscountEnd] = useState('')
    const [productPhoto, setProductPhoto] = useState(null)
    const [image, setImage] = useState(null)

    const handleActive = (e) => {
        e.preventDefault();
        setActive(!active);
    };

    const handleDiscount = (e) => {
        e.preventDefault();
        setDiscount(!discount);
    };

    const handleImgFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(e.target.files[0]);
            setProductPhoto(URL.createObjectURL(file));
        }
    };

    const [showAttributeAddModal, setShowAttributeAddModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const openAttrModal = () => {
        setShowAttributeAddModal(true);
    };
    const closeAttrModal = () => {
        setShowAttributeAddModal(false);
    };

    const handleAddAttr = async (data) => {

        const newId = attributes.length > 0 ? Math.max(...attributes.map(a => a.id)) + 1 : 1;
        const newAttribute = {
            id: newId,
            name: data.name,
            value: data.value
        };
        setAttributes(prev => [...prev, newAttribute]);

        closeAttrModal()
    };

    const [attributes, setAttributes] = useState([
        { id: 1, name: "Origin", value: "China" },
        { id: 2, name: "Material", value: "Wool" }
    ]);

    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };
    const handleAttrDelete = () => {
        setAttributes(prev => prev.filter(attr => !selectedIds.includes(attr.id)));
        setSelectedIds([]); // reset selection
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = {
                category: selectedCategory,
                title,
                description,
                price,
                is_active: active,
                image,
                attributes
            };

            // if (isEdit) {
            //     await updateCategory(id, data);
            // } else {
            //     await addCategory(data);
            // }

            const formData = new FormData();
            formData.append('category', selectedCategory);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('is_active', active);
            formData.append('image', image); // must be File object

            // attributes is an array of objects — send as JSON string
            formData.append('attributes', JSON.stringify(attributes));

            for (const pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }


            await addProduct(formData);

            Navigate("/admin/products");

        } catch (error) {
            console.error(error);
            setError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className=''>
            <label className='block text-[18px] text-left'>Product Info</label>
            {error && <p className="text-red-500">{error}</p>}
            <form className='grid grid-cols-2 gap-4 p-4'
                onSubmit={handleSubmit}>
                <div className='mx-4 my-2 flex flex-col col'>
                    <div className='text-left'>
                        <p className='text-[14px] text-left'>Name</p>
                        <input type="text"
                            className='text-[14px] my-2 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[400px]'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Enter Name' />
                    </div>
                    <div className='text-left'>
                        <p className='text-[14px] text-left'>Category</p>
                        <select
                            id="selectBox"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="text-[14px] my-2 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[400px]"
                        >
                            <option value="">-- Select --</option>
                            {categoriesList.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.title}
                                </option>
                            ))}
                        </select>

                        {selectedValue && (
                            <p className="text-[14px] mt-3 text-green-600">
                                Selected: {categoriesList.find(opt => opt.value === selectedValue)?.label}
                            </p>
                        )}
                    </div>
                    <div className='text-left'>
                        <p className=' text-[14px] text-left'>Description</p>
                        <textarea
                            rows={5}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className='text-[14px] my-2 border px-3 py-2 rounded w-64 d-flex text-left h-[120px] w-[400px]'
                            placeholder='Enter Description' />
                    </div>
                    <div className='text-left'>
                        <p className='text-[14px] text-left'>Price</p>
                        <input
                            type="text"
                            className='text-[14px] my-2 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[400px]'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder='Enter Price' />
                    </div>
                    <div className='text-left'>
                        <span className='text-[14px] text-left'>Active</span>
                        <button
                            onClick={(e) => handleActive(e)}
                            className={`ml-3 w-12 h-6 items-center rounded-full p-1 transition duration-300 ${active ? 'bg-[var(--color-highlight)]' : 'bg-gray-300'
                                }`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${active ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </button>

                    </div>

                    <div className='text-left flex'>
                        <div className='flex items-center h-[42px] my-2'>
                            <span className='text-[14px] text-left'>Discount</span>
                            <button
                                onClick={e => handleDiscount(e)}
                                className={`ml-3 w-12 h-6 items-center rounded-full p-1 transition duration-300 ${discount ? 'bg-[var(--color-highlight)]' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${discount ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>

                        {discount && (
                            <input
                                type="text"
                                className='text-[14px] ml-[32px] my-2 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[120px]'
                                value={discountPercentage}
                                onChange={e => setDiscountPercentage(e.target.value)}
                                placeholder='Enter Discount'
                                disabled={!discount}
                            />
                        )}

                    </div>
                    {discount && (
                        <div className='text-left'>
                            <p className='text-[14px] text-left'>Discount Duration</p>
                            <input type="date"
                                className='text-[14px] my-2 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[200px]'
                                value={discountStart}
                                onChange={e => setDiscountStart(e.target.value)}
                                disabled={!discount}
                                placeholder='Enter Start' />
                            <input
                                type="date"
                                className='ml-2 text-[14px] my-2 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[200px]'
                                value={discountEnd}
                                onChange={e => setDiscountEnd(e.target.value)}
                                disabled={!discount}
                                placeholder='Enter End' />
                        </div>
                    )}

                    <div className='left-5'>
                        <input type="button" className=' text-center my-2 w-32 text-left bg-[var(--color-green)] text-white px-4 py-1.5 rounded hover:bg-blue-700' value="Clear" />
                        <input
                            type="submit"
                            className='m-2 text-center my-2 w-32 text-left bg-[var(--color-highlight)] text-white px-4 py-1.5 rounded hover:bg-blue-700'
                            value="Save" />
                    </div>
                </div>
                <div className='flex-col col'>
                    <img src={productPhoto} alt="preview" className='w-[326px] h-[205px]' />
                    <div className='relative text-left'>
                        <div className="relative text-left mt-2">
                            <img
                                src={camera_icon}
                                alt="camera"
                                className="absolute left-[86px] top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60 pointer-events-none"
                            />

                            {/* Hidden File Input */}
                            <input
                                id="fileUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImgFileChange}
                                className="hidden"
                            />

                            {/* Styled Label acts as Button */}
                            <label
                                htmlFor="fileUpload"
                                className="block text-center my-2 w-[326px] bg-[var(--color-highlight)] text-white px-4 py-1.5 rounded hover:bg-blue-700 cursor-pointer"
                            >
                                Upload Photo
                            </label>
                        </div>

                    </div>

                    <div className='text-left mt-2'>
                        <div className='flex place-content-between'>
                            <p className='text-[14px] text-left my-2'>Attributes</p>
                            <div className='relative text-left'
                                onClick={() => openAttrModal()}>
                                <img
                                    src={plus_icon}
                                    alt="plus"
                                    className="absolute left-[12px] top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-80"
                                />
                                <input
                                    type="button"
                                    className=' text-center my-2 w-[44px] bg-[var(--color-green)] text-white px-4 py-1.5 rounded hover:bg-blue-700'
                                    value="" />

                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 text-sm text-left">
                                <thead className="bg-[var(--color-section)]">
                                    <tr>
                                        <th className="p-3 border w-[20px]"></th>
                                        <th className="p-3 border w-[40px]">Name</th>
                                        <th className="p-3 border w-[40px]">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attributes.map((attribute) => (
                                        <tr
                                            key={attribute.id}
                                            className="odd:bg-[var(--color-white)] even:bg-[var(--color-section)] hover:opacity-60">
                                            <td className="p-3 border w-[20px]">
                                                <input
                                                    type="checkbox"
                                                    id={attribute.id}
                                                    checked={selectedIds.includes(attribute.id)}
                                                    onChange={() => handleCheckboxChange(attribute.id)}
                                                />
                                            </td>
                                            <td className="p-3 border w-[40px]">{attribute.name}</td>
                                            <td className="p-3 border w-[40px]">{attribute.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='text-right'>
                                <input
                                    type="button"
                                    onClick={handleAttrDelete}
                                    className=' text-center my-2 w-32 text-left bg-[var(--color-warning)] text-white px-4 py-1.5 rounded hover:opacity-60'
                                    value="Delete" />
                            </div>
                        </div>
                    </div>

                    <div className='text-left mt-2'>
                        <p className='text-[14px] text-left my-2'>Variants</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 text-sm text-left">
                                <thead className="bg-[var(--color-section)]">
                                    <tr>
                                        <th className="p-3 border w-[20px]"></th>
                                        <th className="p-3 border w-[40px]">Size</th>
                                        <th className="p-3 border w-[40px]">Color</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockVariants.map((attribute, index) => (
                                        <tr
                                            key={index}
                                            className="odd:bg-[var(--color-white)] even:bg-[var(--color-section)] hover:opacity-60">
                                            <td className="p-3 border w-[20px]">
                                                <input type="checkbox" name="" id={index} />
                                            </td>
                                            <td className="p-3 border w-[40px]">{attribute.name}</td>
                                            <td className="p-3 border w-[40px]">{attribute.value}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div className='text-right'>
                                <input type="button" className=' text-center my-2 w-32 text-left bg-[var(--color-highlight)] text-white px-4 py-1.5 rounded hover:opacity-60' value="Edit" />
                            </div>
                        </div>
                    </div>

                </div>
            </form>
            <ProductAttributeAddModal
                show={showAttributeAddModal}
                title="Add Attribute"
                message="Are you sure you want to delete?"
                handleAddAttr={handleAddAttr}
                onCancel={closeAttrModal}
            />
        </section>
    )
}

export default productAdd