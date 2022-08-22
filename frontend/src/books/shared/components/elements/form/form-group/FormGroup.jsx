import React from "react";
import Form from "react-bootstrap/Form";
import "./FormGroup.scss";

const FormGroup = (props) => {
    return (
        <Form.Group className="mb-3 fg-xy">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control value={props.value} name={props.name} placeholder={props.placeholder} onChange={props.onChange} />
        </Form.Group>
    )
}

export default FormGroup;