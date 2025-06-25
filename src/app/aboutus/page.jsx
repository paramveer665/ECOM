'use client';
import { Heading, Text } from "@/components";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-8 mb-16">
        <Heading as="h1" size="3xl" className="text-center uppercase tracking-wider">
          OUR STORY
        </Heading>
        <Text size="xl" className="text-center max-w-3xl">
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque.
        </Text>
        <Text size="lg" className="text-center max-w-3xl">
          Dolor integer scelerisque nibh amet mi ut elementum dolor.
        </Text>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="flex flex-col justify-center">
          <Heading as="h2" size="2xl" className="mb-6 uppercase">
            OUR MISSION
          </Heading>
          <Text className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus 
            hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut 
            eleifend nibh porttitor.
          </Text>
          <Text>
            Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. 
            Suspendisse dictum feugiat nisl ut dapibus.
          </Text>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/about-mission.jpg"
            alt="Our Mission"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <Heading as="h2" size="2xl" className="mb-12 text-center uppercase">
          MEET OUR TEAM
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="flex flex-col items-center">
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={`/team-member-${member}.jpg`}
                  alt={`Team Member ${member}`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <Heading as="h3" size="lg" className="mb-2">
                Team Member {member}
              </Heading>
              <Text className="text-gray-600">Position Title</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}