// import dotenv from 'dotenv';
// dotenv.config();


// export async function POST(req) {
//     try {
//         const { message } = await req.json();

//         const response = await fetch(
//             'https://project-gutenberg-free-books-api1.p.rapidapi.com/subjects',
//             {
//                 method: 'GET',
//                 headers: {
//                     'x-rapidapi-key': process.env.X_RAPID_API_KEY,
//                     'x-rapidapi-host': process.env.X_RAPID_API_HOST,
//                 },

//             }
//         );

//         const data = await response.json();

//         return new Response(JSON.stringify({ data }), {
//             status: 200,
//             headers: { "Content-Type": "application/json" }
//         });

//     } catch (error) {
//         return new Response(JSON.stringify({ error: error.message }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" }
//         });
//     }
// }



export async function POST(req) {
    try {
        const { message } = await req.json();

        const response = await fetch(
            `https://gutendex.com/books?search=${encodeURIComponent(message)}`
        );

        const data = await response.json();

        const books = data.results.map(book => {
            const formats = book.formats;

            return {
                title: book.title,
                author: book.authors.map(a => a.name).join(", "),
                pdf: formats["application/pdf"] || null,
                epub: formats["application/epub+zip"] || null,
                read: formats["text/html"] || formats["text/html; charset=utf-8"] || null,
                bookPage: `https://www.gutenberg.org/ebooks/${book.id}`,
                cover: formats["image/jpeg"]
            };
        });

        return new Response(JSON.stringify({ books }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500
        });
    }
}