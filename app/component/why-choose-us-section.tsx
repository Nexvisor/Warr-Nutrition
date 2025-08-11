export function WhyChooseUsSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 md:px-32">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why Choose WARR NUTRITION
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
              100% Authentic
            </h3>
            <p className="text-gray-600 text-xs md:text-base">
              Products sourced directly from manufacturers with authenticity
              guarantee.
            </p>
          </div>
          <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
              Lab Tested
            </h3>
            <p className="text-gray-600 text-xs md:text-base">
              All products undergo rigorous quality testing for purity.
            </p>
          </div>
          <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600 text-xs md:text-base">
              Quick shipping with delivery within 2-3 business days.
            </p>
          </div>
          <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
              Expert Support
            </h3>
            <p className="text-gray-600 text-xs md:text-base">
              Get advice from our team of nutrition experts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
