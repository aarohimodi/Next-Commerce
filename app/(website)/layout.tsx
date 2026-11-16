import Footer from "@/components/website/layout/footer/Footer";
import Navbar from "@/components/website/layout/navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Commerce",
  description: "Modern Ecommerce Website",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
