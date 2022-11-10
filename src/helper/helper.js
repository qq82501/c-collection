import { redirect } from "react-router-dom";

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
  const membersObject = await res.json();
  const members = [];

  for (const key in membersObject) {
    members.push(membersObject[key]);
  }
  return members;
};

export const getMember = async function (account) {
  const members = await getMembers();
  const member = members.find((member) => member.account === account);
  return member;
};

export const updateMember = async function (userData) {
  const allMembers = await getMembers();
  let existedUserIndex = allMembers.findIndex(
    (member) => member.account === userData.account
  );
  if (existedUserIndex > -1) {
    allMembers[existedUserIndex] = {
      ...allMembers[existedUserIndex],
      ...userData,
    };
  }

  const res = await fetch(
    "https://c-collection-default-rtdb.firebaseio.com/members.json",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allMembers),
    }
  );

  return res;
};

export const addNewMember = async function ({ request }) {
  const formData = await request.formData();
  const member = {
    account: formData.get("email"),
    password: formData.get("password"),
    lastName: formData.get("lastName"),
    firstName: formData.get("firstName"),
    contact: formData.get("phone"),
    birthday: formData.get("birthday"),
    address: formData.get("address"),
    creditCard: {
      cardNumber: formData.get("cardNumber"),
      expiry: formData.get("expire"),
      csv: formData.get("csv"),
    },
  };

  await fetch("https://c-collection-default-rtdb.firebaseio.com/members.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
  return redirect("/");
};

export const getDelivery = async function () {
  const res = await fetch(
    "https://c-collection-default-rtdb.firebaseio.com/delivery.json"
  );
  const delivery = await res.json();
  return delivery;
};

export const getAllOrders = async function () {
  const res = await fetch(
    "https://c-collection-default-rtdb.firebaseio.com/order.json"
  );
  const ordersObject = await res.json();
  const orders = [];
  for (const key in ordersObject) {
    orders.push(ordersObject[key]);
  }
  return orders;
};

export const getMemberOrders = async function (account) {
  const member = await getMember(account);
  const memberOrderArr = member?.order ? [...member.order] : [];
  const orders = await getAllOrders();

  const orderDetailArr = memberOrderArr.reduce((acc, orderNo) => {
    const foundOrder = orders.find((order) => order.orderNo === orderNo);
    acc.push(foundOrder);
    return acc;
  }, []);

  return orderDetailArr;
};

export const getOrderDetail = async function (orderNo) {
  const orders = await getAllOrders();
  const order = orders.find((item) => item.orderNo === orderNo);
  return order;
};
