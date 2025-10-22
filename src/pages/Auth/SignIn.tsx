import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);

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

  const handleClick = () => {
    setShow(!show);
  };
  const onSubmit = async (values: formData) => {
    try {
      const { data: users } = await axios.get("http://localhost:5000/users");
      const user = users.find(
        (u: { email: string }) => u.email === values.email
      );

      if (!user) {
        setError("Email not found");
        return;
      }

      if (user.password !== values.password) {
        setError("Incorrect password !!");
        return;
      }

      setError("");

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("jobTitle", user.jobTitle);
      localStorage.setItem("name", user.name);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "manager") {
        navigate("/manager-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login error: ", error);
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
          <div className="flex items-center mb-2">
            <input
              type={show ? "text" : "password"}
              {...register("password")}
              className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="ml-2 text-gray-600 hover:text-red-400 cursor-pointer"
              type="button"
              onClick={handleClick}
            >
              {show ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

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
