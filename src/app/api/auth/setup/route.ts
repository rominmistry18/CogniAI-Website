import { NextRequest, NextResponse } from "next/server";
import { createInitialAdmin } from "@/lib/auth";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password, name } = result.data;

    // Create initial admin
    const createResult = await createInitialAdmin(email, password, name);

    if (!createResult.success) {
      return NextResponse.json(
        { error: createResult.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: "Admin account created successfully. You can now log in."
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "An error occurred during setup" },
      { status: 500 }
    );
  }
}
