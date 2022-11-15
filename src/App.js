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
  getMember,
  getMemberOrders,
  getOrderDetail,
  getCategories,
} from "./helper/helper";
import ProductDetailPage from "./pages/ProductDetailPage";
// import Page2 from "./pages/Page2";
import MyWishListPage from "./pages/MyWishListPage";
import MyCartPage from "./pages/MyCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import initialStateThunk from "./thunk/initiateStateThunkAction";
import RegisterPage from "./pages/RegisterPage";
import MemberProfilePage, {
  updateMemberFromProfile,
} from "./pages/MemberProfilePage";
import MemberEdit from "./components/member/MemberEdit";
import OrderListPage from "./pages/OrderListPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import SearchResultPage from "./pages/SearchResultPage";
import CategoryPage from "./pages/CategoryPage";
import MemberPage from "./pages/MemberPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const width = window.innerWidth;
      if (width < 900) {
        dispatch({ type: "SET_DEVICE_MODE", payload: "mobile" });
      } else {
        dispatch({ type: "SET_DEVICE_MODE", payload: "pc" });
      }
    });
    dispatch(initialStateThunk());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <WelcomePage /> },
        {
          path: "productCategory",
          element: <CategoryPage />,
          loader: () => {
            return getCategories();
          },
        },
        { path: "member", element: <MemberPage /> },
        { path: "login", element: <LoginPage /> },
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
            console.log("p loader");
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
          action: updateMemberFromProfile,

          children: [
            {
              path: "edit",
              element: <MemberEdit />,
              loader: ({ params }) => {
                return getMember(params.account);
              },
            },
          ],
        },
        {
          path: "orderList/:account",
          element: <OrderListPage />,
          loader: ({ params }) => {
            return getMemberOrders(params.account);
          },
        },
        {
          path: "orderList/:account/:orderNo",
          element: <OrderDetailPage />,
          loader: ({ params }) => {
            return getOrderDetail(params.orderNo);
          },
        },
        {
          path: "searchResult",
          element: <SearchResultPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
