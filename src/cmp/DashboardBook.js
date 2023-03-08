import Book from './Book';
import './Dashboard.css'
import { obj } from './config'

import { useState, useEffect } from 'react';
import axios from "axios";
import './Dashboard.css'
import Wrapper from './Wrapper';

export default function DashboardBook() {

    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('defaultBook') || "Ctet");
    const [books, setBooks] = useState({ items: [] });
    console.log(obj.domain, 'sss')

    if (!localStorage.getItem('email')) {
        console.log(localStorage.getItem('email'))
        window.location.href = obj.domain;

    }
    console.log(localStorage.getItem('email'))
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;
    const onInputChange = e => {
        setSearchTerm(e.target.value);
    };
    const onSubmitHandler = e => {
        e.preventDefault();
        console.log(searchTerm)
        fetchBooks();
    };
    const fetchBooks = async () => {
        const result = await axios.get(`${API_URL}?q=${searchTerm}`);
        setBooks(result.data);
    };
    useEffect(() => {
        fetchBooks()
    }, [])
    return (
        <Wrapper self="start center">
            <form onSubmit={onSubmitHandler} className="d-flex" style={{ width: "80%", marginTop: "25px", marginBottom: "50px" }}>

                <div style={{ width: "100%", display: "flex" }}>
                    <input
                        className="form-control me-2"
                        type="search"
                        onChange={onInputChange}
                        placeholder={searchTerm}
                        aria-label="Search"
                        autoComplete="off"
                    />
                    <button className="btn btn-outline-success"
                        id="btnsearch" type="submit" style={{
                            color: "#2e0006",
                            border: "1px solid #38b6ff",
                        }}
                    >
                        Search

                    </button>
                </div>
            </form >
            <div >

                {
                    books.items && books.items.map((book, index) => {
                        return <Book index={index} alt={`${book.volumeInfo.title} book`} title={book.volumeInfo.title} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                            publishDate={book.volumeInfo.publishedDate}
                            author={book.volumeInfo.authors}
                        />
                    })
                }
            </div>
        </Wrapper >
    );
}