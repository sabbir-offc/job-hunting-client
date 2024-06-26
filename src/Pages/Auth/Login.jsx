import { ArrowRight } from "lucide-react";
import Animation from "/public/Animation/loginAnimation.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
const Login = () => {
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  console.log(emailRef.current?.value);
  const handleForgotPass = async () => {
    const email = emailRef.current?.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        return toast.success(
          `Password Reset link has been sent to this email: ${email}`
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        toast.error(errorMessage);
      });
  };
  const handleLoginUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const toastId = toast.loading("Logging...");

    try {
      await loginUser(email, password);
      navigate(location.state ? location.state : "/");
      toast.success("Login Successfull.", { id: toastId });
    } catch (error) {
      toast.error("Login Failed.", { id: toastId });
    }
  };
  return (
    <section className="max-w-7xl mx-auto">
      <Helmet>
        <title>Login | Job Hunting</title>
      </Helmet>
      <div className="flex items-center justify-evenly flex-col-reverse md:flex-row-reverse md:h-screen">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 flex-1">
          <div className="w-full">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Login your Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?
              <button className="font-semibold text-black transition-all duration-200 hover:underline">
                <Link to="/register">Create a free account</Link>
              </button>
            </p>
            <form onSubmit={handleLoginUser} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      ref={emailRef}
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
                      Password
                    </label>

                    <span
                      onClick={handleForgotPass}
                      className="font-semibold hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </span>
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
                    Login <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="divider">Or</div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
        <div className="md:w-2/4 lg:w-2/4">
          <Lottie animationData={Animation} loop={false}></Lottie>
        </div>
      </div>
    </section>
  );
};

export default Login;
