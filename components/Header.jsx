"use client";

import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button';
import { Authenticated, Unauthenticated } from  "convex/react"

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
              <Authenticated>
                {/* Create Event */}

                <UserButton />
              </Authenticated>
              <Unauthenticated>
                <SignInButton mode='modal'>
                  <Button size="sm">Sign In</Button>
                </SignInButton>
              </Unauthenticated>
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