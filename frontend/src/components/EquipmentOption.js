import React, { useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";


export default function EquipmentOption() {
    return (
        <Container >
            <Row className=" mt-5 ">
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Dodaj asortyment</Card.Title>
                            <Button href="/CreateEquipment" variant="primary">Wybierz</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '20rem' }}>
                        <Card.Body>
                            <Card.Title>Wyświetl liste asortymentów</Card.Title>
                            <Button href="/ShowEquipment" variant="primary">Wybierz</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
