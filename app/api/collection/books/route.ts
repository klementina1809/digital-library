import { createSupabaseServerClient, getCurrentUser } from "@/lib/supabase/server";
import type { AddCollectionBookPayload } from "@/types/collection";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: collection, error: collectionError } = await supabase
    .from("collections")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (collectionError) {
    return Response.json({ message: collectionError.message }, { status: 500 });
  }

  if (!collection) {
    return Response.json([]);
  }

  const { data: books, error: booksError } = await supabase
    .from("collection_books")
    .select("*")
    .eq("collection_id", collection.id)
    .order("created_at", { ascending: false });

  if (booksError) {
    return Response.json({ message: booksError.message }, { status: 500 });
  }

  return Response.json(books);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { book } = (await request.json()) as AddCollectionBookPayload;
  const author = book.authors[0]?.name ?? null;
  const supabase = await createSupabaseServerClient();

  const { data: collection, error: collectionError } = await supabase
    .from("collections")
    .upsert({ user_id: user.id }, { onConflict: "user_id" })
    .select("id")
    .single();

  if (collectionError) {
    return Response.json({ message: collectionError.message }, { status: 500 });
  }

  const { data: collectionBook, error: bookError } = await supabase
    .from("collection_books")
    .upsert(
      {
        collection_id: collection.id,
        gutenberg_book_id: book.id,
        title: book.title,
        author,
        cover_image: book.cover_image,
      },
      { onConflict: "collection_id,gutenberg_book_id" }
    )
    .select()
    .single();

  if (bookError) {
    return Response.json({ message: bookError.message }, { status: 500 });
  }

  return Response.json(collectionBook);
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const bookId = Number(searchParams.get("book_id"));

  if (!bookId) {
    return Response.json({ message: "Book id is required" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: collection, error: collectionError } = await supabase
    .from("collections")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (collectionError) {
    return Response.json({ message: collectionError.message }, { status: 500 });
  }

  if (!collection) {
    return Response.json({ message: "Collection not found" }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from("collection_books")
    .delete()
    .eq("collection_id", collection.id)
    .eq("gutenberg_book_id", bookId);

  if (deleteError) {
    return Response.json({ message: deleteError.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
