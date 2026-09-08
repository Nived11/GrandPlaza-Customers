"use client";

import React from "react";

const PopularAddons = () => {
  const addons = [
    {
      id: 1,
      name: "Virgin Mint Mojito",
      price: "₹89.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAsayLdeBREiNenZkUupE_P0F6GbTM5MDpHTOyUwMuv_hRARmC8wW8GoF2NgTPuUXZ8MGZwfJK2McV7Ns5Qr1XgEw-sw1qhvZNUkptAibFcdFKq0hg6WAfjs7PheV3bfosArmSDStDTu5PocEybVUS3Ww9Rv06_V2QCqWn9tKAhdKJTZ03XbFFBYV9iq-O9n3XX4dj5zLxIjEPUWpX8zVZLeMxiKCn0DbCCQv2EBm4A0d0ac3j3Msfl",
      alt: "Virgin Mint Mojito with lime and fresh mint",
    },
    {
      id: 2,
      name: "Peri Peri Fries",
      price: "₹99.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCrD2qwxsaCUFTUQ22axNIUUiwea4a3jyGaVsXxZvNonOuzgymnOPNelU4QkqqNf_mmKjPebguVU-Q5kZv4pM3ZqG5Ki8tDmOS3QIqkcrJBmy7V2DLGDnget3Rhgm3qZbtzZBjf2XxGF9P-UBdv-2e_ahMxKu9mTIkq4pOKROLrxP7UezSlYs0r7nMsw8FPse38-osuFx6vOCdJSqa68HuUeS69FRNbAVCit29mXG2EpHrVO6_81zpN",
      alt: "Peri Peri Fries with seasoning and dipping sauce",
    },
    {
      id: 3,
      name: "Authentic Toum Dip",
      price: "₹40.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD0rzr_tYY74s3EUnrORtAsr13KwaLafS2sq8KfEdZ65c1qAw3JAgkcDR7pemybyECE9qYDvar_FhFHZBZiADU6MmPA1jUcmZlpq28s3WGhmoEGa8yBfQYS9XDyejbQbCRn0OvN44-brIbbBMQHv6FsynowGHSqDKmu6XNBRldn0veFYLmAMSWlduFQwRFnhpIxTuSvjBUNjc5EmBcbnCcmSc29WxvKc5Mtdm14_5bxOGOMFtkjffvi",
      alt: "Authentic Toum Dip",
    },
    {
      id: 4,
      name: "Hot Kuboos (2 pcs)",
      price: "₹30.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCEP3ULzqkr_9tT7i_hk8PG8LwpsX2ZU6iKvYUxztqCD92xUD6zlSohKcknHX0tpM4Kem7159vZJJ5VbBY0YoICNStd0EyC-_IVA2hLhv3pCJE_B9DxsgwKok3PYQXu22SyErARekOc821FsThncDqwVbXs3bqNi6FZx-A4k-GtMe3Wac3GJZ1iAN1UryshEDFiMWadJPmJSWJCdLqxLx8BoC56qUR52gZXaXMiARLOjhP_bf-vfnG",
      alt: "Hot Kuboos bread",
    },
  ];

  return (
    <section className="mt-10">
      {/* Section Heading */}
      <div className="flex items-end justify-between mb-5 border-b border-[#0F3D2E]/10 pb-2">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#D9A441] uppercase">
            COMPLETE YOUR MEAL
          </span>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0F3D2E] mt-0.5">
            Popular Add-ons in Malappuram
          </h2>
        </div>

        <a
          className="text-xs font-semibold text-[#0F3D2E] hover:text-[#D9A441] transition underline decoration-[#D9A441]/50 underline-offset-4"
          href="#menu"
        >
          View Full Menu
        </a>
      </div>

      {/* Add-on Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className="bg-white rounded-xl overflow-hidden shadow-warm-sm border border-[#0F3D2E]/5 group hover:shadow-warm-md transition-shadow"
          >
            {/* Image */}
            <div className="h-36 overflow-hidden relative bg-[#FBF6EC]">
              <img
                src={addon.image}
                alt={addon.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="text-sm font-serif font-bold text-[#0F3D2E]">
                {addon.name}
              </h3>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-[#D9A441]">
                  {addon.price}
                </span>

                <button
                  type="button"
                  className="w-7 h-7 rounded-full bg-[#FBF6EC] border border-[#0F3D2E]/15 text-[#0F3D2E] flex items-center justify-center text-lg font-medium hover:bg-[#0F3D2E] hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularAddons;