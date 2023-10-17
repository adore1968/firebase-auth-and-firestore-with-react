"use client";
import { useAppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, loginUserWithGoogle, loginUserWithGithub } =
    useAppContext();

  const onSubmit = handleSubmit((data) => {
    loginUser(data);
  });

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-76px)]">
      <div className="flex-auto max-w-md">
        <form
          className="flex flex-col gap-5 p-5 bg-gray-800 rounded"
          onSubmit={onSubmit}
        >
          <div className="text-center">
            <h2 className="sm:text-3xl text-2xl font-bold">Login</h2>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="sm:text-2xl text-xl font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="sm:text-xl py-2 px-2.5 text-lg text-gray-200 bg-transparent border border-opacity-50 rounded border-gray-50"
              {...register("email", {
                required: {
                  value: true,
                  message: "The email is required!",
                },
              })}
            />
            {errors.email && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="sm:text-2xl text-xl font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className="sm:text-xl py-2 px-2.5 text-lg text-gray-200 bg-transparent border border-opacity-50 rounded border-gray-50"
              {...register("password", {
                required: {
                  value: true,
                  message: "The password is required!",
                },
                minLength: {
                  value: 6,
                  message: "The password must be at least 6 characters!",
                },
              })}
            />
            {errors.password && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="sm:text-xl hover:bg-blue-600 w-full px-4 py-2 text-lg text-center transition-colors ease-in bg-blue-700 rounded"
            >
              Sign In
            </button>
          </div>
          <div className="sm:text-xl flex gap-5 text-lg">
            <button
              type="button"
              className="hover:bg-green-600 px-4 py-2 transition-colors ease-in bg-green-700 rounded"
              onClick={() => loginUserWithGoogle()}
            >
              Google
            </button>
            <button
              type="button"
              className="hover:bg-red-600 px-4 py-2 transition-colors ease-in bg-red-700 rounded"
              onClick={() => loginUserWithGithub()}
            >
              Github
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignInPage;
