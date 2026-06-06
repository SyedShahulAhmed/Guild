import Communities from "@/components/Landing/Communities";
import Events from "@/components/Landing/Events";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";
import Hero from "@/components/Landing/Hero";
import LaunchCTA from "@/components/Landing/LaunchCTA";
import Navbar from "@/components/Landing/Navbar";
import Resources from "@/components/Landing/Resources";

function SectionDivider() {
  return <div className="mx-auto h-px w-full  bg-[#E6D5A8]/15" />;
}

export default function HomePage() {
  return (
    <div className="bg-background">
      <Navbar />

      <Hero />
      <SectionDivider />

      <Features />
      <SectionDivider />

      <Communities />
      <SectionDivider />

      <Events />
      <SectionDivider />

      <Resources />
      <SectionDivider />
      
      <LaunchCTA />

      <Footer />
    </div>
  );
}
