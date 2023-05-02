import React from "react";
import axios from "axios";
import { useRef } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const name = useRef("");
    const role = useRef("");
    const experience = useRef("");
    const navigate = useNavigate();

    const addEmployeeHandler = () => {
        var payload = {
            name: name.current.value,
            role: role.current.value,
            experience: experience.current.value,
        };
        axios.post("http://localhost:4000/employee", payload).then(() => {
            navigate("/");
        });
    };

    return (
        <>
            <Container className="mt-2">
                <Row>
                    <Col className="col-md-8 offset-md-2">
                        <legend>Add New Emplyee Details</legend>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formRole">
                            <Form.Label>Job Role</Form.Label>
                            <Form.Control type="text" ref={role} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formExperience">
                            <Form.Label>Experience</Form.Label>
                            <Form.Control type="text" ref={experience} />
                        </Form.Group>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={addEmployeeHandler}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default AddEmployee;