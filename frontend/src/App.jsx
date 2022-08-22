import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./books/pages/BooksOverview";
import BookCreateForm from "./books/pages/BookCreateForm";
import BookEditForm from "./books/pages/BookEditForm";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/createBook" element={<BookCreateForm />} />
                <Route path="/editBook/:id" element={<BookEditForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;