import FooterSection from "@/app/component/FooterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Warr Nutrition",
  description:
    "Learn about Warr Nutrition - Your trusted partner in peak performance and well-being. Premium supplements for fitness enthusiasts and athletes.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
            <p className="text-lg text-gray-600">
              Your trusted partner in peak performance and well-being
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-gray-700 leading-relaxed text-lg">
              <strong>Warr Nutrition</strong> is your trusted partner in peak
              performance and well-being. As a brand dedicated to premium
              supplements for fitness enthusiasts and athletes, we empower
              everyone—from weekend warriors to professional athletes—to
              dominate their workouts and elevate their results at{" "}
              <a
                href="https://www.warrnutrition.com"
                className="text-blue-600 hover:underline"
              >
                warrnutrition.com
              </a>
              .
            </p>
          </div>

          {/* About Sections */}
          <div className="space-y-10">
            {/* Section 1 - Mission */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To provide high-quality, authentic nutritional supplements that
                support strength, endurance, recovery, and overall health. Every
                product we offer is crafted with transparency and care, ensuring
                that you get exactly what you expect.
              </p>
            </section>

            {/* Section 2 - What Sets Us Apart */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                What Sets Us Apart
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Premium Quality & Authenticity
                    </h3>
                    <p className="text-gray-700">
                      We guarantee that all products are genuine, safe, and
                      rigorously checked.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Athlete-Driven Focus
                    </h3>
                    <p className="text-gray-700">
                      Whether you're training for endurance, performance, or
                      transformation, our range is designed to help you reach
                      your goals.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Customer-Centric Approach
                    </h3>
                    <p className="text-gray-700">
                      Fast, reliable shipping and dedicated support form the
                      backbone of your experience with us.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 - Who We Serve */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                Who We Serve
              </h2>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  Our customers are passionate individuals—athletes, fitness
                  enthusiasts, and health-conscious people—who care deeply about
                  what they put into their bodies. We offer products that fuel
                  your journey to peak performance, every step of the way.
                </p>
              </div>
            </section>

            {/* Section 4 - Our Promise */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Our Promise
              </h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  Integrity, authenticity, and your success. That's the Warr
                  Nutrition standard.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Footer */}
      <FooterSection />
    </div>
  );
}
