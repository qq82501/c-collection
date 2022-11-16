import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const params = useParams();

  const titles = useMemo(() => {
    return [
      { pathname: "/", title: "飾品專家" },
      { pathname: "/productCategory", title: "商品類別" },
      { pathname: "/member", title: "我的帳戶" },
      { pathname: "/login", title: "登入" },
      {
        pathname: `/product/${params.category}`,
        title: params.category,
      },
      {
        pathname: `/product/${params.category}/${params.childCategory}`,
        title: params.childCategory,
      },
      { pathname: `/myWishList`, title: "您喜歡的商品" },
      { pathname: "/myCart", title: "您的購物車" },
      { pathname: "/checkout", title: "結帳" },
      { pathname: "/register", title: "註冊" },
      { pathname: `/memberProfile/${params.account}`, title: "會員資料" },
      {
        pathname: `/memberProfile/${params.account}/edit`,
        title: "修改會員資料",
      },
      {
        pathname: `/orderList/${params.account}`,
        title: "訂單資料",
      },
      {
        pathname: `/orderList/${params.account}/${params.orderNo}`,
        title: `訂單查詢${params.orderNo}`,
      },
    ];
  }, [params.account, params.category, params.childCategory, params.orderNo]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const titleObj = titles.find((title) => {
      return title.pathname === pathname;
    });
    if (!titleObj) return;
    document.title = `C.Collection — ${titleObj.title}`;
  }, [pathname, titles]);

  return null;
}

export default ScrollToTop;
