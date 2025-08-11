import Image from "next/image";

export function FeatureSection() {
  const featureImages = {
    desktop:
      "https://ik.imagekit.io/fcuhugcgk/WAR_Nutrition/Frame%20214.png?updatedAt=1748343525786",
    mobile:
      "https://ik.imagekit.io/fcuhugcgk/WAR_Nutrition/Frame%20212%20(1).png?updatedAt=1748343525579",
  };
  return (
    <section className="w-full py-8">
      <div className="w-full flex-shrink-0 relative">
        {/* Desktop Image */}
        <img
          src={featureImages.desktop}
          alt={`Desktop slide`}
          className="hidden md:block w-full h-auto object-cover min-h-[300px] max-h-[600px]"
        />

        {/* Mobile Image */}
        <img
          src={featureImages.mobile || "/placeholder.svg"}
          alt={`Mobile slide`}
          className="block md:hidden w-full h-auto object-cover min-h-[200px] max-h-[400px]"
        />
      </div>
    </section>
  );
}
