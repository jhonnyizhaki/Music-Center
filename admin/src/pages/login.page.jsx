import React from "react";
import { FaGoogle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdKey } from "react-icons/md";
import useLoginPage from "../hooks/login-page.hook";
import { toast } from "sonner";

export default function LoginPage() {
  const loginHook = useLoginPage();
  return (
    <main className="bg-base-200 min-h-screen flex p-10 justify-center">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2 !hidden lg:!flex">
          <img
            src="https://picsum.photos/seed/login/800/600"
            alt="Random image"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body lg:w-1/2 max-w-md mx-auto">
          <h2 className="card-title text-2xl font-bold mb-6">Login</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <HiOutlineMail size={18} />

                <input
                  onChange={loginHook.actions.onEmailChange}
                  type="email"
                  className="grow"
                  placeholder="email@example.com"
                  autoComplete="email"
                />
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <MdKey size={18} />

                <input
                  onChange={loginHook.actions.onPasswordChange}
                  type="password"
                  className="grow"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </label>
              <label className="label">
                {/* <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a> */}
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={loginHook.actions.login}
              >
                Login
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <button
              href="#"
              className="btn btn-outline mt-2 w-full opacity-60 cursor-not-allowed no-animation"
              onClick={() => toast.warning("This feature is not available yet")}
            >
              <FaGoogle size={18} />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
