import styles from "./OrderItem.module.css";
import Input from "../UI/Input";

function OrderItem(props) {
  const { product } = props;
  console.log(product);

  return (
    <div className={styles.order_item__container}>
      <img
        alt="order item"
        src={require(`../../images/products/${product.productNo}/01.jpg`)}
      />
      <div className={styles.order_item__info_box}>
        <Input labelTitle="品名 :" value={product.title} readOnly={true} />
        {product.selectedSpec && (
          <Input
            labelTitle="規格 :"
            value={product.selectedSpec}
            readOnly={true}
          />
        )}
        <Input labelTitle="數量 :" value={product.quantity} readOnly={true} />
        <Input
          labelTitle="單價 :"
          value={`${new Intl.NumberFormat("zh-Tw").format(product.price)} TWD`}
          readOnly={true}
        />
        <Input
          labelTitle="商品編號 :"
          value={product.productDetailNo}
          readOnly={true}
        />
      </div>
      <div className={styles.item_sum}>
        <Input
          labelTitle="品項總額 :"
          value={new Intl.NumberFormat("zh-Tw").format(
            product.price * product.quantity
          )}
          readOnly={true}
          postfix="TWD"
        />
      </div>
    </div>
  );
}
export default OrderItem;
