import { Link } from "react-router-dom";
import styles from "./Category.module.css";

const categories = [
  {
    title: "耳環",
    to: "/product/耳環",
    childCat: [
      { title: "夾式耳環", to: "/product/耳環/夾式耳環" },
      {
        title: "穿孔式耳環",
        to: "/product/耳環/穿孔式耳環",
      },
    ],
  },
  { title: "戒指", to: "/product/戒指", childCat: [] },
];

function Category(props) {
  const categoryContent = categories.map((category, i) => (
    <div className={styles.categories_item} key={i}>
      <Link to={category.to} className={`${styles.main_category} link`}>
        {category.title}
      </Link>
      <ul className={styles.child_item_box}>
        {category.childCat.map((child, i) => (
          <li key={i}>
            <Link to={child.to} className="link">
              {child.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
  return (
    <div className={styles.category_box} onMouseLeave={props.onMouseLeave}>
      {categoryContent}
    </div>
  );
}

export default Category;
