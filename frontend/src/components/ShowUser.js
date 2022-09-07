import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ShowUser() {



    const [users, setUsers] = useState(null);

    const [err, setError] = useState(false);

    useEffect(() => {
        fetchedUsers();
    }, []);

    async function fetchedUsers() {
        try {
            const response = await fetch(
                "http://localhost:8080/clients",
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                }
            );
            let fetchedUsers = await response.json();
            JSON.parse(JSON.stringify(fetchedUsers))
            setUsers(fetchedUsers)
            // setLoading(false);
            console.log("elo" + users);
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
                    'Content-Type': 'application/json'
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
            `http://localhost:8080/clients/${id}`,
        );
    };

  

    let query = useQuery();

    return (
        <Container fluid>
            <Row className=" mt-5 ">
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Dodaj użytkownika</Card.Title>
                            <Button href="/CreateUser" variant="primary">Wybierz</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="pt-5">
                <Col className="d-flex flex-wrap justify-content-between">
                    {users && users.map((user, index) => {
                        return (
                            <Card className="mb-4" style={{ width: '25rem' }}>
                                <Card.Body>
                                    <Card.Title>Użytkownik nr. {user.id}</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Imię: {user.name}</ListGroup.Item>
                                        <ListGroup.Item>Nazwisko: {user.lastname}</ListGroup.Item>
                                        <ListGroup.Item>Id dokumentu: {user.idDocument}</ListGroup.Item>
                                        <ListGroup.Item>Nr telefonu: {user.phoneNumber}</ListGroup.Item>
                                        <ListGroup.Item>Emial: {user.email}</ListGroup.Item>
                                    </ListGroup>
                                    <Col className="d-flex justify-content-around">
                                        <Button variant="primary"><Link style={{ color: "white", textDecoration: "none" }} to={`/ClientDetails?id=${user.id}`}>
                                            Edytuj
                                        </Link></Button>
                                        <Button value={user.id} style={{ color: "white" }} variant="danger"
                                            onClick={ e => {
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
                                                                window.location = "ShowUser";
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

