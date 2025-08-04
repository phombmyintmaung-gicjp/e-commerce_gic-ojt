const OrderEdit = () => {
  const cartItems = [
    {
      id: 1,
      name: "Classic White T-Shirt Product’s Name Long Product Names Include",
      color: "White",
      size: "M",
      price: 200000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Denim Jeans",
      color: "Blue",
      size: "L",
      price: 350000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Classic White T-Shirt Product’s Name Long Product Names Include",
      color: "White",
      size: "M",
      price: 200000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      name: "Denim Jeans",
      color: "Blue",
      size: "L",
      price: 350000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 5,
      name: "Classic White T-Shirt Product’s Name Long Product Names Include",
      color: "White",
      size: "M",
      price: 200000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 6,
      name: "Denim Jeans",
      color: "Blue",
      size: "L",
      price: 350000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80",
    },
  ];
  return (
    <section>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Section - Cart */}
        <div className="bg-[var(--color-white)] p-6 rounded-xl w-full lg:w-2/3">
          <h2 className="text-[var(--color-black)] text-2xl mb-6 border-b py-4 text-left">
            Order Details
          </h2>
          {/* Header Row */}
          <div className="grid grid-cols-[2fr_0.5fr_1fr] items-center text-[14px] font-semibold text-[var(--color-black)] pb-2 px-2">
            <span className="justify-self-start">Product</span>
            <span className="justify-self-center">Quantity</span>
            <span className="justify-self-end">Price</span>
            <span className="justify-self-end w-4"> </span>
          </div>
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[2fr_0.5fr_1fr] items-center gap-2 border border-[var(--color-black)] p-3 mt-4 rounded-lg text-[var(--color-black)]">
              {/* Product */}
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[65px] h-[65px] object-cover rounded-md border"
                />
                <div className="text-left">
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-[10px] text-[var(--color-dark-gray)] my-2.5">
                    Color: {item.color}
                  </p>
                  <p className="text-[10px] text-[var(--color-dark-gray)]">
                    Size: {item.size}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="items-center bg-[var(--color-dark-gray)] rounded">
                <span className="px-3 py-1 text-[var(--color-white)]">
                  {item.quantity}
                </span>
              </div>

              {/* Price */}
              <div className="justify-self-end text-sm">
                MMK {item.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        {/* Right Section - Summary & Payment */}
        <div className="lg:w-1/3">
          <div className="bg-[var(--color-white)] p-6 rounded-xl w-full mb-8">
            <h2 className="text-[var(--color-black)] text-2xl mb-6 border-b py-4 text-left">
              Cart Summary
            </h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[var(--color-dark-gray)]">Subtotal</span>
              <span>MMK 750,000</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-[var(--color-dark-gray)]">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-[var(--color-dark-gray)]">Tax</span>
              <span>MMK 100</span>
            </div>
            <div className="flex justify-between font-semibold text-md border-t pt-2">
              <span className="text-[var(--color-dark-gray)]">Total</span>
              <span>MMK 750,000</span>
            </div>
          </div>
          <div className="bg-[var(--color-white)] p-6 rounded-xl w-full text-left">
            <h2 className="text-[var(--color-black)] text-2xl mb-6 border-b py-4 text-left">
              Payment
            </h2>
            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-sm text-[var(--color-black)] mb-1">
                Payment Method
              </label>
              <input
                disabled
                type="text"
                placeholder="09xxxxxxxxx"
                value="KBZ Pay"
                onChange={(e) => setMobileNumber(e.target.value)}
                className="cursor-not-allowed w-full border border-[var(--color-black)] rounded-md px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            {/* Mobile Phone Number */}
            <div className="mb-4">
              <label className="block text-sm text-[var(--color-black)] mb-1">
                Mobile Phone Number
              </label>
              <input
                disabled
                type="text"
                placeholder="09xxxxxxxxx"
                value="09789456123"
                onChange={(e) => setMobileNumber(e.target.value)}
                className="cursor-not-allowed w-full border border-[var(--color-black)] rounded-md px-3 py-2 text-sm focus:outline-none"
              />
            </div>

            {/* QR Code */}
            <div className="mb-4">
              <label className="block text-sm text-[var(--color-black)] mb-1">
                Transaction Screenshot
              </label>
              <div className="w-40 h-40 border border-[var(--color-black)] rounded-md overflow-hidden">
                <img
                  src=""
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section - Shipping Status, Remark, Save */}
      <div className="flex flex-col items-start lg:flex-row gap-4 mt-8 bg-[var(--color-white)] p-6 rounded-xl">
        {/* Shipping Status */}
        <div className="flex-1">
          <select
            id="shippingStatus"
            className="w-full border border-gray-300 p-2 rounded text-sm">
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {/* Remark */}
          <div className="flex-1">
            <textarea
              id="remark"
              rows="3"
              className="w-full border border-gray-300 p-2 rounded text-sm resize-none mt-2"
              placeholder="Enter any notes or remarks here..."></textarea>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex items-end">
          <button
            type="button"
            className="bg-[var(--color-green)] hover:bg-opacity-80 text-white font-semibold py-2 px-6 rounded shadow-md">
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderEdit;
