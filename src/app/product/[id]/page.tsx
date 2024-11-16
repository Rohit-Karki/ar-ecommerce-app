"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from "next/dynamic";

const ARViewer = dynamic(() => import("@/components/ARViewer"), { ssr: false });

const products = [
  {
    id: 1,
    name: "Luxe Lounge Chair",
    price: 1299.99,
    images: ["/chair.png?height=600&width=600", "/chair.png?height=600&width=600"],
    model: "/chair.glb",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Elegant Dining Table",
    price: 2499.99,
    images: ["/coffee_grinder.png?height=600&width=600", "/coffee_grinder.png?height=600&width=600",],
    model: "/coffee_grinder.glb",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Sofa",
    price: 39999.99,    
    images: ["/sofa.png?height=600&width=600"],  
    model: "/sofa.glb",
    rating: 4.7,
    reviews: 56,
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const [showAR, setShowAR] = useState(false);
  const { id } = React.use(params);
  const product = products.find((p) => p.id === parseInt(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length)
  }


  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <Image 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - Image ${currentImageIndex + 1}`} 
                width={600} 
                height={600} 
                className="w-full h-auto object-cover rounded-t-lg"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
            <div className="flex justify-center mt-4 space-x-2 p-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 border-2 rounded-md overflow-hidden ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} - Thumbnail ${index + 1}`} 
                    width={64} 
                    height={64} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            {showAR && (
              <div className="mt-4 p-4">
                <ARViewer modelSrc={product.model} alt={product.name} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="lg:w-1/3 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
        </div>
        <div className="space-y-4">
          <Button className="w-full" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <Button variant="outline" className="w-full" size="lg" onClick={() => setShowAR(!showAR)}>
            <Eye className="mr-2 h-5 w-5" /> {showAR ? 'Hide AR View' : 'View in AR'}
          </Button>
        </div>
        <Tabs defaultValue="description">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
            <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-gray-600">{product.description}</p>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <ul className="list-disc list-inside text-gray-600">
              <li>Premium quality materials</li>
              <li>Ergonomic design</li>
              <li>Easy assembly</li>
              <li>1-year warranty</li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}