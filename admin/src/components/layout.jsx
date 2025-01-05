import { FiBox, FiHome, FiUsers } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { Outlet } from "react-router";
import user from "../helpers/user";

function Layout(p) {
  console.log(user)
  if (!user || user.role !== "admin") window.location.href = "http://localhost:5173/login";
  return (
    <div className="drawer">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <main className="">
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost"
              >
                <IoMenu size={24} />
              </label>
              <a className="btn btn-ghost text-xl" href="/">
                Admin
              </a>
            </div>
            <div className="flex-none">
              <button className="btn btn-square btn-ghost"></button>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <a href="/">
              <FiHome size={18} />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/orders">
              <FiBox size={18} />
              <span>Orders</span>
            </a>
          </li>

          <li>
            <a href="/users">
              <FiUsers size={18} />
              <span>Users</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Layout;
