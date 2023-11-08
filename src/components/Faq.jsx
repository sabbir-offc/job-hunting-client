const Faq = () => {
  return (
    <section className="mx-auto max-w-7xl px-2 py-10 md:px-0">
      <div>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
            We try to answere your question
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-black">
              How Can I post a job ?
            </h2>
            <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
              {`In Navbar you can find a Link named "Add a Job". If you clicked on the link you will be redirect to the job posting page. And after that you can post a job.`}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black">
              Where I Can view my posted Job?
            </h2>
            <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
              {`In the Navbar you can see a button named "My Jobs". If you clicked on the link you will be redirect to the your posted job page. And from here you can update or delete your posted job.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
