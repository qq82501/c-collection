import { useSelector } from "react-redux";

function Page2() {
  console.log("Page2");
  const state = useSelector((state) => state);
  console.log(state);
  return <div className="nav-bar__height">Page2</div>;
}
export default Page2;
