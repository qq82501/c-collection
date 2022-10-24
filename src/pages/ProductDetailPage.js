import { useLoaderData } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";

function ProductDetailPage() {
  const product = useLoaderData();
  const path = [...product.category, product.title];
  console.log(product);
  return (
    <div className={`nav-bar__height`}>
      <Breadcrumb categoryPath={path} />
    </div>
  );
}

export default ProductDetailPage;
