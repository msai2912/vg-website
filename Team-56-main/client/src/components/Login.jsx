import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const createLoginSchema = (role) => {
  const baseSchema = {
    role: z.enum(["program_manager", "educator", "student"], {
      required_error: "Please select a role",
    }),
  };

  if (role === "student") {
    return z.object({
      ...baseSchema,
      contact: z
        .string()
        .min(1, "Contact number is required")
        .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
    });
  } else {
    return z.object({
      ...baseSchema,
      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
    });
  }
};

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("program_manager");

  const { login, loginWithGoogle } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    resolver: zodResolver(createLoginSchema(selectedRole)),
    mode: "onChange",
    defaultValues: {
      role: "program_manager",
    },
  });

  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
    setError("");
    clearErrors();
    reset({ role: newRole });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      let result;
      if (data.role === "student") {
        result = await login(null, null, data.role, data.contact);
      } else {
        result = await login(data.email, data.password, data.role);
      }

      setLoading(false);

      if (!result.success) {
        setError(
          result.message || "Login failed. Please check your credentials."
        );
      } else {
        navigate("/", { replace: true });
      }
    } catch {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your role and enter your credentials
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select your role
            </label>
            <div className="space-y-2">
              {[
                { value: "program_manager", label: "Program Manager" },
                { value: "educator", label: "Community Educator" },
                { value: "student", label: "Student" },
              ].map((role) => (
                <label key={role.value} className="flex items-center">
                  <input
                    type="radio"
                    value={role.value}
                    {...register("role")}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {role.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {/* Conditional Fields Based on Role */}
          {selectedRole === "student" ? (
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                placeholder="Enter your 10-digit mobile number"
                {...register("contact")}
                onChange={(e) => {
                  register("contact").onChange(e);
                  if (error) setError("");
                  clearErrors("contact");
                }}
                className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.contact ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.contact.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Students login with their registered contact number only (no
                password required)
              </p>
            </div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  onChange={(e) => {
                    register("email").onChange(e);
                    if (error) setError("");
                    clearErrors("email");
                  }}
                  className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register("password")}
                  onChange={(e) => {
                    register("password").onChange(e);
                    if (error) setError("");
                    clearErrors("password");
                  }}
                  className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {selectedRole !== "student" && (
            <div className="text-center">
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign in with Google
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
