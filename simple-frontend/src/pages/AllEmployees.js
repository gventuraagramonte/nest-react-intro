import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";

const AllEmployees = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [itemIdToDelete, setItemIdToDelete] = useState(0)

    useEffect(() => {
        Axios.get('http://localhost:4000/employee').then((response) => {
            setEmployees(response.data)
        })
    }, [])

    const openDeleteModalHandler = (id) => {
        setItemIdToDelete(id)
        setShowModal(true)
    }

    const closeDeleteModalHandler = () => {
        setItemIdToDelete(0)
        setShowModal(false)
    }

    const confirmDeleteHandler = () => {
        axios.delete(`http://localhost:4000/employee/${itemIdToDelete}`)
            .then(() => {
                setEmployees((existingData) => {
                    return existingData.filter((_) => _._id !== itemIdToDelete)
                })
                setItemIdToDelete(0)
                setShowModal(false)
            })
    }

    return (
        <>
            <DeleteConfirmation title="Delete Confirmation!" body="Are sure to delete this item" showModal={showModal} closeDeleteModalHandler={closeDeleteModalHandler} confirmDeleteHandler={confirmDeleteHandler}></DeleteConfirmation>
            <Container className="mt-2">
                <Row>
                    <Col className="col-md-4 offset-md-4">
                        <Button variant="primary" type="button" onClick={() => navigate('/add-employee')}>
                            Add
                        </Button>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job Role</th>
                            <th>Experience</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp._id}>
                                <td>{emp.name}</td>
                                <td>{emp.role}</td>
                                <td>{emp.experience}</td>
                                <td>
                                    <Button variant="primary" type="button" onClick={() => {
                                        navigate(`/edit-employee/${emp._id}`)
                                    }}>Edit</Button>
                                    |
                                    <Button variant="danger" type="button" onClick={() => {
                                        openDeleteModalHandler(emp._id)
                                    }}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default AllEmployees