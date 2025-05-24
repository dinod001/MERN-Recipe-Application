import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7×1 mx-auto flex justify-between items-center">
        <Link to="/">
          <h1>Recipies</h1>
        </Link>
        <div className="flex gap-x-4">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
