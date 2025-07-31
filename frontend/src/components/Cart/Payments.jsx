import React, { useState } from "react";

const Payments = () => {
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
  const [selectedMethodId, setSelectedMethodId] = useState(
    paymentMethods[0].id
  );
  const [mobileNumber, setMobileNumber] = useState("");
  const [screenshot, setScreenshot] = useState(null);
console.log(screenshot);

  const selectedMethod = paymentMethods.find(
    (method) => method.id === selectedMethodId
  );
  return (
    <div className="bg-[var(--color-white)] p-6 rounded-xl w-full text-left">
      <h2 className="text-[var(--color-black)] text-2xl mb-6 border-b py-4 text-left">
        Payment
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
          Scan to Pay with {selectedMethod.label}
        </label>
        <div className="w-40 h-40 border border-[var(--color-black)] rounded-md overflow-hidden">
          <img
            src={selectedMethod.qr}
            alt={`${selectedMethod.label} QR Code`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Upload Transaction Screenshot */}
      <div className="mb-6">
        <label className="block text-sm text-[var(--color-black)] mb-1">
          Upload Transaction Screenshot
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
      <button className="w-full mt-6 px-4 py-2 bg-[var(--color-black)] text-[var(--color-white)] rounded-xl hover:opacity-90 transition">
        Pay Now
      </button>
    </div>
  );
};

export default Payments;
