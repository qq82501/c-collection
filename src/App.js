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
  addToCart,
  getAllProducts,
  getDelivery,
} from "./helper/helper";
import ProductDetailPage from "./pages/ProductDetailPage";
// import Page2 from "./pages/Page2";
import MyWishListPage from "./pages/MyWishListPage";
import MyCartPage from "./pages/MyCartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getLocalData = async function () {
      const localFavItems = JSON.parse(localStorage.getItem("localFav")) || [];
      const localCartItems =
        JSON.parse(localStorage.getItem("localCart")) || [];
      const products = await getAllProducts();
      const loginUser = JSON.parse(localStorage.getItem("loginUser"));
      dispatch({
        type: "INITIAL_LOCAL_DATA",
        payload: {
          fav: localFavItems,
          cart: localCartItems,
          products: products,
          loginUser,
        },
      });
    };
    getLocalData();
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
      ],
    },

    {
      path: "/addToCart",
      action: addToCart,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
