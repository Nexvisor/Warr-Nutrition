import FooterSection from "@/app/component/FooterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Warr Nutrition",
  description:
    "Terms and Conditions for Warr Nutrition - Read our policies on orders, shipping, returns, and product usage.",
};

export default function TermsConditionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>

            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-gray-700 leading-relaxed text-lg">
              Welcome to <strong>Warr Nutrition</strong>. By using our website{" "}
              <a
                href="https://www.warrnutrition.com"
                className="text-blue-600 hover:underline"
              >
                https://www.warrnutrition.com
              </a>{" "}
              and purchasing our products, you agree to comply with the
              following Terms & Conditions. Please read them carefully before
              placing an order.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                Products & Usage
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Warr Nutrition provides nutritional supplements, protein
                  powders, vitamins, herbal products, and other wellness items.
                </p>
                <p>Products are intended for personal consumption only.</p>
                <p>
                  All items should be used as directed on the packaging or as
                  advised by a qualified healthcare professional.
                </p>
                <p>We do not guarantee specific health or fitness results.</p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                Orders & Payments
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Orders are confirmed only upon successful payment through our
                  payment gateway.
                </p>
                <p>
                  All prices are in INR and inclusive of applicable taxes unless
                  stated otherwise.
                </p>
                <p>
                  We reserve the right to cancel orders due to incorrect
                  pricing, stock unavailability, or suspected fraudulent
                  activity.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Shipping & Delivery
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Orders are dispatched within 1–3 working days of payment
                  confirmation.
                </p>
                <p>
                  Delivery usually takes 3–7 working days, depending on the
                  location.
                </p>
                <p>
                  Delays caused by courier services, natural disasters, or
                  unforeseen events are beyond our control.
                </p>
                <p>Shipping charges, if any, will be displayed at checkout.</p>
              </div>
            </section>

            {/* Section 5 */}
            {/* <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                Returns, Refunds & Cancellations
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Due to the consumable nature of our products, returns are only
                  accepted if:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>The product is damaged upon delivery</li>
                  <li>The wrong product is delivered</li>
                </ul>
                <p>
                  You must contact us within 48 hours of delivery for return
                  requests, along with photographs of the product.
                </p>
                <p>
                  Refunds (if approved) will be processed to the original
                  payment method within 7–10 working days after inspection.
                </p>
                <p>Orders cannot be canceled once shipped.</p>
              </div>
            </section> */}

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                Health Disclaimer
              </h2>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p className="font-medium">Important Health Information:</p>
                  <p>
                    Products are not intended to diagnose, treat, cure, or
                    prevent any disease.
                  </p>
                  <p>
                    Consult a doctor before using any supplement, especially if
                    you have medical conditions, are pregnant, or breastfeeding.
                  </p>
                  <p>
                    We are not responsible for misuse, allergic reactions, or
                    side effects.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  6
                </span>
                Limitation of Liability
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Our maximum liability is limited to the amount paid for the
                  purchased product.
                </p>
                <p>
                  We are not liable for indirect or consequential damages
                  resulting from product use or website access.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            {/* <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  8
                </span>
                Governing Law & Jurisdiction
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>These Terms are governed by the laws of India.</p>
                <p>
                  All disputes are subject to the exclusive jurisdiction of the
                  courts in Faridabad.
                </p>
              </div>
            </section> */}

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  7
                </span>
                Contact Information
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4 font-medium">
                  For any queries regarding these Terms & Conditions, you can
                  reach us at:
                </p>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">📧</span>
                    <span>
                      <strong>Email:</strong> Cdroverseas@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-3">📞</span>
                    <span>
                      <strong>Phone:</strong> 8920026757
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🏢</span>
                    <span>
                      <strong>Address:</strong> Booth No-100, Sector 21D Market,
                      Faridabad, Haryana 121001
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg mr-3">📋</span>
                    <span>
                      <strong>FSSAI License Number:</strong> 10824003000310
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
