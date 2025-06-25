'use client';
import React, { useState, useEffect } from 'react';
import { Heading, Img, Text } from './..';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';

export default function Header({ ...props }) {
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

   const navLinks = [
    { label: 'SHOP', href: '/' },
    { label: 'SKILLS', href: '#' },
    { label: 'STORIES', href: '#' },
    { label: 'ABOUT', href: '/aboutus' },
    { label: 'CONTACT US', href: '/contactus' },
    { label: 'PRODUCTS', href: '/products' },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header {...props}>
      <div className="flex justify-center self-stretch bg-black-900 "></div>

      <div className="relative flex justify-center self-stretch border-b border-solid border-gray-300 bg-white-A700 py-[25px] sm:py-5">
        <div className="container-xs mt-2.5 flex flex-col items-center gap-[59px] md:p-5 sm:gap-[29px] w-full">
          <div className="flex items-center justify-between w-full">
            {/* Hamburger (mobile only) */}
            <button
              className="  hidden sm:block  z-50"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Img
              key={toggleMenu ? "fatov" : "not-fav"}
                src={isMenuOpen ? 'icon8_close.svg' : 'icons8-hamburger-menu.svg'}
                width={24}
                height={24}
                alt="menu"
                className="h-[24px] w-[24px]"
              />
            </button>

            {/* Logo */}
            <div className="flex  items-center gap-2">
              <Img
                src="img_header_logo.svg"
                width={36}
                height={36}
                alt="headerlogo"
                className="h-[36px] w-[36px]"
              />
              <Text size="2xl" as="p" className="!text-gray-900 justify-center">
                Task
              </Text>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Link href="#">
                <Img src="img_contrast.svg" width={24} height={24} alt="contrast"  className="focus:outline-none transition-transform hover:scale-110"/>
              </Link>
              <Link
  href="/wishlist"
  className="group flex text-black-900 relative focus:outline-none transition-transform hover:scale-110"
>
  <div className="absolute -top-2 -right-2 text-xs bg-pink-400 text-white rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg]">
  {wishlist.length}
</div>

  <Img src="img_favorite.svg" width={24} height={24} alt="favorite" className="group" />
</Link>

              <Link href="#">
                <Img src="img_bag.svg" width={24} height={24} alt="bag" className="focus:outline-none transition-transform hover:scale-110"/>
              </Link>
              <Link href="#">
                <Img src="img_lock.svg" width={24} height={24} alt="lock" className="focus:outline-none transition-transform hover:scale-110"/>
              </Link>
              <div className="hidden md:flex items-center gap-[5px]">
                <Heading size="s" as="h6" className="tracking-[1.00px]">
                  ENG
                </Heading>
                <Link href="#">
                  <Img src="img_checkmark.svg" width={16} height={16} alt="checkmark" />
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="flex flex-wrap gap-[63px]  sm:hidden md:gap-5">
            {navLinks.map((item, idx) => (
              <li key={idx}>
                <Link href={item.href} className='focus:outline-none transition-transform hover:scale-110'>
                  <Heading size="lg" as="h5" className="tracking-[1.00px]">
                    {item.label}
                  </Heading>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Overlay */}
        <div
          id="mobile-menu"
          className={`xl:hidden fixed top-0 left-0 h-full w-full bg-white bg-opacity-95 z-40 transition-transform duration-300 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col h-full p-6 gap-6">
            {['SHOP', 'SKILLS', 'STORIES', 'ABOUT', 'CONTACT US', 'PRODUCTS'].map((item, idx) => (
              <Link
                key={idx}
                href={item === 'PRODUCTS' ? '/products' : '#'}
                onClick={closeMenu}
              >
                <Heading size="lg" as="h5" className="tracking-[1.00px]">
                  {item}
                </Heading>
              </Link>
            ))}
          </div>
          {/* Click outside to close */}
          <div
            className="fixed inset-0 bg-black opacity-25"
            onClick={closeMenu}
          ></div>
        </div>
      </div>
    </header>
  );
}
