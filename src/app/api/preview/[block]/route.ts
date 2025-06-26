import { NextResponse } from "next/server";
import { auth } from "@/auth";
import pako from "pako";

export async function GET(
  req: Request,
  { params }: { params: { block: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = Buffer.from(params.block, "utf8");
  const compressed = pako.deflate(data, { level: 9 });
  const result = Buffer.from(compressed)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const krokiUrl = `https://kroki.io/mermaid/png/${result}`;

  return NextResponse.redirect(krokiUrl, 302);
}
