import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import FormGroup from "../shared/components/elements/form/form-group/FormGroup";

const BookCreateForm = () => {
    const [book, setBook] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    }

    const createNewBook = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book)
            });
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Link className="mt-3" to="/"><Button>Terug</Button></Link>
                </Row>
                <Row>
                    <Form className="mt-3" onSubmit={createNewBook}>
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
                        <Button variant="primary" type="submit">Aanmaken</Button>
                    </Form>
                </Row>
            </Container>
        </>
    );
}

export default BookCreateForm;