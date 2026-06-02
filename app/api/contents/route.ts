import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const cards = await prisma.content.findMany({
            orderBy: {
                id: 'desc'
            },
            include: {
                category: true,
                wallet: true,
                currencies: {
                    include: {
                        currency: true
                    }
                }
            }
        })
        return NextResponse.json(cards)
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error("Error fetching content:", message)
        return NextResponse.json(
            { error: "Internal Server Error", detail: process.env.NODE_ENV === 'development' ? message : undefined },
            { status: 500 }
        )
    }
}
