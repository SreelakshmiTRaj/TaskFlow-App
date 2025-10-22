import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import { v4 as uuid } from "uuid";
import roles from "../../assets/roles.ts";
import axios from "axios";
import { Eye,EyeOff } from "lucide-react";
const SignUp = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState<"manager" | "employee" | "">("");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [jobError, setJobError] = useState("");
  const [show, setShow] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-za-z0-9 ]{3,}$/, "Invalid name"),
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

  const handleClick = () => {
    setShow(!show);
  };

  const onSubmit = async (values: formData) => {
    setMessage("");

    if (!role) {
      setMessage("Please select a role");
      return;
    }

    if (!selectedJob) {
      setJobError("Please select a job title");
      return;
    }

    try {
      const { data: users } = await axios.get("http://localhost:5000/users");
      const existingUser = users.find(
        (user: formData) => user.email === values.email
      );
      if (existingUser) {
        setMessage("Email already exists");
        return;
      }

      const newUser = { id: uuid(), ...values, jobTitle: selectedJob, role };
      await axios.post("http://localhost:5000/users", newUser);
      navigate("/login");
    } catch (error) {
      console.log("Error during signup: ", error);
    }
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
          <label className="mb-1 text-gray-700 font-medium mt-2">Role</label>
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
          {errors?.name && (
            <span className="text-red-400">{errors?.name?.message}</span>
          )}

          <label className="mb-1 text-gray-700 font-medium">Job Title</label>
          <Select
            options={roles}
            isSearchable
            placeholder="Select a job title"
            className="mb-2"
            onChange={(option) => {
              if (option) {
                setSelectedJob(option.value);
                setJobError("");
              } else {
                setSelectedJob("");
              }
            }}
          />
          {jobError && <span className="text-red-400">{jobError}</span>}

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
          <div className="flex items-center mb-2">
            <input
              type={show ? "text" : "password"}
              {...register("password")}
              className="flex-1 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
