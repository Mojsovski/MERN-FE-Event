import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constans";

function FooterLayout() {
  return (
    <div className="flex flex-col bg-slate-900 items-center justify-between px-6 py-10 text-center lg:flex-row lg:text-left xl:p-20">
      <Image
        src={"/images/general/logo.svg"}
        alt="logo"
        className="mb-4 lg:w-60 w-40"
        width={200}
        height={100}
      />
      <div className="flex flex-col mb-4 gap-4 lg:mb-0">
        <div>
          <h4 className="text-xl text-white">Customer Services</h4>
          <p className="text-gray-600">
            <Link href="mailto:hello@acara.id">hello@acara.id</Link> |{" "}
            <Link href="tel:+621234567890">+6212 3456 7890</Link> |{" "}
          </p>
        </div>
        <div>
          <h4 className="text-xl text-white">Office</h4>
          <p className="text-gray-600">Jl. Mangundipuro No 33, Jakarta</p>
        </div>
      </div>

      <div className="mb-10 flex flex-col gap-2 lg:mb-0 ">
        <h4 className="text-xl text-white">Menu</h4>
        <h2 className="text-xl flex lg:flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={`footer-${item.label}`}
              href={item.href}
              className="cursor-pointer   text-gray-600 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </h2>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-row items-center justify-between gap-8 text-grey-800">
          {SOCIAL_ITEMS.map((item) => (
            <Link
              href={item.href}
              className="text-3xl text-gray-600 hover:text-white"
              key={`footer-${item.label}`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <p className="w-full text-center text-gray-600">
          Copyright © 2025 Acara. All right reserved
        </p>
      </div>
    </div>
  );
}

export default FooterLayout;
