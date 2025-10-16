import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/^[A-Za-z][A-Za-z0-9@$%]{8,}$/, "Invalid password")
    .required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  type formData = {
    email: string;
    password: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: formData) => {
    try {
      const { data: users } = await axios.get("http://localhost:5000/users");
      const user = users.find(
        (u: { email: string; password: string }) =>
          u.email === values.email && u.password === values.password
      );
      if (!user) {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("jobTitle",user.jobTitle);
      localStorage.setItem("name",user.name);

      if (user.role === "manager") {
        navigate("/manager-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login error: ",error);
    }
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
            {...register("email")}
            className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mb-2">
              {errors?.email?.message}
            </span>
          )}

          <label className="mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mb-2">
              {errors?.password?.message}
            </span>
          )}

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            className="bg-green-700 text-white py-2 rounded-lg cursor-pointer transition-colors font-medium mt-4"
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
