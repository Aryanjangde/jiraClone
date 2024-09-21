"use client"

import { Formik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { FaArrowLeftLong, FaAngleRight } from "react-icons/fa6";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="relative w-[30vw]">
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {formik => (
        <form className="w-full h-full mt-[300px] ml-20 mr-24" onSubmit={formik.handleSubmit}>
          <button
            type="button"
            className="flex gap-[8px] mb-[24px]"
            // onClick={() => {} /* Replace with navigation */}
          >
            <FaArrowLeftLong className="mt-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold mb-[24px]">
            Login into your existing account
          </h1>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-[8px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          <div className="mt-[24px] relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-[8px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-8"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mb-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          <div className="text-sm flex flex-column mb-[20px]">
            <a
              className="text-[#3431BB] hover:text-blue-700 ml-auto hover:cursor-pointer"
              onClick={() => {} /* Replace with navigation */}
            >
              Forgot password?
            </a>
          </div>

          {errorMessage && (
            <div className="mb-4 -mt-4">
              <button
                className="bg-[#FFE6E6] text-[#DC0000] py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {errorMessage}
              </button>
            </div>
          )}

          <div>
            <button
              className="bg-[#3431BB] hover:bg-purple-700 text-white font-bold py-3 px-4  rounded-[8px] focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </div>

          <div className="flex gap-4 mt-[36px]">
            <h1>Don’t have an account? </h1>
            <div className="flex gap-1">
              <span
                className="text-[#3431BB] hover:text-purple-700 cursor-pointer"
                onClick={() => {} /* Replace with navigation */}
              >
                Create new account
              </span>
              <div className="mt-1 text-[#3431BB]">
                <FaAngleRight />
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
    </div>
  );
};

export default LoginComponent;
