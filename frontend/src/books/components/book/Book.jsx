import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "../../shared/components/elements/button/Button";
import "./Book.scss";

const Book = (props, { bookKey }) => {
    const deleteBook = () => {
        try {
            fetch(`/book/${props.book.id}`, {
                method: "DELETE"
            });
            props.setBooks((prevBooks) => {
                const newBooks = {
                    ...prevBooks
                }
                delete newBooks[bookKey];
                return newBooks;
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Card.Body>
                <Card.Title className="title">{props.book.title}</Card.Title>
                <Card.Subtitle className="subtitle">{props.book.author}</Card.Subtitle>
                <Card.Text className="text mt-3">{props.book.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link to={`/editBook/${props.book.id}`}><Button title="Bewerken"/></Link>
                <Button onClick={deleteBook} title="Verwijderen"/>
            </Card.Footer>    
        </>
    )
}

export default Book;