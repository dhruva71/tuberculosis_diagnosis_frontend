'use client';

import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import {ArrowRightIcon} from '@heroicons/react/20/solid';
import {useActionState} from 'react';
import {authenticate} from '@/app/lib/actions';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";


export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-8 py-12 sm:px-6 lg:px-8">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>AImpact Diagnostics</CardTitle>
                    <CardDescription>Please log in to continue.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-3">
                        <div className="flex-1 rounded-lg bg-background px-6 pb-4 pt-0 shadow-md">
                            <div className="w-full">
                                <div>
                                    <Label htmlFor="email"
                                           className="mb-3 mt-5 block text-xs font-medium text-foreground">
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            required
                                            className="pl-10"
                                        />
                                        <AtSymbolIcon
                                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="password"
                                           className="mb-3 mt-5 block text-xs font-medium text-foreground">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            required
                                            minLength={6}
                                            className="pl-10"
                                        />
                                        <KeyIcon
                                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
                                Log in
                                <ArrowRightIcon className="ml-auto h-5 w-5"/>
                            </Button>
                            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                                {errorMessage && (
                                    <>
                                        <ExclamationCircleIcon className="h-5 w-5 text-destructive"/>
                                        <p className="text-sm text-destructive">{errorMessage}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Link href="/" className="flex justify-start flex-row w-full text-sm font-medium text-foreground">
                        <ArrowLeftStartOnRectangleIcon className="mr-2 h-4 w-4"/>
                        Back to home
                    </Link>
                </CardFooter>
            </Card>

        </main>
    );
}
