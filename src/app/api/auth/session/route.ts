import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "No active session" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: session.user,
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching session" },
      { status: 500 }
    );
  }
}
