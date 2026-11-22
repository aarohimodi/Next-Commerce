import ProductMain from "@/components/admin/product/ProductMain";
import {
  getCategoryCount,
  getOrderCount,
  getproductCount,
  getUserCount,
} from "@/lib/adminState";

export default async function AdminPage() {
  const pcount = await getproductCount();
  const ccount = await getCategoryCount();
  const ocount = await getOrderCount();
  const ucount = await getUserCount();
  return (
    <>
      <ProductMain
        pcount={pcount}
        ccount={ccount}
        ucount={ucount}
        ocount={ocount}
      />
    </>
  );
}
