import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { foodItems } = await req.json();

    // Mock response for recipes based on food items
    const recipes = foodItems.map((item: { name: string }) => `Recipe for ${item.name}`);

    return NextResponse.json({ recipes });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
