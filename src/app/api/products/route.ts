import { NextResponse } from 'next/server'

// This would typically come from a database
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
        name: "Bottle",
        price: 2499.99,
        image: "/coffee_grinder.png?height=600&width=600",
        model: "/bottle.glb",
        rating: 4.9,
        reviews: 89,
    },
    {
        id: 3,
        name: "Sofa",
        price: 39999.99,
        image: "/sofa.png?height=600&width=600",
        model: "/sofa.glb",
        rating: 4.7,
        reviews: 56,
    },
];
export async function GET(request: Request) {
    // Simulate a delay to mimic a real database query
    await new Promise(resolve => setTimeout(resolve, 500))

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        const product = products.find(p => p.id === parseInt(id))
        if (product) {
            return NextResponse.json(product)
        } else {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
    }

    return NextResponse.json(products)
}

export async function POST(request: Request) {
    const product = await request.json()

    // In a real application, you would save this to a database
    console.log('Received new product:', product)

    // Simulate a delay to mimic a database operation
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return a success response
    return NextResponse.json({ message: 'Product added successfully', product }, { status: 201 })
}