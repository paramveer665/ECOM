'use client';
import { useRouter } from 'next/navigation';
import {
  Img,
  Text,
  Heading,
  Button,
} from "../../components";
import { useWishlist } from '../../context/WishlistContext';

const ProductList = ({ 
  id, 
  title, 
  price, 
  description, 
  category, 
  image, 
  rating,
  isNew = false,
  isOutOfStock = false
}) => {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(id);

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking wishlist button
    if (isFavorite) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, title, price, image });
    }
  };

  const handleProductClick = () => {
    if (!isOutOfStock) {
      router.push(`/products/${id}`);
    }
  };

  return (
    <div 
      className="flex flex-col cursor-pointer group"
      onClick={handleProductClick}
    >
      <div className="flex flex-col">
        <div className="relative h-[399px] md:h-auto">
          {/* Main product image */}
          <Img
            src={image}
            width={250}
            height={340}
            alt={title}
            className="h-[399px] w-full object-cover group-hover:opacity-90 transition-opacity duration-200"
            isStatic={true}
          />
          
          {/* Hover state image overlay */}
          <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[399px] w-full md:h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Img
              src={image}
              width={250}
              height={340}
              isStatic={true}
              alt={title}
              className="h-[399px] w-full z-0"
            />
            
            {/* New product badge */}
            {isNew && (
              <Heading
                size="xs"
                as="h3"
                className="absolute left-[20.00px] top-[10.60px] m-auto uppercase !text-black-900"
              >
                new product
              </Heading>
            )}
            
            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-max w-full bg-white-A700_7f py-[163px] md:py-5">
                <Button
                  color="white_A700"
                  size="sm"
                  shape="square"
                  className="w-full font-bold sm:px-5"
                >
                  out of stock
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Product info */}
        <div className="flex self-start bg-white-A700 pt-3.5">
          <div className="flex flex-col items-start gap-0.5 w-full">
            <Heading as="h4" className="uppercase group-hover:underline">
              {title}
            </Heading>
            <Heading as="h5">$ {price}</Heading>
            <div className="flex items-start justify-between w-full">
              <Text as="p" className="underline">
                <span className="text-blue_gray-400">Sign in</span>
                <span className="text-blue_gray-400">
                  &nbsp;or Create an account to see pricing
                </span>
              </Text>
              
              <button 
                onClick={toggleWishlist} 
                className="focus:outline-none transition-transform hover:scale-110"
                aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Img
                  key={isFavorite ? "fav" : "not-fav"}
                  src={isFavorite ? "img_favorite_pink_400.svg" : "img_favorite.svg"}
                  width={24}
                  height={24}
                  alt={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                  className="h-[24px] w-[24px] self-end cursor-pointer transition-colors duration-200"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;