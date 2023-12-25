import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="h-[10vh] w-[100vw] bg-blue-700 flex justify-between items-center px-12">
        <Link to="/">
          <div className="text-white text-3xl">MERN Auth</div>
        </Link>
        <Link to="/profile">
          <div>Profile</div>
        </Link>
        <div className="flex gap-x-4">
          <div>
            <Link to="/login">
              <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Sign In
              </button>
            </Link>
          </div>
          <div>
            <Link to="/register">
              <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
