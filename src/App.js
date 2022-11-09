import "./App.css";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import WelcomePage from "./pages/WelcomePage";
import ProductsListPage from "./pages/ProductsListPage";
import {
  getProductsData,
  getProductDetail,
  getDelivery,
  addNewMember,
  getMember,
} from "./helper/helper";
import ProductDetailPage from "./pages/ProductDetailPage";
// import Page2 from "./pages/Page2";
import MyWishListPage from "./pages/MyWishListPage";
import MyCartPage from "./pages/MyCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import initialStateThunk from "./thunk/initiateStateThunkAction";
import RegisterPage from "./pages/RegisterPage";
import MemberProfilePage from "./pages/MemberProfilePage";
import MemberEdit from "./components/member/MemberEdit";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialStateThunk());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <WelcomePage /> },
        {
          path: "product/:category",
          element: <ProductsListPage />,
          loader: ({ params }) => {
            return getProductsData(params.category);
          },
        },
        {
          path: "product/:category/:childCategory",
          element: <ProductsListPage />,
          loader: ({ params }) => {
            return getProductsData(params.childCategory);
          },
        },
        {
          path: "productDetail/:productNo",
          element: <ProductDetailPage />,
          loader: ({ params }) => {
            return getProductDetail(params.productNo);
          },
        },
        {
          path: "myWishList",
          element: <MyWishListPage />,
        },
        {
          path: "myCart",
          element: <MyCartPage />,
          loader: getDelivery,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "memberProfile/:account",
          element: <MemberProfilePage />,
          loader: ({ params }) => {
            return getMember(params.account);
          },
          children: [
            {
              path: "edit",
              element: <MemberEdit />,
            },
          ],
        },
      ],
    },
    {
      path: "/addNewMember",
      action: addNewMember,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
