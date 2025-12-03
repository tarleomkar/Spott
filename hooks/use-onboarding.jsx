"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useConvexQuery } from "./use-convex-query";
import { api } from "@/convex/_generated/api";

const ATTENDEE_PAGES = ["/explore", "/events", "/my-tickets"];

export function useOnboarding() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const { data: currentUser, isLoading } = useConvexQuery(
        api.users.getCurrentUser
    );

    useEffect(() => {
        if (isLoading || !currentUser) return;

        if (!currentUser.hasCompletedOnboarding) {
            // Check if current page requires onboading
            const requiresOnboarding = ATTENDEE_PAGES.some((page) => 
                pathname.startsWith(page)
            );

            if (requiresOnboarding) {
                setShowOnboarding(true);
            }
        }
    }, [currentUser, pathname, isLoading]);

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
        // Refresh to get updated user data
        router.refresh();
    };

    const handleOnboardingSkip = () => {
        setShowOnboarding(false);
        // Redirect back to homepage of they skip
        router.push("/");
    };

    return {
    showOnboarding,
    handleOnboardingComplete,
    handleOnboardingSkip,
    setShowOnboarding,
    needsOnboarding: currentUser && !currentUser.hasCompletedOnboarding,

    }
}