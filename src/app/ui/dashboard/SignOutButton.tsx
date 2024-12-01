// app/ui/dashboard/SignOutButton.tsx
'use client';

import {PowerIcon} from '@heroicons/react/24/outline';
import {signOut} from 'next-auth/react';
import {useState} from 'react';

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
            <button
                type="button"
                onClick={handleSignOut}
                className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium bg-gray-300 text-black hover:bg-sky-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
                <PowerIcon className="w-6"/>
                <div className="hidden md:block">Sign Out</div>
            </button>
            {error.length > 0 && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
}
