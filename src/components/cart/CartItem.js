import styles from "./CartItem.module.css";
import Input from "../UI/Input";

const product = {
  imgPath: "p002-001-004/01.jpg",
  price: 350,
  productNo: "p002-001-004-M",
  quantity: 1,
  spec: "M",
  title: "天際。925純銀戒指/金",
};

const quantitySelection = Array.from({ length: 10 }, (cur, i) => i + 1);

function CartItem() {
  return (
    <div className={styles.cart_item__container}>
      <img
        className={styles.cart_item__img}
        alt="product"
        src={require(`../../images/products/${product.imgPath}`)}
      />
      <div>
        <Input
          type="text"
          readOnly={true}
          labelTitle="品名 : "
          value={product.title}
        />
        <Input
          type="text"
          readOnly={true}
          labelTitle="規格 : "
          value={product.spec}
        />
        <Input
          type="text"
          readOnly={true}
          labelTitle="數量 : "
          value={product.quantity}
          selection={quantitySelection}
        />
      </div>
      <div className={styles.cart_item__price_box}>
        <Input
          type="text"
          readOnly={true}
          labelTitle="金額 : "
          value={`${product.price}`}
          postfix="TWD"
        />
      </div>
    </div>
  );
}

export default CartItem;
