import { useLoaderData } from "react-router-dom";
import Breadcrumb from "../components/UI/Breadcrumb";
import ProductItem from "../components/products/ProductItem";
import styles from "./ProductsListPage.module.css";

function ProductsListPage() {
  const { products, path } = useLoaderData();
  console.log(path);

  const productsContent = products.map((product) => {
    return <ProductItem product={product} key={product.productNo} />;
  });

  return (
    <div className={styles.product_list__container}>
      <Breadcrumb categoryPath={path} />
      <div className={styles.products_list__grid}> {productsContent}</div>
    </div>
  );
}

export default ProductsListPage;
