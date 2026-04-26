import { NextResponse } from "next/server";

async function searchByName(query) {
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)} AND mediatype:texts&fl[]=identifier,title,creator&rows=5&output=json`;

  const res = await fetch(url);
  const data = await res.json();

  return data.response.docs.map(book => ({
    id: book.identifier,   // 👈 THIS IS WHAT YOU NEED
    title: book.title,
    author: book.creator
  }));
}

async function getPDF(identifier) {
  const res = await fetch(`https://archive.org/metadata/${identifier}`);
  const data = await res.json();

  const files = data.files || [];

  const pdfFile = files.find(f =>
    f.name && f.name.toLowerCase().endsWith(".pdf")
  );

  return pdfFile
    ? `https://archive.org/download/${identifier}/${pdfFile.name}`
    : null;
}

export async function POST(req) {
  const { message } = await req.json();
  const books = await searchByName(message);

  const results = await Promise.all(
    books.map(async (book) => {
      const pdf = await getPDF(book.id);

      return {
        ...book,
        pdf,
        read: `https://archive.org/details/${book.id}`,
        cover: `https://archive.org/services/img/${book.id}`
      };
    })
  );

  return new Response(JSON.stringify({ books: results }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
