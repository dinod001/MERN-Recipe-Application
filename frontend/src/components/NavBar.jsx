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
    <nav className="bg-white shadow-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-orange-500 transition-colors"
        >
          <h1>Recipies</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex gap-x-4">
              <Link to={"/add-recipie"}>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Add Recipie
                </button>
              </Link>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={handleSubmit}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
