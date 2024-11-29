import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import {inter} from "@/app/ui/fonts";
// import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex flex-col items-center h-20 justify-center rounded-md bg-blue-100 p-4 md:h-40"
        href="/"
      >
          <p className={`${inter.className}`}>AImpact Diagnostics</p>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={async () => {
            'use server';
            // await signOut();
          }}>
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium bg-sky-200 text-white hover:bg-sky-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}