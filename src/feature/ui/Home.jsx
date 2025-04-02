import { Link } from "react-router-dom";
import CreateUser from "../user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="mt-30 max-w-200 text-center m-auto py-5">
      <h1 className="mb-8 text-center text-2xl font-bold text-slate-700 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-blue-950">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!username ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type={"primary"}>
          Continue Ordering, {username}
        </Button>
      )}
      {/* <Link to={"/cart"}>open cart &rarr;</Link> */}
    </div>
  );
}

export default Home;
