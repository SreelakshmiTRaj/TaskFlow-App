import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const SignUp = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState<"manager" | "employee" | "">("");

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-za-z0-9 ]{3,}$/, "Invalid name"),
    jobTitle: yup
      .string()
      .required("Job title is required")
      .matches(/^[A-Za-z ]{3,}$/, "Invalid job title"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^[A-Za-z][A-Za-z0-9@$%]{8,}$/, "Invalid password"),
  });

  type formData = yup.InferType<typeof schema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: formData) => {
    if (!role) {
      setMessage("Please select a role");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = existingUsers.find(
      (user: formData) => user.email === values.email
    );

    if (existingUser) {
      setMessage("Email already exists");
      return;
    }

    const newUser = { ...values, role };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-1 text-center">Sign up</h2>
        <img
          src="/images/account.png"
          alt="profile"
          className="w-20 h-20 mb-3"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full text-md"
        >
          <label className="mb-1 text-gray-700 font-medium">Role</label>
          <div className="flex items-center gap-6 w-full mb-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="manager"
                checked={role === "manager"}
                onChange={() => setRole("manager")}
                className="w-4 h-4 text-green-700 accent-green-700"
              />
              <span className="text-gray-700">Manager</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="employee"
                checked={role === "employee"}
                onChange={() => setRole("employee")}
                className="w-4 h-4 text-green-700 accent-green-700"
              />
              <span className="text-gray-700">Employee</span>
            </label>
          </div>

          <label className="mb-1 text-gray-700 font-medium">Name</label>
          <input
            type="text"
            {...register("name")}
            className="mb-2 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <span className="text-red-400">{errors?.name?.message}</span>
          )}

          <label className="mb-1 text-gray-700 font-medium">Job Title</label>
          <input
            type="text"
            {...register("jobTitle")}
            className="mb-2 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.jobTitle && (
            <span className="text-red-400">{errors?.jobTitle?.message}</span>
          )}

          <label className="mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mb-2 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <span className="text-red-400">{errors?.email?.message}</span>
          )}

          <label className="mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="mb-2 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-400">{errors?.password?.message}</span>
          )}

          {message && <p className="mt-4 text-sm text-green-700">{message}</p>}

          <button
            type="submit"
            className="mx-auto w-50 bg-green-700 text-white py-2 px-3 rounded-lg cursor-pointer transition-colors font-medium mt-5"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
