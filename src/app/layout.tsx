import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { ShoppingCart, User } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LuxeVR Shop',
  description: 'Experience luxury products in AR before you buy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              LuxeVR Shop
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/products" className="text-gray-600 hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-primary transition-colors">
                <ShoppingCart className="w-6 h-6" />
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-primary transition-colors">
                <User className="w-6 h-6" />
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About LuxeVR Shop</h3>
              <p className="text-gray-300">Experience luxury products in augmented reality before making your purchase. Shop with confidence and style.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-2">Stay updated with our latest products and offers.</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="flex-grow px-3 py-2 text-gray-800 rounded-l-md focus:outline-none" />
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition-colors">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-700 text-center text-gray-300">
            © 2023 LuxeVR Shop. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}