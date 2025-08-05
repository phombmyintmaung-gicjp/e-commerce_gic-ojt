import React, { useState } from "react";

const Setting = () => {
  const paymentMethods = [
    {
      id: "kbzpay",
      label: "KBZPay",
      qr: "https://th.bing.com/th/id/OIP.HaF9mUdtGyNX9VhHwEZkOQHaK-?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      id: "wavepay",
      label: "WavePay",
      qr: "https://th.bing.com/th/id/OIP.J8QjApp0J_E-nib1qZGAJAHaEK?w=326&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      id: "cbpay",
      label: "CB Pay",
      qr: "https://th.bing.com/th/id/OIP.eKCoPUQxQAj_WgnMS7icFgAAAA?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      id: "ayapay",
      label: "AYA Pay",
      qr: "https://th.bing.com/th/id/OIP.J8QjApp0J_E-nib1qZGAJAHaEK?w=326&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
  ];
  const regions = [
    { id: 1, name: "Yangon" },
    { id: 2, name: "Mandalay" },
    { id: 3, name: "Mon" },
  ];
  const [selectedMethodId, setSelectedMethodId] = useState(
    paymentMethods[0].id
  );
  const [selectedRegionId, setSelectedRegionId] = useState(regions[0].id);
  const [mobileNumber, setMobileNumber] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [tax, setTax] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const selectedMethod = paymentMethods.find(
    (method) => method.id === selectedMethodId
  );
  return (
    <section className="flex items-start justify-center">
      <div className="bg-[var(--color-section)] py-5 px-10 rounded-xl text-left">
        <h2 className="text-[var(--color-black)] text-[24px] mb-6 border-b py-4 text-left">
          Payment Setting
        </h2>
        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-sm text-[var(--color-black)] mb-1">
            Select Payment Method
          </label>
          <select
            className="w-full border border-[var(--color-black)] rounded-md px-3 py-2 text-sm focus:outline-none"
            value={selectedMethodId}
            onChange={(e) => setSelectedMethodId(e.target.value)}>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
        {/* Mobile Phone Number */}
        <div className="mb-4">
          <label className="block text-sm text-[var(--color-black)] mb-1">
            Mobile Phone Number
          </label>
          <input
            type="text"
            placeholder="09xxxxxxxxx"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full border border-[var(--color-black)] rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* QR Code */}
        <div className="mb-4">
          <label className="block text-sm text-[var(--color-black)] mb-1">
            Current QR Scan for {selectedMethod.label}
          </label>
          <div className="w-40 h-40 border border-[var(--color-black)] rounded-md overflow-hidden">
            <img
              src={selectedMethod.qr}
              alt={`${selectedMethod.label} QR Code`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Upload New Screenshot */}
        <div className="mb-4">
          <label className="block text-sm text-[var(--color-black)] mb-1">
            Upload New Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files[0])}
            className="w-full text-sm text-[var(--color-black)] file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-[var(--color-dark-gray)] file:text-white hover:file:opacity-90 cursor-pointer"
          />
          {screenshot && (
            <div className="flex justify-between items-center mt-2 px-2 py-1 bg-[var(--color-light-gray)] border rounded-md text-sm text-[var(--color-black)]">
              <span className="truncate max-w-[85%]">{screenshot.name}</span>
              <button
                onClick={() => setScreenshot(null)}
                className="text-[var(--color-warning)] hover:opacity-90 text-lg font-bold ml-2"
                title="Remove file">
                &times;
              </button>
            </div>
          )}
        </div>
        <button className="w-full mt-6 px-4 py-2 bg-[var(--color-green)] text-[var(--color-white)] rounded-xl hover:opacity-90 transition">
          Edit
        </button>
      </div>
      <div className="px-10 text-left">
        <div className="bg-[var(--color-section)] py-5 px-10 rounded-xl mb-5">
          <p className="border-b text-[24px] pb-5 mb-5">Tax Setting</p>
          <div className="mb-4">
            <label className="block text-sm text-[var(--color-black)] mb-1">
              Current Tax
            </label>
            <input
              type="text"
              placeholder="99%"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none"
            />
            <span>%</span>
            <button className="w-full mt-6 px-4 py-2 bg-[var(--color-green)] text-[var(--color-white)] rounded-xl hover:opacity-90 transition">
              Edit
            </button>
          </div>
        </div>
        <div className="bg-[var(--color-section)] py-5 px-10 rounded-xl">
          <p className="border-b text-[24px] pb-5 mb-5">
            Shipping Fees Setting
          </p>
          <div className="mb-4">
            <label className="block text-sm text-[var(--color-black)] mb-1">
              Choose Region
            </label>
            <select
              className="mb-4 w-full border border-[var(--color-black)] rounded-md px-3 py-2 text-sm focus:outline-none"
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
            <label className="block text-sm text-[var(--color-black)] mb-1">
              Shipping Fees
            </label>
            <input
              type="text"
              placeholder="2000MMK"
              value={shippingFee}
              onChange={(e) => setShippingFee(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none"
              required
            />
            <button className="w-full mt-6 px-4 py-2 bg-[var(--color-green)] text-[var(--color-white)] rounded-xl hover:opacity-90 transition">
              Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Setting;
