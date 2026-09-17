import stockifylogo from "./stockify.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/UseAuth";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="relative container mx-auto p-6 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to={"/"}>
            {" "}
            <img
              src={stockifylogo}
              alt=""
              className="w-50 h-auto object-contain mix-blend-multiply dark:mix-blend-screen bg-transparent pointer-events-none"
            />
          </Link>

          <div className="hidden font-bold lg:flex">
            <Link
              to={"/Search"}
              className="text-black hover:text-green hover:fs-30"
            >
              Search
            </Link>
          </div>
        </div>

        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-black">
            <div className="hover:text-darkBlue">
              Welcome! , {user?.userName}
            </div>
            <a
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-red-400 hover:opacity-70 cursor-pointer"
            >
              logout
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-black">
            <Link
              to={"/login"}
              className="hover:text-darkBlue rounded text-black bg-cyan-400 px-8 py-3 font-bold hover:opacity-60"
            >
              login
            </Link>
            <Link
              to={"/register"}
              className="px-8 py-3 font-bold rounded text-black bg-emerald-300 hover:opacity-70"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
