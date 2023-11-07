const Hero = () => {
  return (
    <div className="relative w-full">
      <div className="mx-auto max-w-7xl place-items-center lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <img src="/web-logo.png" alt="logo" className="w-1/12" />
          <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1 px-2">
              <p className="text-sm font-medium">We&apos; hiring</p>
            </div>
            <p className="text-sm font-medium">Browse &rarr;</p>
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            Your Gateway to{" "}
            <span className="text-[#793FDF]">Opportunities</span>
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            Welcome to our{" "}
            <span className="text-[#793FDF] font-semibold">Job Hunting</span>{" "}
            platform, where your next career move begins. Discover a wide range
            of job listings, both on-site and remote, to match your preferences.
            We connect talented individuals with exciting opportunities. Start
            your journey today!
          </p>
          <form action="" className="mt-8 flex items-start space-x-2">
            <div>
              <input
                className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Find Jobs"
                id="searchJob"
              ></input>
            </div>
            <div>
              <button
                type="button"
                className="rounded-md bg-[#7091F5] ease-in-out duration-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#793FDF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div
          data-aos="slide-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1200"
          className="relative hidden lg:block lg:col-span-5 lg:-mr-8 xl:col-span-6"
        >
          <img
            className=" bg-gray-50 object-cover  rounded-lg"
            src="/hero.jpg"
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
