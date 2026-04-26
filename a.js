// // No need for this import ❌
// // import { get } from "node:http";

// async function getArchiveDetails(identifier) {
//   const res = await fetch(`https://archive.org/metadata/${identifier}`);
//   const data = await res.json();

//   return {
//     title: data.metadata?.title || "Unknown",
//     author: data.metadata?.creator || "Unknown",
//     year: data.metadata?.year || null,
//     files: data.files || [] // ✅ prevent undefined
//   };
// }

// function extractFormats(identifier, files) {
//   // ✅ safety check
//   if (!files || !Array.isArray(files)) {
//     return {
//       pdf: null,
//       epub: null,
//       mobi: null,
//       txt: null,
//       mp3: null
//     };
//   }

//   const base = `https://archive.org/download/${identifier}/`;

//   // ✅ safer + reusable
//   const findFile = (ext) =>
//     files.find(f => f.name && f.name.toLowerCase().endsWith(ext));

//   const pdfFile = findFile(".pdf");
//   const epubFile = findFile(".epub");
//   const mobiFile = findFile(".mobi");
//   const txtFile = findFile(".txt");
//   const mp3File = findFile(".mp3");

//   return {
//     pdf: pdfFile ? base + pdfFile.name : null,
//     epub: epubFile ? base + epubFile.name : null,
//     mobi: mobiFile ? base + mobiFile.name : null,
//     txt: txtFile ? base + txtFile.name : null,
//     mp3: mp3File ? base + mp3File.name : null
//   };
// }

// function getAccessLinks(identifier) {
//   return {
//     read: `https://archive.org/details/${identifier}`,
//     borrow: `https://archive.org/details/${identifier}/mode/1up`,
//     downloadPage: `https://archive.org/download/${identifier}`,
//     cover: `https://archive.org/services/img/${identifier}`
//   };
// }

// export async function getFullBookData(identifier) {
//   const res = await fetch(`https://archive.org/metadata/${identifier}`);
//   const data = await res.json();

//   const files = data.files || []; // ✅ FIX HERE

//   const formats = extractFormats(identifier, files);
//   const links = getAccessLinks(identifier);

//   return {
//     title: data.metadata?.title || "Unknown",
//     author: data.metadata?.creator || "Unknown",
//     year: data.metadata?.year || null,
//     ...formats,
//     ...links
//   };
// }

// // ✅ test
// getFullBookData("sherlock")
//   .then(book => {
//     console.log(book);
//   })
//   .catch(err => {
//     console.error("Error:", err);
//   });


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

async function searchBooksWithPDF(query) {
  const books = await searchByName(query);

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

  return results;
}

searchBooksWithPDF("power").then(books => {
  console.log(books);
});