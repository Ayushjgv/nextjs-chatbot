export async function searchArchive(query) {
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier,title,creator&rows=10&page=1&output=json`;

  const res = await fetch(url);
  const data = await res.json();

  return data.response.docs.map(book => ({
    id: book.identifier,
    title: book.title,
    author: book.creator
  }));
}

searchArchive("sherlock holmes").then(books => {
  console.log(books);
});


export async function getBookFiles(identifier) {
  const res = await fetch(`https://archive.org/metadata/${identifier}`);
  const data = await res.json();

  const files = data.files;

  const pdf = files.find(file => file.name.endsWith(".pdf"));

  return {
    pdf: pdf ? `https://archive.org/download/${identifier}/${pdf.name}` : null
  };
}

export async function getArchiveBooks(query) {
  const books = await searchArchive(query);

  const results = await Promise.all(
    books.map(async (book) => {
      const files = await getBookFiles(book.id);

      return {
        ...book,
        pdf: files.pdf
      };
    })
  );

  return results;
}