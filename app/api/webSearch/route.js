import { NextResponse } from "next/server";

async function searchPDFs(query) {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(
    query + " filetype:pdf"
  )}&api_key=${process.env.SERP_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const results = data.organic_results || [];
  console.log("Raw results:", results);

  return results.map((r) => ({
    title: r.title,
    pdf: r.link,
    snippet: r.snippet
  }));
}

function filterPDFs(results) {
  return results.filter(
    (r) =>
      r.pdf &&
      (r.pdf.endsWith(".pdf") || r.pdf.includes("/pdf"))
  );
}

export async function POST(req) {
  try {
    const { query } = await req.json();

    const rawResults = await searchPDFs(query);
    const filtered = filterPDFs(rawResults);

    // return NextResponse.json({
    //   results: filtered.slice(0, 10)//limit results to 10
    // });
    return NextResponse.json({
        results: filtered
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}