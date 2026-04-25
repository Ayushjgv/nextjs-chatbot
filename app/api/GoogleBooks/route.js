import { json } from "node:stream/consumers";

export async function POST(req) {
    try {
        
        const { message } = await req.json();
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${message}&startIndex=0&maxResults=40`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        const books = data.items.map((book)=>{
            return {
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author",
                pdf: book.accessInfo.pdf.isAvailable ? book.accessInfo.pdf.downloadLink : null,
                epub: book.accessInfo.epub.isAvailable ? book.accessInfo.epub.downloadLink : null,
                read: book.accessInfo.webReaderLink || null,
                bookPage: book.volumeInfo.infoLink || null,
                cover: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null
            }
        });

        return new Response(JSON.stringify({ books }),{
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}