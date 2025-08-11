import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  FileText,
  AlertTriangle,
} from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white   py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our
            website and purchasing our products.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Effective Date */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-600">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold text-gray-800">
                Effective Date:
              </span>
            </div>
            <p className="text-gray-600">25 May, 2025</p>
            <div className="mt-4">
              <p className="text-gray-700">
                <strong>Website:</strong> www.warrnutrition.com
                <br />
                <strong>Owner:</strong> Warr Nutrition
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using this website, you accept and agree to be
                bound by the terms and conditions described below. If you do not
                agree to these terms, please do not use this site.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. Eligibility
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 18 years old to purchase any products from
                this website. By using our site, you confirm that you are
                legally eligible to enter into binding contracts.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
                3. Products & Usage Disclaimer
              </h2>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                <p className="text-orange-800 font-semibold">
                  Important Health Notice
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our supplements are not intended to diagnose, treat, cure, or
                prevent any disease. Please consult with a healthcare
                professional before using any product, especially if you are
                pregnant, nursing, have a medical condition, or are taking
                medication.
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. Payment Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All prices are listed in INR (₹) and are inclusive of applicable
                taxes. We accept online payments via our secure payment gateway
                partners (such as Razorpay, Paytm, etc.).
              </p>
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-green-800">
                  <strong>Security:</strong> Your payment information is
                  processed securely, and we do not store card or account
                  details.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. Order Confirmation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Once your order is placed and payment is successful, you will
                receive an order confirmation email with your order details.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. Shipping & Delivery
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-semibold text-blue-800 mb-2">Coverage</h3>
                  <p className="text-blue-700">We deliver PAN India</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Processing Time
                  </h3>
                  <p className="text-blue-700">
                    Orders dispatched within 1–3 business days
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                Delivery timelines may vary based on your location and chosen
                delivery method.
              </p>
            </div>

            {/* Section 7 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. Return & Refund Policy
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-800">
                    <strong>Important:</strong> Due to the nature of our
                    products, we do not accept returns once a product is opened.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  However, if a product is damaged during shipping or you
                  receive the wrong item, please contact us within 48 hours of
                  delivery with photos as proof. Refunds, if applicable, will be
                  processed to the original payment method within 7–10 working
                  days.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                8. Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All content on the website, including text, graphics, logos,
                images, and product information, is the property of Warr
                Nutrition and may not be used without written permission.
              </p>
            </div>

            {/* Section 9 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Warr Nutrition shall not be liable for any direct, indirect, or
                consequential damages resulting from the use or misuse of our
                products or website.
              </p>
            </div>

            {/* Section 10 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                10. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These terms shall be governed by and construed in accordance
                with the laws of India. Any disputes shall be subject to the
                exclusive jurisdiction of the courts in Delhi.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white  rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Mail className="h-6 w-6 mr-3" />
                11. Contact Information
              </h2>
              <p className="mb-6 text-blue-100">
                For any queries regarding your order or these terms, please
                contact us at:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-300" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-blue-100">support@warrnutrition.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-300" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-blue-100">+91 89200 26757</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12 p-6 bg-gray-100 rounded-lg">
            <p className="text-gray-600">
              Last updated: 25 May, 2025 | These terms are subject to change
              without prior notice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
