const NavBar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7×1 mx-auto flex justify-between items-center">
        <h1>Recipies</h1>
        <div className="flex gap-x-4">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
