import { searchGutenbergBooks } from "@/lib/gutenberg";
import { getCurrentUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const params = {
    q: searchParams.get("q")?.trim() ?? "",
    page: Number(searchParams.get("page")) || 1,
    page_size: Number(searchParams.get("page_size")) || 10,
  };

  try {
    const books = await searchGutenbergBooks(params);

    return Response.json(books);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch books";

    return Response.json({ message }, { status: 500 });
  }
}
