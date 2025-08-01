import React from 'react'

const CategoryAdd = () => {
    return (
        <section className='max-w-xl'>
            <label className='block text-[24px] text-left'>Add Category</label>
            <form action="#" method="post">
                <div className='mx-4 my-4 flex flex-col'>
                    <p className='text-[18px] text-left'>Name</p>
                    <input type="text" className='my-4 border px-3 py-2 rounded w-64 d-flex text-left h-[42px] w-[400px]' value="" placeholder='Enter Category Name' />
                    <div className='left-5'>
                        <input type="submit" className=' text-center my-2 w-32 text-left bg-[var(--color-green)] text-white px-4 py-1.5 rounded hover:bg-blue-700' value="Clear" />
                        <input type="submit" className='m-2 text-center my-2 w-32 text-left bg-[var(--color-highlight)] text-white px-4 py-1.5 rounded hover:bg-blue-700' value="Save" />
                    </div>

                </div>
            </form>
        </section>
    )
}

export default CategoryAdd