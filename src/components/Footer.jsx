import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <section className="relative overflow-hidden py-10 bg-[#7091F5] ">
      <div className=" z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex items-center">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <img src="/web-logo.png" className="w-12" alt="" />
                <span className="ml-4 text-lg font-bold">Job Hunting</span>
              </div>
              <div>
                <p className="mb-4 text-white text-base font-medium">
                  Ultimate Platform for finding jobs
                </p>
                <p className="text-sm text-white">
                  &copy; Copyright 2023. All Rights Reserved by Job Hunting.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="font-semibold text-white">Contact Us</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-white transition-colors duration-300  hover:underline hover:text-[#97FFF4]"
              >
                +880 768 473 4978
              </a>
              <a
                href="#"
                className="text-white transition-colors duration-300 hover:underline hover:text-[#97FFF4]"
              >
                info@jobhunting.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

<nav>
  <div className="grid grid-flow-col gap-4">
    <a
      href="https://www.twitter.com/sabbir_offc"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
      >
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
      </svg>
    </a>
    <a
      href="https://www.instagram.com/sabbir_offc"
      target="_blank"
      rel="noreferrer"
    >
      <Instagram></Instagram>
    </a>
    <a
      href="https://www.facebook.com/sabbir.offc"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
      >
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
      </svg>
    </a>
  </div>
</nav>;
