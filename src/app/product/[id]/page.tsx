"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Eye } from "lucide-react";
import dynamic from "next/dynamic";

const ARViewer = dynamic(() => import("@/components/ARViewer"), { ssr: false });

const products = [
  {
    id: 1,
    name: "Luxe Lounge Chair",
    price: 1299.99,
    image: "/chair.png?height=600&width=600",
    model: "/chair.glb",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Elegant Dining Table",
    price: 2499.99,
    image: "/coffee_grinder.png?height=600&width=600",
    model: "/coffee_grinder.glb",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Modern Pendant Light",
    price: 399.99,
    image: "/placeholder.svg?height=600&width=600",
    model: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    rating: 4.7,
    reviews: 56,
  },
];

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [showAR, setShowAR] = useState(false);
  const {id} = React.use(params)
  const product = products.find((p) => p.id === parseInt(id));

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
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-t-lg"
            />
            {showAR && (
              <div className="mt-4 p-4">
                <ARViewer
                  modelSrc={product.model}
                  // iosSrc="path/to/your/3d-model.usdz"
                  poster={product.image}
                  alt="3D model of a product"
                />
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
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="space-y-4">
          <Button className="w-full" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={() => setShowAR(!showAR)}
          >
            <Eye className="mr-2 h-5 w-5" />{" "}
            {showAR ? "Hide AR View" : "View in AR"}
          </Button>
        </div>
        <Tabs defaultValue="description">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="flex-1">
              Specifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-gray-600">
              Experience the epitome of comfort and style with our{" "}
              {product.name}. Crafted with premium materials and designed for
              both aesthetics and functionality, this piece will elevate any
              space in your home.
            </p>
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
  );
}
