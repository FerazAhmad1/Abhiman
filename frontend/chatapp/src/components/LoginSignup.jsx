/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authState, login } from "../features/authentication/authSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const { isLoggedin } = useSelector(authState);

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useRef();
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };
  const navigateTo = (path) => navigate(path);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userId.current.value || !userId.current.value.trim()) {
      showToast("Please fill email");
      return;
    }

    if (!passwordRef.current.value || !passwordRef.current.value.trim()) {
      showToast("Please fill password");
      return;
    }
    if (
      (!isLogin && !fullNameRef.current.value) ||
      !fullNameRef.current.value.trim()
    ) {
      showToast("Please fill password");
      return;
    }
    if (
      (!isLogin && !phoneRef.current.value) ||
      !phoneRef.current.value.trim()
    ) {
      showToast("Please fill password");
      return;
    }
    const id = userId.current.value.trim();
    const password = passwordRef.current.value.trim();
    const deviceId =
      Math.random().toString(20).substring(2, 14) +
      Math.random().toString(20).substring(2, 14);
    const body = {
      userId: id,
      password,
      deviceId,
      ...(!isLogin && { name: fullNameRef.current.value.trim() }),
      ...(!isLogin && { phone: phoneRef.current.value.trim() }),
    };
    let entity = isLogin ? "login" : "signup";
    const response = await axios.post(
      `http://localhost:3000/api/v1/user/${entity}`,
      body
    );
    console.log(response);
  };

  const showToast = (message, type = "error") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    if (isLoggedin) {
      navigate("/product");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "Log in to your account" : "Create an account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                UserId
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="UserId"
                ref={userId}
              />
            </div>
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="full-name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                    ref={fullNameRef}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="tel"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Phone"
                    ref={phoneRef}
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={submitHandler}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin
              ? "Don't have an account yet?"
              : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              {!isLogin ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default LoginSignup;
