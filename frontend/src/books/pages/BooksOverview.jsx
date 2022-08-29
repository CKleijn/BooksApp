import React, {useState, useEffect} from "react";
import Book from "../components/book/Book";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "../shared/components/elements/button/Button";
import "../../style.scss";

const BooksOverview = () => {
    const [books, setBooks] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/book", {
                    method: "GET"
                });
                const json = await response.json();
                setBooks({
                    "allBooks": json.result
                });
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [books]);

    return (
        <>
            <Container>
                <Row>
                    <Link to="/createBook"><Button title="Aanmaken"/></Link>
                </Row>
                <Row>
                    {books.allBooks?.map((book) =>
                        <Col lg="4" className="mt-2 mb-2">
                            <Card className="card-xy">
                                <Book 
                                    key={book.id}
                                    book={book}
                                    setBooks={setBooks}
                                />
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}

export default BooksOverview;