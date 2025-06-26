import { NextResponse } from "next/server";
import { encrypt } from "@/lib/encryption"; // We'll create this helper
import { auth } from "@/auth";
import { MermaidConfig } from "../types";

/**
 * Next.js App Route handler for encrypting a block object.
 * This route receives a 'block' object in the request body and encrypts it
 * using the AUTH_SECRET environment variable.
 *
 * @param req The incoming Next.js request object, containing the block in its body.
 * @returns A JSON response with the encrypted string or an error message.
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { block } = await req.json();

    if (!block) {
      return NextResponse.json(
        { error: 'Missing "block" in request body.' },
        { status: 400 }
      );
    }

    const config: MermaidConfig = {
      accessToken: session.access_token!,
      blockId: block.id,
      pageId: block.pageId,
      createdAt: new Date().toISOString(),
    };

    const encryptedConfig = await encrypt(config);
    const chartUrl = `${process.env.VERCEL_URL}/api/render/${encodeURIComponent(
      encryptedConfig
    )}`;
    return NextResponse.json({ chartUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Error encrypting block:", error);
    return NextResponse.json(
      {
        error: "Failed to encrypt block. Ensure AUTH_SECRET is set and valid.",
      },
      { status: 500 }
    );
  }
}
