import "./App.css";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import WelcomePage from "./pages/WelcomePage";
import ProductsListPage from "./pages/ProductsListPage";
import { getProductsData, getProductDetail } from "./helper/helper";
import ProductDetailPage from "./pages/ProductDetailPage";
// import Page2 from "./pages/Page2";
import MyWishList from "./pages/MyWishList";

function App() {
  console.log(JSON.parse(localStorage.getItem("localFav")));

  const dispatch = useDispatch();
  useEffect(() => {
    const getLocalFav = function () {
      const localFavItems = JSON.parse(localStorage.getItem("localFav") || []);
      dispatch({ type: "INITIAL_FAV_DATA", payload: localFavItems });
    };
    getLocalFav();
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
          element: <MyWishList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
