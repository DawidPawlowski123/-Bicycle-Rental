import React, { useState, useEffect } from "react";
import { Container, Button, Row, Form, FloatingLabel } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, Link } from "react-router-dom";
import AuthService from "../services/auth.service";



const schema = yup.object().shape({
    Name: yup.string().trim().required("Nazwa jest polem wymaganym"),
    SerialNumber: yup.string().required("Email jest polem wymaganym"),
    PricePerHour: yup.string()
    .required("Cena roweru za godzinę jest polem wymaganym")
    .matches(/^[0-9]+$/, "Musi zawierać tylko cyfry")
    .min(2, "Minimum 2 cyfr")
    .max(4, "Maksimum 4 cyfr"),
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function EquipmentDetails() {

    const currentUser = AuthService.getCurrentUser();

    let query = useQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [equipments, setEquipments] = useState(null);
    const [err, setError] = useState(false);

    useEffect(() => {
        fetchedEquimpents();
    }, []);

    async function fetchedEquimpents() {
        try {
            const response = await fetch(
                `http://localhost:8080/equipment/${query.get("id")}`,
                {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                        'Authorization' : `Bearer ${currentUser.accessToken} `,
                    },
                    redirect: "follow",
                }
            );
            let fetchedEquimpents = await response.json();
            JSON.parse(JSON.stringify(fetchedEquimpents))
            setEquipments(fetchedEquimpents)
            // setLoading(false);
            console.log("elo" + equipments);
        } catch (error) {
            setError(error);
            console.log(err);
        }
    }

    async function postData(url, data) {
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
        postData(`http://localhost:8080/equipment/${query.get("id")}`, {
            id: query.get("id"),
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
                                defaultValue={equipments && equipments.name}
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
                                defaultValue={equipments && equipments.serialNumber}
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
                                defaultValue={equipments && equipments.pricePerHour}
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

