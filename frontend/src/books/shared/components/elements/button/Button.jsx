import React from "react";
import RB_Button from "react-bootstrap/Button";
import "./Button.scss";

const Button = (props) => {
    return (
        <RB_Button className={"button " + (props.title === "Verwijderen" && "btn-danger ") + (props.title === "Aanmaken" && " btn-success")} onClick={props.onClick}>{props.title}</RB_Button>
    )
}

export default Button;