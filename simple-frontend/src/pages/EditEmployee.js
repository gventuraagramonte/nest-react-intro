import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const name = useRef("")
    const role = useRef("")
    const experience = useRef("")
    const { id } = useParams("id")
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/employee/${id}`).then((response) => {
            let data = response.data
            name.current.value = data.name
            role.current.value = data.role
            experience.current.value = data.experience
        })
    })

    const updateEmployeeHandler = () => {
        var payload = {
            name: name.current.value,
            role: role.current.value,
            experience: experience.current.value,
        }
        axios.put(`http://localhost:4000/employee/${id}`, payload).then(() => {
            navigate('/')
        })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className='col-md-8 offset-md-2'>
                        <legend>Update Employee Details</legend>
                        <Form.Group className='mb-3' controlId='formName'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' ref={name} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formRole'>
                            <Form.Label>Job Role</Form.Label>
                            <Form.Control type='text' ref={role} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formExperience'>
                            <Form.Label>Experience</Form.Label>
                            <Form.Control type='text' ref={experience} />
                        </Form.Group>
                        <Button type='button' variant='primary' onClick={updateEmployeeHandler}>Edit</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EditEmployee