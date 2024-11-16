"use client";

import {
  AlertCircle,
  Menu,
  MoreVertical,
  Plus,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br from-blue-400 to-blue-600">
            <span className="text-lg font-bold">AR</span>
          </div>
          <h1 className="text-xl font-semibold">AR Shop Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="hidden md:flex md:items-center md:gap-4">
            <Button variant="ghost">
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      {/* <Alert+
        variant="destructive"
        className="m-4 border-red-900/50 bg-red-900/10"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Uploads Temporarily Paused</AlertDescription>
      </Alert> */}
      <div className="p-6">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            <Input
              className="w-full bg-gray-900 pl-10 text-white placeholder-gray-500"
              placeholder="Search for your capture"
              type="search"
            />
          </div>
        </div>
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Your Products</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-lg bg-gray-900"
                >
                  <Image
                    alt="Product thumbnail"
                    className="aspect-square object-cover transition-transform group-hover:scale-105"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  />
                  <div className="absolute right-2 top-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-8 w-8 bg-black/50 backdrop-blur-sm"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                    <h3 className="text-sm font-medium">Product {item}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Featured Products</h2>
            <ScrollArea className="relative">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-lg bg-gray-900"
                  >
                    <Image
                      alt="Featured product thumbnail"
                      className="aspect-square object-cover transition-transform group-hover:scale-105"
                      height="300"
                      src="/placeholder.svg"
                      width="300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                      <h3 className="text-sm font-medium">
                        Featured Product {item}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>
        </div>
      </div>
    </div>
  );
}
