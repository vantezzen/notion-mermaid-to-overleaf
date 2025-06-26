import { auth } from "@/auth";
import { BlockObjectResponse, Client } from "@notionhq/client";
import { NextResponse } from "next/server";

export interface MermaidBlock {
  id: string;
  content: string;
  pageId: string;
}

/**
 * Extracts the Notion page ID from a given Notion page URL.
 * Handles various URL formats including database pages and regular pages.
 * @param url The Notion page URL.
 * @returns The Notion page ID or null if not found.
 */
function getNotionPageIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split("/");
    let pageId: string | undefined;

    // Notion page URLs often have the page ID as the last segment before the hash/query
    // or as part of a database item URL.
    // Example: https://www.notion.so/My-Page-ID-1234567890abcdef1234567890abcdef
    // Example: https://www.notion.so/username/Database-Name-dbid?p=pageid
    // Example: https://www.notion.so/username/Page-Title-pageid

    // Attempt to find a 32-character hexadecimal ID (standard Notion ID format)
    const uuidRegex = /[0-9a-fA-F]{32}/;
    for (const segment of pathSegments) {
      const match = segment.match(uuidRegex);
      if (match) {
        pageId = match[0];
        break;
      }
    }

    // If a UUID was found in the path, use it.
    if (pageId) {
      return pageId;
    }

    // Fallback for URLs that might have the ID in the query parameter 'p' (for database items)
    if (urlObj.searchParams.has("p")) {
      return urlObj.searchParams.get("p");
    }

    // If no UUID or 'p' parameter, try to extract from the last path segment,
    // assuming it's in the format "Page-Title-pageid"
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment) {
      const parts = lastSegment.split("-");
      if (parts.length > 0) {
        const potentialId = parts[parts.length - 1];
        // Check if it looks like a Notion ID (e.g., 32 hex chars)
        if (potentialId.match(uuidRegex)) {
          return potentialId;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error parsing URL:", error);
    return null;
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const notionApiKey = session.access_token;
  if (!notionApiKey) {
    return NextResponse.json(
      { error: "Notion API cannot be accessed." },
      { status: 500 }
    );
  }
  const notion = new Client({ auth: notionApiKey });

  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Missing "url" in request body.' },
        { status: 400 }
      );
    }

    const pageId = getNotionPageIdFromUrl(url);

    if (!pageId) {
      return NextResponse.json(
        {
          error:
            "Could not extract a valid Notion page ID from the provided URL.",
        },
        { status: 400 }
      );
    }

    let allBlocks: BlockObjectResponse[] = [];
    let cursor: string | undefined = undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });

      allBlocks = allBlocks.concat(response.results as BlockObjectResponse[]);
      cursor = response.next_cursor || undefined;
    } while (cursor);

    // Filter for code blocks that have 'mermaid' as their language
    const mermaidBlocks: MermaidBlock[] = [];

    for (const block of allBlocks) {
      if (block.type === "code" && block.code.language === "mermaid") {
        const content = block.code.rich_text
          .map((text) => text.plain_text)
          .join("");
        mermaidBlocks.push({
          id: block.id,
          content,
          pageId,
        });
      }
    }

    if (mermaidBlocks.length === 0) {
      return NextResponse.json(
        { message: "No Mermaid chart blocks found on this Notion page." },
        { status: 200 }
      );
    }

    return NextResponse.json(mermaidBlocks, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Notion page blocks:", error);

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
