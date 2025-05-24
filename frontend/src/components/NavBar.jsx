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
            <div>
              {`Welcome ${user.username}`}
              <button
                className=" bg-blue-500 text-white p-1 rounded hover:bg-blue-600 ml-3"
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
