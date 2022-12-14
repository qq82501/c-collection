import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import Breadcrumb from "../components/UI/Breadcrumb";
import ImagesViewer from "../components/UI/ImagesViewer";
import ProductInfo from "../components/products/ProductInfo";
import styles from "./ProductDetailPage.module.css";

function ProductDetailPage() {
  const product = useLoaderData();
  const path = [...product.category, product.title];

  useEffect(() => {
    document.title = `C.Collection — ${product.title}`;
  }, [product.title]);

  return (
    <div>
      <Breadcrumb categoryPath={path} />
      <main
        className={`${styles.product_detail__main_container} breadcrumb__height`}
      >
        <ImagesViewer product={product} />
        <ProductInfo product={product} />
      </main>
    </div>
  );
}

export default ProductDetailPage;
