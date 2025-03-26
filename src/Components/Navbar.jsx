const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-gradient-to-r from-pink-400 via-pink-300 to-red-300 shadow-lg">
        <div className="flex-1">
          <a className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-800 tracking-wider ">
            💦DevTinder
          </a>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-9">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-pink-200 transition-all"
            >
              <div className="w-12 h-12 rounded-full border-2 border-pink-300 shadow-lg">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow-xl border-pink-100"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge bg-red-300 text-white">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
