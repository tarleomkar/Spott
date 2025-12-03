"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button';
import { Authenticated, Unauthenticated } from  "convex/react"
import { BarLoader } from "react-spinners"
import { useStoreUser } from '@/hooks/use-store-user';
import { Plus, Ticket, Calendar , User } from 'lucide-react';
import { OnboardingModal } from './onboarding-modal';
import { useOnboarding } from '@/hooks/use-onboarding';

const Header = () => {

  const { isLoading } = useStoreUser();
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const {showOnboarding, handleOnboardingComplete, handleOnboardingSkip} = useOnboarding();

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
                <Button variant="ghost" size="sm" className="text-white hover:bg-transparent hover:text-white" onClick={() => setShowUpgradeModal(true)}>
                Pricing
                </Button>

                <Button variant="ghost" size="sm" asChild className="mr-2 text-white hover:bg-transparent hover:text-white">
                <Link href="/explore">Explore</Link>
                </Button>

              <Authenticated>
                <Button size="sm" asChild className="flex gap-2 mr-4">
                  <Link href="/create-event">
                  <Plus className="w-4 h-4" />
                  <span className='hidden sm:inline'>Create Event</span>
                  </Link>
                </Button>

                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label='My Tickets'
                      labelIcon={<Ticket size={16} />}
                      href='/my-tickets'
                    />

                    <UserButton.Link
                      label='My Events'
                      labelIcon={<Calendar  size={16} />}
                      href='/my-events'
                    />
                    <UserButton.Action label='manageAccount' />
                  </UserButton.MenuItems>

                </UserButton>
              </Authenticated>

              <Unauthenticated>
                <SignInButton mode='modal'>
                  <Button size="sm">Sign In</Button>
                </SignInButton>
              </Unauthenticated>
            </div>
        </div>

            {/* Mobile Search and Location - Below Header */}

            {/* Loader */}
            {isLoading && (<div className='absolute bottom-0 left-0 w-full'>
              <BarLoader width={"100%"} loading={isLoading} color="#a855f7" />
            </div>)}
        </nav>

            {/* Modals */}
            <OnboardingModal 
              isOpen={showOnboarding}
              onClose={handleOnboardingSkip}
              onComplete={handleOnboardingComplete}
            />
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