import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  type formData = {
    username: string;
    email: string;
    password: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = (values: formData) => console.log(values);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center"
      >
        <h2 className="text-3xl font-semibold mb-2 text-center mb-8">Sign up</h2>
        <img
          src="/images/account.png"
          alt="profile"
          className="w-24 h-24 mb-6"
        />
        <label className="mb-1 text-gray-700 font-medium mr-30">Username</label>
        <input
          type="text"
          {...register("username", {
            required: "required",
            pattern: {
              value: /^[A-za-z0-9 ]{3,}$/,
              message: "invalid username",
            },
          })}
          className="mb-2 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {typeof errors.username?.message === "string" && (
          <span className="error">{errors?.username?.message}</span>
        )}

        <label className="mb-1 text-gray-700 font-medium mr-37">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          className="mb-2 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {typeof errors.email?.message === "string" && (
          <span className="error">{errors?.email?.message}</span>
        )}

        <label className="mb-1 text-gray-700 font-medium mr-30">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Required",
            pattern: {
              value: /^[A-Za-z][A-Za-z0-9@$%]{8,}$/,
              message: "invalid password",
            },
          })}
          className="mb-2 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {typeof errors.password?.message === "string" && (
          <span className="error">{errors.password.message}</span>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-3 rounded-lg cursor-pointer transition-colors font-medium mt-5"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
