'use client';

import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';



const PdfScreen = () => {
    const [Message, setMessage] = useState("");
    const [Books, setBooks] = useState([]);
    const [Loading, setLoading] = useState(false);

    //searching

    const searchGoogleBooks = async() => {
        try {

            const res = await fetch('/api/GoogleBooks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: Message }),
            });
            const data = await res.json();

            setBooks(prevBooks => [...prevBooks, ...data.books]);

            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    const searchInternetArchive = async() => {
        try {
            const res = await fetch('/api/InternetArchive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: Message }),
            });

            const data = await res.json();
            // console.log(data);
            setBooks(prevBooks => [...prevBooks, ...data.books]);
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false);
        }
    }

    const searchGutenberg = async() => {
         try {
            const res = await fetch('/api/Gutenberg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: Message }),
            });
            const data = await res.json();
            setBooks(data.books || []);
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    }

    const searchWeb = async()=>{
        try {
            const res = await fetch("/api/webSearch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: Message })
            });

            const data = await res.json();
            console.log(data);
            setBooks(prevBooks => [...prevBooks, ...data.results]);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    // handle submit 


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        //gutenberd

       await searchGutenberg();

        //google books

        await searchGoogleBooks();

        // internet archive  

        await searchInternetArchive();

        // websearch 
        await searchWeb();
        

    };




    return (
        <div className="min-h-screen bg-gray-50 flex flex-col w-full">

            {/* Header / Search Area */}
            <div className="sticky top-0 z-10 bg-white shadow-sm p-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <AutoStoriesIcon className="text-blue-600" /> Book Finder
                    </h1>
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search by title or author (e.g., 'Sherlock Holmes')"
                            className="w-full p-4 pr-16 rounded-xl border border-gray-200 bg-gray-50 fo // Added for a better empty statecus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all shadow-inner"
                            value={Message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400"
                            disabled={Loading}
                        >
                            {Loading ? <span className="animate-pulse">...</span> : <SendIcon />}
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto w-full p-6 overflow-auto">
                {Books.length === 0 && !Loading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <AutoStoriesIcon sx={{ fontSize: 60 }} />
                        <p className="mt-2 text-lg font-medium">Search for a book to see results</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Books.map((book, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                                {/* Cover Image Container */}
                                <div className="h-64 overflow-hidden bg-gray-200">
                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <h2 className="font-bold text-gray-900 line-clamp-2 mb-1 h-12 leading-tight">
                                        {book.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-4 italic">
                                        {book.author}
                                    </p>

                                    {/* Action Links */}
                                    <div className="grid grid-cols-2 gap-2 mt-auto">
                                        {
                                            book.pdf && (
                                                <a href={book.pdf} target="_blank" rel="noreferrer" className="flex justify-center py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">
                                                    PDF
                                                </a>
                                            )
                                        }
                                        {
                                            book.epub && (
                                                <a href={book.epub} target="_blank" rel="noreferrer" className="flex justify-center py-2 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
                                                    EPUB
                                                </a>
                                            )
                                        }
                                        {
                                            book.read && (
                                                <a href={book.read} target="_blank" rel="noreferrer" className="flex justify-center py-2 px-3 bg-green-50 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors">
                                                    READ
                                                </a>
                                            )
                                        }
                                        {
                                            book.bookPage && (
                                                <a href={book.bookPage} target="_blank" rel="noreferrer" className="flex justify-center py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                                                    DETAILS
                                                </a>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default PdfScreen;