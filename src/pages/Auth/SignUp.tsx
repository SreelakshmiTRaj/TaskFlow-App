import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState<"manager" | "employee" | "">("");

  const handleRegister = () => {
    navigate("/login");
  };

  type formData = {
    name: string;
    role: string;
    email: string;
    password: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = (values: formData) => {
    if (!role) {
      setMessage("Please select a role");
    }
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const name = existingUsers.find(
      (user: formData) => user.email === values.email
    );

    if (name) {
      setMessage("Email already exists");
      return;
    }

    const newUser = { ...values, role };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center"
        >
          <h2 className="text-3xl font-semibold mb-2 text-center">Sign up</h2>
          <img
            src="/images/account.png"
            alt="profile"
            className="w-24 h-24 mb-6"
          />
          <label className="mb-1 text-gray-700 font-medium mr-37">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "required",
              pattern: {
                value: /^[A-za-z0-9 ]{3,}$/,
                message: "invalid",
              },
            })}
            className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {typeof errors.name?.message === "string" && (
            <span className="error">{errors?.name?.message}</span>
          )}

          <label className="mb-1 text-gray-700 font-medium mr-39">Role</label>
          <div className="flex justify-between w-full mb-3">
            <button
              type="button"
              className={`flex-1 py-2 mx-1 rounded-lg font-medium transition-colors ${
                role === "manager"
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setRole}
            >
              Manager
            </button>

            <button
              type="button"
              className={`flex-1 py-2 mx-1 rounded-lg font-medium transition-colors ${
                role === "employee"
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setRole("employee")}
            >
              Employee
            </button>
          </div>

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
            className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {typeof errors.email?.message === "string" && (
            <span className="error">{errors?.email?.message}</span>
          )}

          <label className="mb-1 text-gray-700 font-medium mr-30">
            Password
          </label>
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
            <span className="error">{errors?.password?.message}</span>
          )}

          {message ? (
            <p className="mt-4 text-sm text-green-700">{message}</p>
          ) : null}

          <button
            type="submit"
            className="w-50 bg-green-700 text-white py-2 px-3 rounded-lg cursor-pointer transition-colors font-medium mt-5"
            onClick={handleRegister}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
