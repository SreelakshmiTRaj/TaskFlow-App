import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();

  type formData = {
    email: string;
    password: string;
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = (values: formData) => {
    console.log(values);
  };

  const handleSignIn = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-2 text-center">
          Welcome to TaskFlow
        </h2>
        <p className="text-gray-400 text-lg mb-6 text-center">
          To get started, please sign in
        </p>
        <img
          src="/images/account.png"
          alt="profile"
          className="w-24 h-24 mb-6"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center"
        >
          <label className="mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {typeof errors.email?.message === "string" && (
            <span className="text-red-500 text-sm mb-2">
              {errors?.email?.message}
            </span>
          )}

          <label className="mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Required",
              pattern: {
                value: /^[A-Za-z][A-Za-z0-9@$%]{8,}$/,
                message: "invalid password",
              },
            })}
            className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {typeof errors.password?.message === "string" && (
            <span className="text-red-500 text-sm mb-2">
              {errors?.password?.message}
            </span>
          )}
          <button
            type="submit"
            className="bg-green-700 text-white py-2 rounded-lg cursor-pointer transition-colors font-medium mt-4"
            onClick={handleSignIn}
          >
            Sign in
          </button>
          <p className="mt-4 ml-3 text-gray-700 font-medium">
            New User?{" "}
            <Link to="/register" className="text-blue-600 cursor-pointer">
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
