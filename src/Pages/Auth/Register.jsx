import { ArrowRight } from "lucide-react";
import SocialLogin from "./SocialLogin";
import Lottie from "lottie-react";
import Animation from "/public/Animation/registerAnimation.json";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Account Creating...");

    const form = e.target;

    const image = form.image.value;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await createUser(email, password).then((res) => {
        const user = res.user;
        const userEmail = res?.user?.email;
        axios.post("/auth/access-token", { email: userEmail }).then((res) => {
          if (res.data.success) {
            navigate(location.state ? location.state : "/");
          }
        });

        updateProfile(user, { displayName: name, photoURL: image });
        toast.success("Account Create Successfull.", { id: toastId });
      });
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };
  return (
    <section className="max-w-7xl mx-auto">
      <Helmet>
        <title>Register | Job Hunting</title>
      </Helmet>
      <div className="flex items-center justify-evenly flex-col-reverse md:flex-row md:h-screen">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="w-fit">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Register
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?
              <button className="font-semibold text-black transition-all duration-200 hover:underline">
                <Link to="/login">Login to your account</Link>
              </button>
            </p>
            <form onSubmit={handleCreateUser} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="image"
                    className="text-base font-medium text-gray-900"
                  >
                    Photo Url
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="url"
                      name="image"
                      id="image"
                      placeholder="Enter Photo URL"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    Your Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name."
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Get started <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="divider">Or</div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
        <div className="md:w-2/4 lg:w-2/5">
          <Lottie animationData={Animation} loop={true}></Lottie>
        </div>
      </div>
    </section>
  );
};

export default Register;
