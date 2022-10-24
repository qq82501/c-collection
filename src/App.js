import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/layout/Layout";
import WelcomePage from "./pages/WelcomePage";
import ProductsListPage from "./pages/ProductsListPage";
import { getProductsData, getProductDetail } from "./helper/helper";
import ProductDetailPage from "./pages/ProductDetailPage";
import Page2 from "./pages/Page2";

const categories = [
  {
    title: "耳環",
    to: "/product/earrings",
    childCat: [
      { title: "夾式耳環", to: "/product/earrings/cuff" },
      { title: "穿孔式耳環", to: "/product/earrings/piercing" },
    ],
  },
  { title: "戒指", to: "/product/rings", childCat: [] },
];

function App() {
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
