import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

// GET - Fetch public site settings
export async function GET(request: NextRequest) {
  try {
    const settings = await db.setting.findMany({
      where: {
        // Only fetch public-safe settings
        key: {
          in: [
            "site_title",
            "site_description",
            "site_keywords",
            "company_name",
            "company_email",
            "company_phone",
            "company_address",
            "social_twitter",
            "social_linkedin",
            "social_facebook",
            "social_instagram",
            "enable_blog",
            "enable_careers",
            "enable_contact_form",
            "maintenance_mode",
          ],
        },
      },
    });

    // Convert to key-value object, parsing JSON values
    const settingsObject = settings.reduce((acc, setting) => {
      try {
        acc[setting.key] = JSON.parse(setting.value);
      } catch {
        acc[setting.key] = setting.value;
      }
      return acc;
    }, {} as Record<string, unknown>);

    return NextResponse.json({ settings: settingsObject });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
