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

export const wait = function (milisecond) {
  return new Promise(function (resolve, reject) {
    const timer = setInterval(() => {
      return resolve(timer);
    }, milisecond);
  });
};

const getPath = function (selected) {
  const parentCategory = categories.find((category) =>
    category.childCat.some((child) => child.title === selected)
  )?.title;
  const path = parentCategory ? [parentCategory, selected] : [selected];
  return path;
};

export const getProductsData = async function (category) {
  const path = getPath(category);
  const res = await fetch(
    "https://c-collection-default-rtdb.firebaseio.com/products.json"
  );
  const data = await res.json();
  const products = data.filter((product) =>
    product.category.includes(category)
  );
  return { products, path };
};

export const getProductDetail = async function (productNo) {
  const res = await fetch(
    "https://c-collection-default-rtdb.firebaseio.com/products.json"
  );
  const data = await res.json();
  const product = data.find((product) => product.productNo === productNo);
  return product;
};

export const addToCart = async function (para) {
  const formData = await para.request.formData();
  const product = {
    productNo: formData.get("productNo"),
    title: formData.get("title"),
    spec: formData.get("spec"),
    price: formData.get("price"),
    img: formData.get("img"),
  };
  console.log(product);

  // const res = await fetch(
  //   "https://c-collection-default-rtdb.firebaseio.com/products.json"
  // );
};

export const getAllProducts = async function () {
  const res = await fetch(
    "https://c-collection-default-rtdb.firebaseio.com/products.json"
  );
  const products = await res.json();
  return products;
};

export const getMembers = async function () {
  const res = await fetch(
    "https://c-collection-default-rtdb.firebaseio.com/members.json"
  );
  const members = await res.json();
  return members;
};
export const getDelivery = async function () {
  const res = await fetch(
    "https://c-collection-default-rtdb.firebaseio.com/delivery.json"
  );
  const delivery = await res.json();
  return delivery;
};
