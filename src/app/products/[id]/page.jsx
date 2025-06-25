"use client";
import React, { useState } from "react";
import {
  Img,
  Text,
  Heading,
  Button,
  RatingBar,
  SelectBox,
} from "../../../components";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header"

import { useRouter } from 'next/navigation';

const sizeOptions = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
];

const colorOptions = [
  { label: "Black", value: "Black" },
  { label: "Blue", value: "Blue" },
  { label: "Green", value: "Green" },
  { label: "Red", value: "Red" },
  { label: "White", value: "White" },
];

export default function ProductPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  
  // In a real app, you would fetch this data based on the ID
  // For now, we'll use a mock product that matches your sample
  const product = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    images: [
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Using same image for demo
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    ],
    rating: {
      rate: 3.9,
      count: 120
    },
    features: [
      "Fits 15-inch laptops",
      "Padded sleeve for protection",
      "Adjustable shoulder straps",
      "Water-resistant material"
    ]
  };

  const handleAddToCart = () => {
    // In a real app, you would add to cart logic here
    alert(`Added ${quantity} ${product.title} to cart`);
  };

  const handleBuyNow = () => {
    // In a real app, you would redirect to checkout
    alert(`Proceeding to checkout with ${product.title}`);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-[58px] bg-white-A700 sm:gap-[29px]">
      <Header className="self-stretch" />

      <div className="container-xs md:p-5">
        <div className="flex flex-col gap-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span 
              className="cursor-pointer hover:underline"
              onClick={() => router.push('/')}
            >
              Home
            </span>
            <span>/</span>
            <span 
              className="cursor-pointer hover:underline"
              onClick={() => router.push(`/products?category=${product.category}`)}
            >
              {product.category}
            </span>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>

          {/* Product Main Section */}
          <div className="flex gap-8 md:flex-col">
            {/* Product Images */}
            <div className="flex w-[50%] gap-4 md:w-full">
              <div className="flex flex-col gap-4">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer border ${activeImage === index ? 'border-gray-900' : 'border-transparent'}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Img
                      src={image}
                      width={80}
                      height={80}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-[80px] w-[80px] object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <Img
                  src={product.images[activeImage]}
                  width={600}
                  height={600}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex w-[50%] flex-col gap-6 md:w-full">
              <Heading as="h1" className="!text-3xl">
                {product.title}
              </Heading>

              <div className="flex items-center gap-2">
                <RatingBar 
                  value={product.rating.rate} 
                  isEditable={false} 
                  color="#000000" 
                  activeColor="#000000" 
                  size={20} 
                />
                <Text size="s" as="p" className="!text-gray-500">
                  ({product.rating.count} reviews)
                </Text>
              </div>

              <div className="flex items-center gap-4">
                <Text size="3xl" as="p" className="!font-bold">
                  ${product.price.toFixed(2)}
                </Text>
                {product.price > 150 && (
                  <Text size="s" as="p" className="line-through !text-gray-500">
                    ${(product.price * 1.2).toFixed(2)}
                  </Text>
                )}
              </div>

              <Text size="lg" as="p" className="!text-gray-900">
                {product.description}
              </Text>

              {/* Features */}
              <div className="flex flex-col gap-2">
                <Heading as="h3" className="!text-lg uppercase">
                  Features
                </Heading>
                <ul className="ml-5 list-disc">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <Text size="lg" as="p" className="!text-gray-900">
                        {feature}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selector */}
              <div className="flex flex-col gap-2">
                <Heading as="h3" className="!text-lg uppercase">
                  Size
                </Heading>
                <SelectBox
                  shape="square"
                  name="size"
                  placeholder="Select Size"
                  options={sizeOptions}
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="w-[50%] gap-px font-medium text-gray-900 md:w-full"
                />
              </div>

              {/* Color Selector */}
              <div className="flex flex-col gap-2">
                <Heading as="h3" className="!text-lg uppercase">
                  Color
                </Heading>
                <SelectBox
                  shape="square"
                  name="color"
                  placeholder="Select Color"
                  options={colorOptions}
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="w-[50%] gap-px font-medium text-gray-900 md:w-full"
                />
              </div>

              {/* Quantity Selector */}
              <div className="flex flex-col gap-2">
                <Heading as="h3" className="!text-lg uppercase">
                  Quantity
                </Heading>
                <div className="flex items-center gap-4">
                  <Button
                    shape="round"
                    className="w-[40px] !p-0 font-bold"
                    onClick={decreaseQuantity}
                  >
                    -
                  </Button>
                  <Text size="xl" as="p" className="!font-bold">
                    {quantity}
                  </Text>
                  <Button
                    shape="round"
                    className="w-[40px] !p-0 font-bold"
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  shape="round"
                  className="flex-1 !bg-gray-900 font-bold uppercase tracking-[0.50px]"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  shape="round"
                  className="flex-1 font-bold uppercase tracking-[0.50px] !text-gray-900 border border-gray-900"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <div className="flex border-b border-gray-300">
              <button className="px-4 py-2 font-bold uppercase border-b-2 border-gray-900">
                Description
              </button>
              <button className="px-4 py-2 font-bold uppercase text-gray-500">
                Reviews ({product.rating.count})
              </button>
              <button className="px-4 py-2 font-bold uppercase text-gray-500">
                Shipping & Returns
              </button>
            </div>
            <div className="py-6">
              <Text size="lg" as="p" className="!text-gray-900">
                {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
            </div>
          </div>
        </div>
      </div>

      <Footer className="flex items-end justify-center self-stretch bg-black-900 p-6 sm:p-5" />
    </div>
  );
}