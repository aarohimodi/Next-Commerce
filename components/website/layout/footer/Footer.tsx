import FooterColumn from "./FooterColumn";
import { quickLinks, customerLinks, contactInfo } from "./footerData";
function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4">
        <div>
          <h2 className="mb-4 text-3xl font-bold">ShopHub</h2>
          <p className="text-gray-400">
            Your one-stop destination for premium fashion and lifestyle
            products.
          </p>
        </div>
        <FooterColumn title="Quick Links" links={quickLinks} />
        <FooterColumn title="Customer" links={customerLinks} />
        <div>
          <h3 className="mb-5 text-lg font-semibold">Contact</h3>
          <div className="space-y-3 text-gray-400">
            <p>{contactInfo.address}</p>
            <p>{contactInfo.email}</p>
            <p>{contactInfo.phone}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-gray-400">
        © 2026 ShopHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
