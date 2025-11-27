"use client";
import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
const Header = () => {
  return (
    <>
        <nav className='fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
            {/* Logo */}
            <Link href={"/"} className='flex items-center'>
            <Image 
                src="/spott.png" 
                alt='Spott logo' 
                width={500} 
                height={500} 
                className='w-full h-11'
                priority
            />

            {/* Pro badge */}
            </Link>
            {/* Seaarch & Locations - Desktop only */}

            {/* Right Side Actions */}
            <div className='flex items-center'>
              <SignedOut>
                <SignInButton>
                  <button className="mr-3 bg-transparent rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-white/5">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              {/* Display user's first name next to the UserButton */}
              <SignedInContent />
            </SignedIn>
            </div>
        </div>

            {/* Mobile Search and Location - Below Header */}
        </nav>

            {/* Modals */}
    </>
  )
}

export default Header

function SignedInContent() {
  const { user } = useUser();
  const name = user?.firstName || user?.fullName || user?.emailAddresses?.[0]?.email;
  return (
    <div className="flex items-center gap-3">
      {name && <span className="text-sm font-medium text-gray-200 hidden sm:block">{name}</span>}
      <UserButton />
    </div>
  );
}