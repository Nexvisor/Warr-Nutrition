export default function AboutSection() {
  return (
    <section className="bg-[#242d3e] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-6xl font-bold text-white">
              Our Story
            </h2>

            <h3 className="text-3xl md:text-3xl font-bold text-white leading-tight">
              We put our reputation on the line
            </h3>
          </div>

          <div className="text-gray-200 space-y-4">
            <p className="text-lg">
              In 2020, amidst a world grappling with unprecedented challenges,
              War Nutrition was born in the heart of India with a simple yet
              powerful mission: to empower individuals to take charge of their
              health and well-being. Recognizing that modern life often feels
              like a battle, we set out to create a line of supplements that
              would arm our customers with the strength and resilience they need
              to thrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
