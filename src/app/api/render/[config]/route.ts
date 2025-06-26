import { NextResponse } from "next/server";
import { MermaidConfig } from "../../types";
import { decrypt } from "@/lib/encryption";
import { Client } from "@notionhq/client";
import Pako from "pako";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ config: string }> }
) {
  const { config: encryptedConfig } = await params;

  if (!encryptedConfig) {
    return NextResponse.json(
      { error: "Missing configuration in URL." },
      { status: 400 }
    );
  }

  let config: MermaidConfig;
  try {
    config = await decrypt<MermaidConfig>(encryptedConfig);

    if (!config.pageId || !config.blockId || !config.accessToken) {
      return NextResponse.json(
        {
          error: "Invalid decrypted configuration.",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error decrypting config:", error);
    return NextResponse.json(
      {
        error: "Invalid or malformed encrypted configuration.",
      },
      { status: 400 }
    );
  }
  const notion = new Client({ auth: config.accessToken });

  try {
    const block = await notion.blocks.retrieve({ block_id: config.blockId });

    if (
      "type" in block &&
      block.type === "code" &&
      "code" in block &&
      "language" in block.code &&
      block.code.language === "mermaid" &&
      "rich_text" in block.code
    ) {
      const mermaidContent = block.code.rich_text
        .map((text: any) => text.plain_text)
        .join("");

      const data = Buffer.from(mermaidContent, "utf8");
      const compressed = Pako.deflate(data, { level: 9 });
      const result = Buffer.from(compressed)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
      const krokiUrl = `https://kroki.io/mermaid/png/${result}`;

      return NextResponse.redirect(krokiUrl, 302);
    } else {
      return NextResponse.json(
        { error: "The specified block is not a Mermaid code block." },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Error fetching Notion block or redirecting:", error);

    if (error.code && error.status) {
      return NextResponse.json(
        { error: `Notion API Error (${error.code}): ${error.message}` },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
