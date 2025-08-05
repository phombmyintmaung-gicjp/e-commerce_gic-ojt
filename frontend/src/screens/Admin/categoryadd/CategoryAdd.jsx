import React, { useState } from 'react'
import { addCategory } from '../../../api/apiService'

const CategoryAdd = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const data = {
                title
            };
            const response = await addCategory(data);
            console.log(response);


        } catch (error) {
            console.error(error.response.data.detail);
            setError("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='max-w-xl'>
            <label className='block text-[24px] text-left'>Add Category</label>
            <form method="post" onSubmit={handleSubmit}>
                <div className='mx-4 my-4 flex flex-col'>
                    <p className='text-[18px] text-left'>Name</p>
                    <input type="text" className='my-4 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[400px]' onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Enter Category Name' />
                    <div className='left-5'>
                        <input type="button" className=' text-center my-2 w-32 text-left bg-[var(--color-green)] text-white px-4 py-1.5 rounded hover:bg-blue-700' value="Clear" />
                        <input type="submit" className='m-2 text-center my-2 w-32 text-left bg-[var(--color-highlight)] text-white px-4 py-1.5 rounded hover:bg-blue-700' value="Save" />
                    </div>

                </div>
            </form>
        </section>
    )
}

export default CategoryAdd