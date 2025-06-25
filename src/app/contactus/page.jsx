'use client';
import { useState } from 'react';
import { Heading, Text, Button } from "@/components";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-8 mb-16">
        <Heading as="h1" size="3xl" className="text-center uppercase tracking-wider">
          CONTACT US
        </Heading>
        <Text size="xl" className="text-center max-w-3xl">
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque.
        </Text>
        <Text size="lg" className="text-center max-w-3xl">
          Dolor integer scelerisque nibh amet mi ut elementum dolor.
        </Text>
      </div>

      {/* Contact Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <Heading as="h2" size="xl" className="mb-6 uppercase">
            SEND US A MESSAGE
          </Heading>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                required
              ></textarea>
            </div>
            <Button
              type="submit"
              color="pink_400"
              size="lg"
              className="w-full md:w-auto px-8"
            >
              SEND MESSAGE
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Heading as="h2" size="xl" className="mb-6 uppercase">
              CONTACT INFORMATION
            </Heading>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Image
                    src="/icons/location.svg"
                    width={20}
                    height={20}
                    alt="Location"
                  />
                </div>
                <div>
                  <Heading as="h3" size="md" className="mb-1">
                    Our Address
                  </Heading>
                  <Text>123 Main Street, City, Country</Text>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Image
                    src="/icons/phone.svg"
                    width={20}
                    height={20}
                    alt="Phone"
                  />
                </div>
                <div>
                  <Heading as="h3" size="md" className="mb-1">
                    Phone Number
                  </Heading>
                  <Text>+1 (234) 567-8900</Text>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Image
                    src="/icons/email.svg"
                    width={20}
                    height={20}
                    alt="Email"
                  />
                </div>
                <div>
                  <Heading as="h3" size="md" className="mb-1">
                    Email Address
                  </Heading>
                  <Text>info@example.com</Text>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="/map-placeholder.jpg"
              alt="Location Map"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}