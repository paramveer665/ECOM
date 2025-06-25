'use client';

import ProductList from '../../components/ProductList';
import { useWishlist } from '@/context/WishlistContext';
import {
  Img,
  Text,
  Heading,
  Button,
  CheckBox,
  SelectBox,
  
} from "../../components";

export default function WishlistPage() {
  const { wishlist,removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
  
  {wishlist.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-12">
      <Img 
        src="img_empty_wishlist.svg" 
        width={120}
        height={120}
        alt="Empty wishlist"
        className="mb-4"
      />
      <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
      <Button
        color="pink_400"
        size="md"
        shape="round"
        className="px-6 font-medium"
        onClick={() => router.push('/products')}
      >
        Browse Products
      </Button>
    </div>
  ) : (
    <div className="grid flex-1 grid-cols-3 gap-4 md:grid-cols-2 md:self-stretch sm:grid-cols-1">
      {wishlist.map(product => (
        <div 
          key={product.id} 
          className="group relative transition-all hover:shadow-lg"
        >
          <ProductList {...product} />
          <button 
            onClick={() => removeFromWishlist(product.id)}
            className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Img
              src="img_close.svg"
              width={16}
              height={16}
              alt="Remove"
              className="h-4 w-4"
            />
          </button>
        </div>
      ))}
    </div>
  )}
</div>
  );
}