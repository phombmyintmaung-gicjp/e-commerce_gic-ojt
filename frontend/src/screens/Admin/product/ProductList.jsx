import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../../assets/edit_icon.svg";
import DeleteIcon from "../../../assets/delete_icon.svg";
const mockCategories = [
    {
        id: 1,
        name: "Men Wear",
        creationDate: "2025-07-29"
    },
    {
        id: 2,
        name: "Girl Wear",
        creationDate: "2025-07-20"
    },
    {
        id: 3,
        name: "Shoes",
        email: "charlie@example.com",
        creationDate: "2025-07-25",
    },
    {
        id: 4,
        name: "Watches",
        email: "david@example.com",
        creationDate: "2025-07-18",
    },
    {
        id: 5,
        name: "Accessories",
        creationDate: "2025-07-28"
    },
    {
        id: 6,
        name: "Baby Wear",
        email: "frank@example.com",
        creationDate: "2025-07-27",
    }
];
const mockProducts = [
    {
        id: 1,
        name: "Levi T-shirt",
        category: 1,
        price: 89000,
        creationDate: "2025-07-29",
        variants: [
            {
                id: 1,
                size: 'xl',
                color: 'white',
                price: 90000,
            },
            {
                id: 2,
                size: 'l',
                color: 'white',
                price: 89000,
            },
            {
                id: 3,
                size: 'xl',
                color: 'blue',
                price: 90000,
            },
            {
                id: 3,
                size: 'xl',
                color: 'blue',
                price: 89000,
            },
        ]
    },
    {
        id: 2,
        name: "Jean Trouser",
        category: 2,
        price: 600,
        creationDate: "2025-07-20",
        variants: null
    },
    {
        id: 3,
        name: "Slipper",
        category: 3,
        price: 100000,
        creationDate: "2025-07-25",
        variants: null
    },
    {
        id: 4,
        name: "Casino Watch",
        category: 4,
        price: 609,
        creationDate: "2025-07-18",
        variants: null

    },
    {
        id: 5,
        name: "Rayben Sun Glass",
        category: 5,
        price: 20,
        creationDate: "2025-07-28",
        variants: null

    },
    {
        id: 6,
        name: "Lee Jean Jacket",
        category: 1,
        price: 100000,
        creationDate: "2025-07-28",
        variants: null

    }
];
const ProductList = () => {

    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState(""); // "name" | "date"
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const categoryMap = Object.fromEntries(mockCategories.map(cat => [cat.id, cat.name]));

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleCategoryChange = (e) => {
        e.preventDefault()
        setCategory(e.target.value)

    }

    const filteredProducts = mockProducts
        .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortType === "name") return a.name.localeCompare(b.name);
            if (sortType === "date")
                return new Date(b.creationDate) - new Date(a.creationDate);
            return 0;
        });

    const totalPages = Math.ceil(filteredProducts.length / usersPerPage);
    const paginateProduct = filteredProducts.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    return (
        <section className='max-w'>
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by Product Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded w-64"
                />
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="border px-3 py-2 rounded">
                    <option value="">--Category--</option>
                    {mockCategories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="border px-3 py-2 rounded">
                    <option value="">Sort By</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="date">Order Date (Latest)</option>
                </select>
                <button className="bg-[var(--color-green)] text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Product
                </button>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-[var(--color-section)]">
                        <tr>
                            <th className="p-3 border">No</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Creation Date</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginateProduct.map(product => (
                            <React.Fragment key={product.id}>
                                <tr className="border-t">
                                    <td className="p-2 border">{product.id}</td>
                                    <td className="p-2 border">{product.name}</td>
                                    <td className="p-2 border">{categoryMap[product.category]}</td>
                                    <td className="p-2 border">{product.price.toLocaleString()} </td>
                                    <td className="p-2 border">{product.creationDate}</td>
                                    <td className="p-3 border space-x-2 flex items-center">
                                        <Link
                                            to={`/admin/products/${product.id}/edit`}
                                            className="text-blue-600 hover:underline">
                                            <img
                                                src={EditIcon}
                                                alt="Edit"
                                                className="w-6 h-6 transition hover:opacity-90"
                                            />
                                        </Link>
                                        <Link className="text-[var(--color-warning)] hover:underline">
                                            <img
                                                src={DeleteIcon}
                                                alt="Delete"
                                                className="w-6 h-6 transition hover:opacity-90"
                                            />
                                        </Link>
                                    </td>
                                </tr>
                                {product.variants && product.variants.length > 0 && (
                                    product.variants.map((v, i) => (
                                        <tr className="border-b bg-gray-50" key={`${v.id}-${i}`}>
                                            <td className="p-2 border"></td>
                                            <td className="p-2 border">- {v.size.toUpperCase()} / {v.color.toUpperCase()}</td>
                                            <td className="p-2 border"></td>
                                            <td className="p-2 border">{v.price} </td>
                                            <td className="p-2 border">{product.creationDate}</td>
                                            <td className="p-3 border ">

                                            </td>

                                        </tr>
                                    ))
                                )}
                            </React.Fragment>
                        ))}

                        {paginateProduct.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-3 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2 text-[14px]">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2">
                    {"<"}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => goToPage(num)}
                        className={`px-3 py-1 rounded ${num === currentPage
                            ? "bg-[var(--color-highlight)] text-[var(--color-black)]"
                            : "text-[var(--color-black)]"
                            }`}>
                        {num}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2">
                    {">"}
                </button>
            </div>
        </section>
    )
}

export default ProductList