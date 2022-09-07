import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";


export default function ClientOption() {
    return (
        <Container >
            <Row className=" mt-5 ">
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Dodaj użytkownika</Card.Title>
                            <Button href="/CreateUser" variant="primary">Wybierz</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '20rem' }}>
                        <Card.Body>
                            <Card.Title>Wyświetl liste użytkowników</Card.Title>
                            <Button href="/ShowUser" variant="primary">Wybierz</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
