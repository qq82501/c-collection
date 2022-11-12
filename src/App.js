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
          element: (
            <RegisterPage
            //  isLoading={isAddingNewMember}
            />
          ),
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
