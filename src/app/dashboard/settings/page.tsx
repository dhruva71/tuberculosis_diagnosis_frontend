"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ModeToggle from "@/app/components/themeToggle";

export default function SettingsPage() {
  return (
    <main className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      <Separator className="my-6" />
      <div className="grid gap-6">
        {/* Appearance Section */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Switch between light, dark, or system themes.
              </span>
              <ModeToggle />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
