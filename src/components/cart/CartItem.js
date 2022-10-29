import styles from "./CartItem.module.css";
import Input from "../UI/Input";
import useAddCart from "../../hook/useAddCart";

function CartItem(props) {
  console.log(props.product.quantity);
  const { addToCartHandler } = useAddCart(props.product);

  const quantitySelection = Array.from(
    { length: props.product.quantity + 9 },
    (cur, i) => i + 1
  );
  return (
    <div className={styles.cart_item__container}>
      <img
        className={styles.cart_item__img}
        alt="product"
        src={require(`../../images/products/${props.product.imgPath}`)}
      />
      <div className={styles.cart_item__info_box}>
        <div>
          <Input
            type="text"
            readOnly={true}
            labelTitle="品名 : "
            value={props.product.title}
          />
          {props.product.spec && (
            <Input
              type="text"
              readOnly={true}
              labelTitle="規格 : "
              value={props.product.spec}
            />
          )}

          <Input
            type="text"
            readOnly={true}
            labelTitle="數量 : "
            value={props.product.quantity}
            selection={quantitySelection}
            onChange={addToCartHandler.bind(
              null,
              props.product,
              props.product.spec,
              props.product.quantity
            )}
          />
        </div>
        <p className={styles.cart_item__productNo}>{props.product.productNo}</p>
      </div>
      <div className={styles.cart_item__price_box}>
        <Input
          type="text"
          readOnly={true}
          labelTitle="金額 : "
          value={`${props.product.price}`}
          postfix="TWD"
        />
      </div>
    </div>
  );
}

export default CartItem;
