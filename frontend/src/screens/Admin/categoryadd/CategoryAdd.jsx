import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { addCategory, updateCategory, getCategoryById } from "../../../api/apiService";

const CategoryForm = () => {
    const { id } = useParams(); // get id if editing
    const navigate = useNavigate();
    const isEdit = !!id;

    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation()
    
    useEffect(() => {
        if (isEdit && location.state) {
            const category = location.state;
            console.log(category);  // You should see the full category object
            setTitle(category.title);  // Set the title if it exists
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = { title };

            if (isEdit) {
                await updateCategory(id, data);
            } else {
                await addCategory(data);
            }

            navigate("/admin/categories");

        } catch (error) {
            console.error(error);
            setError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='max-w-xl'>
            <label className='block text-[24px] text-left'>
                {isEdit ? "Edit Category" : "Add Category"}
            </label>
            <form onSubmit={handleSubmit}>
                <div className='mx-4 my-4 flex flex-col'>
                    <p className='text-[18px] text-left'>Name</p>
                    <input
                        type="text"
                        className='my-4 border px-3 py-2 rounded text-left h-[42px] w-[400px]'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Enter Category Name'
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='left-5'>
                        <input
                            type="button"
                            onClick={() => setTitle('')}
                            className='text-center my-2 w-32 bg-[var(--color-green)] text-white px-4 py-1.5 rounded hover:bg-blue-700'
                            value="Clear"
                        />
                        <input
                            type="submit"
                            className='m-2 text-center my-2 w-32 bg-[var(--color-highlight)] text-white px-4 py-1.5 rounded hover:bg-blue-700'
                            value={isEdit ? "Update" : "Save"}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CategoryForm;
