import React, { useState } from "react";
import { Container, Button, Row, Form, FloatingLabel } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
    Name: yup.string().trim().required("Nazwa jest polem wymaganym"),
    SerialNumber: yup.string().required("Email jest polem wymaganym"),
    PricePerHour: yup.string()
    .required("Cena roweru za godzinę jest polem wymaganym")
    .matches(/^[0-9]+$/, "Musi zawierać tylko cyfry")
    .min(2, "Minimum 2 cyfr")
    .max(4, "Maksimum 4 cyfr"),
});


export default function AddNewBike() {

    const [loading, setLoading] = useState(true);
    const [fetchLoading, setFetchLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function postData(url, data) {
        setFetchLoading(true);
        let dataJson = JSON.stringify(data);
        try {
            const response = await axios.post(url, dataJson, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            console.log(response);
            if (response.status === 201) {
                swal({
                    text: "User Added Succesfully!",
                    icon: "success",
                }).then(function() {
                    window.location = "ShowEquipment";
                });;
                setLoading(false)
            }
        } catch (error) {
            if (error) {
                swal({ text: "Adding User Failed", icon: "warning" });
                console.log(error)
            }
        }
    }

    const onSubmit = (equipmentData) => {
        const {
            Name,
            SerialNumber,
            PricePerHour,
        } = equipmentData;
        postData("http://localhost:8080/equipment", {
            name: Name,
            serialNumber : SerialNumber,
            availabilityStatus: true,
            pricePerHour: PricePerHour,
            failureInformation: "Brak",
        });
        console.log(equipmentData);
    };
    return (
        <Container fluid>
            <Row className="d-flex align-items-center justify-content-start">
                <Form
                    className="d-flex flex-column"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.Group className="mb-3 mt-3" controlId="Name">
                        <FloatingLabel size="lg" label="Nazwa">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Nazwa"
                                {...register("Name")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.Name?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="SerialNumber">
                        <FloatingLabel size="lg" label="Numer seryjny">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Numer seryjny"
                                {...register("SerialNumber")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.SerialNumber?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="PricePerHour">
                        <FloatingLabel size="lg" label="Cena za godzinę">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Cena za godzinę"
                                {...register("PricePerHour")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.PricePerHour?.message}</p>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Zatwierdź
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

