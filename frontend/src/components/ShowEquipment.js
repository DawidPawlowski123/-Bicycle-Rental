import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AuthService from "../services/auth.service";



export default function ShowEqupment() {

    const currentUser = AuthService.getCurrentUser();


    const [equipment, setEquipment] = useState(null);

    const [err, setError] = useState(false);

    useEffect(() => {
        fetchedEquipment();
    }, []);

    async function fetchedEquipment() {
        try {
            const response = await fetch(
                "http://localhost:8080/equipment",
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                }
            );
            let fetchedEquipment = await response.json();
            JSON.parse(JSON.stringify(fetchedEquipment))
            setEquipment(fetchedEquipment)
            // setLoading(false);
            console.log("elo" + equipment);
        } catch (err) {
            console.log(err);
            setError(err);
        }
    }


    async function postDeleteClient2(url) {
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${currentUser.accessToken} `,
                },
            });
            console.log(response);
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    const deleteClient = (id) => {
        postDeleteClient2(
            `http://localhost:8080/equipment/${id}`,
        );
    };

    return (
        <Container fluid>

            <Row className=" mt-5 ">
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Dodaj asortyment</Card.Title>
                            <Button href="/CreateEquipment" variant="primary">Wybierz</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="pt-5">
                <Col className="d-flex flex-wrap justify-content-between">
                    {equipment && equipment.map((equipment, index) => {
                        return (
                            <Card className="mb-4" style={{ width: '25rem' }}>
                                <Card.Body>
                                    <Card.Title>Sprzęt nr. {equipment.id}</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Nazwa: {equipment.name}</ListGroup.Item>
                                        <ListGroup.Item>Nr. seryjny: {equipment.serialNumber}</ListGroup.Item>
                                        <ListGroup.Item>Cena za godzine: {equipment.pricePerHour}</ListGroup.Item>
                                        <ListGroup.Item>Awaria: {equipment.failureInformation}</ListGroup.Item>
                                        <ListGroup.Item>Dostępność: {equipment.availabilityStatus}</ListGroup.Item>
                                    </ListGroup>
                                    <Col className="d-flex justify-content-around">
                                        <Button variant="primary"><Link style={{ color: "white", textDecoration: "none" }} to={`/EquipmentDetails?id=${equipment.id}`}>
                                            Edytuj
                                        </Link></Button>
                                        <Button value={equipment.id} style={{ color: "white" }} variant="danger"
                                            onClick={e => {
                                                console.log(e.target.value);
                                                swal({
                                                    title: "Jesteś pewien?",
                                                    text: "Potwierdzenie oznacza usunięcie klienta",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            deleteClient(e.target.value)
                                                            swal("Unit has been deleted", {
                                                                icon: "success",
                                                            }).then(function () {
                                                                window.location = "ShowEquipment";
                                                            });;;
                                                        }
                                                    });
                                            }}
                                        >
                                            Usuń
                                        </Button>
                                    </Col>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Col>
            </Row>

        </Container>
    );
};

