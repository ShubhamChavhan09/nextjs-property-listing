import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/client/SearchBar";

export default function Home() {
  return (
    <div>
      <div className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury home"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-6">Find Your Dream Home</h1>
          <p className="text-xl mb-8">
            Discover properties that match your lifestyle
          </p>
          <div className="w-full max-w-2xl px-4">
            <SearchBar />
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Extensive Selection",
              description:
                "Browse through thousands of carefully curated properties",
            },
            {
              title: "Expert Guidance",
              description:
                "Get support from our experienced real estate professionals",
            },
            {
              title: "Smart Search",
              description:
                "Find exactly what you need with our advanced search features",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 border rounded-lg hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
