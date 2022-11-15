import { useLoaderData, Link } from "react-router-dom";
import OutlineContainer from "../components/UI/OutlineContainer";
import styles from "./CategoryPage.module.css";

function CategoryPage() {
  const categories = useLoaderData();
  console.log(categories);

  const categoriesContent = categories.map((category) => {
    const childCategoruContent = category.childCat
      ? category.childCat.map((child) => {
          return (
            <Link to={child.to} className={`link`} key={child.title}>
              {child.title}
            </Link>
          );
        })
      : "";
    return (
      <>
        <div key={categories.title} className={styles.parent_category}>
          <Link to={category.to} className={`link`}>
            {category.title}
          </Link>
        </div>
        <div className={styles.child_catogories}>{childCategoruContent}</div>
      </>
    );
  });

  return (
    <div className={styles.category_product__container}>
      <OutlineContainer title="商品類別">
        <div className={styles.category_box}>{categoriesContent}</div>
      </OutlineContainer>
    </div>
  );
}

export default CategoryPage;
