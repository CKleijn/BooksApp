import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import FormGroup from "../shared/components/elements/form/form-group/FormGroup";

const BookEditForm = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/book/${id}`, {
                    method: "GET"
                });
                const json = await response.json();
                setBook(json.result[0]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    }

    const editBook = (event) => {
        event.preventDefault();
        fetch(`/book/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
    }

    return (
        <>
            <Container>
                <Row>
                    <Link className="mt-3" to="/"><Button>Terug</Button></Link>
                </Row>
                <Row>
                    <Form className="mt-3" onSubmit={editBook}>
                        <FormGroup 
                            label="Title"
                            value={book.title}
                            name="title"
                            placeholder="Enter title"
                            onChange={handleChange}
                        />
                        <FormGroup 
                            label="Description"
                            value={book.description}
                            name="description"
                            placeholder="Enter description"
                            onChange={handleChange}
                        />
                        <FormGroup 
                            label="Author"
                            value={book.author}
                            name="author"
                            placeholder="Enter author"
                            onChange={handleChange}
                        />
                        <Button variant="primary" type="submit">Bewerken</Button>
                    </Form>
                </Row>
            </Container>
        </>
    );
}

export default BookEditForm;