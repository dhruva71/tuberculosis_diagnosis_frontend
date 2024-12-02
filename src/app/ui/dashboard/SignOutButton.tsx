'use client';

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
    const [error, setError] = useState('');

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (err) {
            console.error('Error signing out:', err);
            setError('Failed to sign out. Please try again.');
        }
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleSignOut}
                className="flex items-center justify-center text-sm font-medium md:justify-start w-full"
                variant="secondary"
                size="lg"
            >
                <PowerIcon className="w-5 text-muted-foreground" />
                <span className="hidden md:block text-foreground">Sign Out</span>
            </Button>
            {error.length > 0 && (
                <p className="text-destructive mt-2 text-sm">
                    {error}
                </p>
            )}
        </>
    );
}
