import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from 'lucide-react'

const products = [
  { id: 1, name: 'Luxe Lounge Chair', price: 1299.99, image: '/chair.png', rating: 4.8 },
  { id: 2, name: 'Elegant Mixture', price: 2499.99, image: '/elegant_table.jpg', rating: 4.9 },
  { id: 3, name: 'Sofa', price: 399.99, image: "/sofa.png", rating: 4.7 },
  { id: 4, name: 'Plush Area Rug', price: 799.99, image: '/rag.jpg', rating: 4.6 },
]

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to LuxeVR Shop</h1>
        <p className="text-xl text-gray-600 mb-8">Experience luxury furniture in augmented reality before you buy</p>
        <Button asChild size="lg">
          <Link href="/products">
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/product/${product.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Experience AR Shopping</h2>
        <p className="text-xl mb-6">See how our products look in your space before making a purchase</p>
        <Button asChild variant="secondary" size="lg">
          <Link href="/ar-demo">
            Try AR Demo
          </Link>
        </Button>
      </section>
    </div>
  )
}