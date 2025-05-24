import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigator = useNavigate();
  const handleSubmit = () => {
    logOut();
    navigator("/login");
  };
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7×1 mx-auto flex justify-between items-center">
        <Link to="/">
          <h1>Recipies</h1>
        </Link>
        <div className="flex gap-x-4">
          {user ? (
            <div className="flex gap-x-4">
              <Link to={"/add-recipie"}>
                <button>Add Recipie</button>
              </Link>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={handleSubmit}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
