"use client";
import React, { useEffect, useState } from "react";
import {
  Img,
  Text,
  Heading,
  Button,
  CheckBox,
  SelectBox,
} from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import './page.css';
import {
  AccordionItemPanel,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  Accordion,
  AccordionItem,
} from "react-accessible-accordion";
import getProducts from '../../lib/products'; 
import ProductList from '../../components/ProductList';
import { useRouter } from "next/router";

const dropDownOptions = [
  { label: "Recommended", value: "Recommended" },
  { label: "Newest First", value: "Newest First" },
  { label: "Popular", value: "Popular" },
  { label: "High to Low", value: "High to Low" },
  { label: "Low to High", value: "Low to High" },
];

// Category mapping to group similar categories
const categoryGroups = {
  "Clothing": ["men's clothing", "women's clothing"],
  "Jewelry": ["jewelery"],
  "Electronics": ["electronics"],
  "Kids": [] // Empty as there are no kids products in the sample data
};

export default function WebPLPWithFilterPage() {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('Recommended');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
  }

  // Sort products based on selected option
  const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products];
    
    switch(sortOption) {
      case 'Newest First':
        return sortedProducts.sort((a, b) => b.id - a.id);
      case 'Popular':
        return sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
      case 'High to Low':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'Low to High':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'Recommended':
      default:
        return products;
    }
  };

  // Apply filters whenever products, selectedCategories or selectedGenders change
  useEffect(() => {
    let result = [...products];
    
    // Filter by category if any selected
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by gender if any selected
    if (selectedGenders.length > 0) {
      result = result.filter(product => {
        if (product.category === "men's clothing") return selectedGenders.includes("men");
        if (product.category === "women's clothing") return selectedGenders.includes("women");
        return false; // Other categories don't have gender
      });
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategories, selectedGenders]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleGenderChange = (gender) => {
    setSelectedGenders(prev => 
      prev.includes(gender) 
        ? prev.filter(g => g !== gender) 
        : [...prev, gender]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedGenders([]);
  };

  const sortedProducts = sortProducts(filteredProducts, sortOption);

  // Get unique categories from products
  const allCategories = [...new Set(products.map(product => product.category))];
  
  // Get category groups that actually exist in our products
  const activeCategoryGroups = Object.entries(categoryGroups)
    .map(([groupName, categories]) => ({
      name: groupName,
      categories: categories.filter(cat => allCategories.includes(cat))
    }))
    .filter(group => group.categories.length > 0);

    console.log(sortedProducts)

  return (
    <div className="flex w-full flex-col items-center gap-[58px] bg-white-A700 sm:gap-[29px]">
      <Header className="self-stretch" />

      <div className="container-xs md:p-5">
        <div className="flex flex-col items-center gap-[72px] md:gap-[54px] sm:gap-9">
          <div className="flex w-[58%] flex-col items-center gap-[19px] md:w-full">
            <Text
              size="2xl"
              as="p"
              className="text-center uppercase tracking-[1.00px] !text-gray-900"
            >
              DISCOVER OUR PRODUCTS
            </Text>
            <Text
              size="xl"
              as="p"
              className="w-full text-center leading-10 !text-gray-900"
            >
              Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
              scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
              dolor.
            </Text>
          </div>
          <div className="flex flex-col gap-8 self-stretch">
            <div>
              <div className="flex items-start justify-between gap-5 border-b-[0.5px] border-solid border-gray-300 bg-white-A700 py-6 pr-6 sm:flex-col sm:py-5 sm:pr-5">
                <div className="flex w-[25%] items-start justify-between gap-5 sm:w-full">
                  <Heading as="h1" className="mt-[7px] uppercase">
                    {`${filteredProducts.length} Items`}
                  </Heading>
                  <div className="relative h-[40px] w-[43%]">
                    <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-full bg-white-A700 py-3">
                      <Img
                        src="img_arrow_left.svg"
                        width={16}
                        height={16}
                        alt="arrowleft"
                        className="h-[16px] w-[16px]"
                      />
                    </div>
                    <Text
                      size="md"
                      as="p"
                      className="absolute right-[0.00px] top-[9.25px] m-auto text-right !font-adobecaslonpro underline cursor-pointer"
                      onClick={() => setIsFilterVisible(!isFilterVisible)}
                    >
                      {isFilterVisible ? "HIDE FILTER" : "SHOW FILTER"}
                    </Text>
                  </div>
                </div>
                
                <SelectBox
                  menuPortalTarget={document.getElementById("menuPortalTarget")}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                    menu: base => ({ ...base, zIndex: 9999 })
                  }}
                  shape="square"
                  indicator={
                    <Img
                      src="img_checkmark.svg"
                      width={16}
                      height={16}
                      alt="checkmark"
                      className="h-[16px] w-[16px]"
                    />
                  }
                  name="recommended"
                  placeholder={`Recommended`}
                  options={dropDownOptions}
                  value={dropDownOptions.find(option => option.value === sortOption)}
                  onChange={(selectedOption) => setSortOption(selectedOption.value)}
                  className="mr-3 mt-[7px] w-[20%] gap-px font-bold uppercase text-gray-900 sm:mr-0 sm:w-full sm:pr-5 z-[9999]"
                />
              </div>
            </div>
            <div className="flex items-start gap-4 md:flex-col">
              {isFilterVisible && (
                <div className="flex w-[24%] flex-col gap-[21px] md:w-full">
                  <CheckBox
                    name="customizable"
                    label="Customizable"
                    id="customizable"
                    className="gap-2 py-px pr-[35px] text-left text-lg font-bold uppercase text-gray-900 sm:pr-5"
                  />
                  <div className="flex flex-col gap-[21px]">
                    <div className="h-px bg-gray-300" />
                    <Accordion
                      preExpanded={[0]}
                      className="flex flex-col gap-[25px]"
                    >
                      {/* Ideal For (Gender) Accordion */}
                      <AccordionItem uuid="ideal-for">
                        <div className="flex flex-1 flex-col gap-2">
                          <AccordionItemHeading className="w-full">
                            <AccordionItemButton>
                              <AccordionItemState>
                                {(props) => (
                                  <div className="flex flex-wrap items-center justify-between gap-5">
                                    <Heading as="h2" className="uppercase">
                                      IDEAL FOR
                                    </Heading>
                                    <Img
                                      src="img_checkmark.svg"
                                      width={16}
                                      height={16}
                                      alt="checkmark"
                                      className="h-[16px] w-[16px] self-end"
                                    />
                                  </div>
                                )}
                              </AccordionItemState>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <div className="relative mt-[-22px] flex w-[35%] flex-col items-start gap-[23px] md:w-full">
                              <Text
                                size="lg"
                                as="p"
                                className="!text-gray-900"
                              >
                                All
                              </Text>
                              <Text
                                size="md"
                                as="p"
                                className="!text-blue_gray-200 underline cursor-pointer"
                                onClick={() => setSelectedGenders([])}
                              >
                                Unselect all
                              </Text>
                              <CheckBox
                                name="men"
                                label="Men"
                                id="men"
                                checked={selectedGenders.includes("men")}
                                onChange={() => handleGenderChange("men")}
                                className="gap-2 p-px text-left text-base text-gray-900"
                              />
                              <CheckBox
                                name="women"
                                label="Women"
                                id="women"
                                checked={selectedGenders.includes("women")}
                                onChange={() => handleGenderChange("women")}
                                className="gap-2 p-px text-left text-base text-gray-900"
                              />
                              <CheckBox
                                name="babykids"
                                label="Baby & Kids"
                                id="babykids"
                                disabled={true} // No kids products in sample data
                                className="gap-2 self-stretch text-left text-base text-gray-900 opacity-50"
                              />
                            </div>
                          </AccordionItemPanel>
                        </div>
                        <div className="h-px w-full rotate-[0deg] bg-gray-300" />
                      </AccordionItem>

                      {/* Category Group Accordions */}
                      {activeCategoryGroups.map((group, index) => (
                        <AccordionItem key={group.name} uuid={`category-${index}`}>
                          <div className="flex flex-1 flex-col gap-2">
                            <AccordionItemHeading className="w-full">
                              <AccordionItemButton>
                                <AccordionItemState>
                                  {(props) => (
                                    <div className="flex flex-wrap items-center justify-between gap-5">
                                      <Heading as="h2" className="uppercase">
                                        {group.name.toUpperCase()}
                                      </Heading>
                                      <Img
                                        src="img_checkmark.svg"
                                        width={16}
                                        height={16}
                                        alt="checkmark"
                                        className="h-[16px] w-[16px] self-end"
                                      />
                                    </div>
                                  )}
                                </AccordionItemState>
                              </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                              <div className="relative mt-[-22px] flex w-[35%] flex-col items-start gap-[23px] md:w-full">
                                <Text
                                  size="lg"
                                  as="p"
                                  className="!text-gray-900"
                                >
                                  All {group.name}
                                </Text>
                                <Text
                                  size="md"
                                  as="p"
                                  className="!text-blue_gray-200 underline cursor-pointer"
                                  onClick={() => 
                                    setSelectedCategories(prev => 
                                      prev.filter(cat => !group.categories.includes(cat))
                                    )
                                  }
                                >
                                  Unselect all
                                </Text>
                                {group.categories.map(category => (
                                  <CheckBox
                                    key={category}
                                    name={category}
                                    label={
                                      category === "men's clothing" ? "Men's Clothing" :
                                      category === "women's clothing" ? "Women's Clothing" :
                                      category.charAt(0).toUpperCase() + category.slice(1)
                                    }
                                    id={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="gap-2 p-px text-left text-base text-gray-900"
                                  />
                                ))}
                              </div>
                            </AccordionItemPanel>
                          </div>
                          <div className="h-px w-full rotate-[0deg] bg-gray-300" />
                        </AccordionItem>
                      ))}

                      {/* Reset All Filters */}
                      <div className="mt-4">
                        <Button
                          onClick={resetFilters}
                          className="w-full text-left text-sm font-medium text-blue-500 underline"
                        >
                          Reset All Filters
                        </Button>
                      </div>
                    </Accordion>
                  </div>
                </div>
              )}

              {/* Products section */}
              <div className={`grid flex-1 gap-4 ${isFilterVisible ? 'grid-cols-3' : 'grid-cols-4'} md:grid-cols-2 sm:grid-cols-1`}>
                {sortedProducts.map((product) => (
                  <ProductList
                    key={product.id}
                    {...product}
                    isNew={product.id % 3 === 0}
                    isOutOfStock={product.rating.count < 50}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer className="flex items-end justify-center self-stretch bg-black-900 p-6 sm:p-5" />
    </div>
  );
}