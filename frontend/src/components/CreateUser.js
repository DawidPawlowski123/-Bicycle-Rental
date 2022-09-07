import React, { useState } from "react";
import { Container, Button, Row, Form, FloatingLabel } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
    Name: yup.string().trim().required("Imię jest polem wymaganym"),
    Email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email jest polem wymaganym"),
    Lastname: yup.string().trim().required("Nazwisko jest polem wymaganym"),
    Phonenumber: yup.string()
    .required("Numer telefonu jest polem wymaganym")
    .matches(/^[0-9]+$/, "Musi zawierać tylko cyfry")
    .min(9, "Minimum 9 cyfr")
    .max(10, "Maksimum 10 cyfr"),
    Iddocument: yup.string().trim().required("Id dokumentu jest polem wymaganym"),
});


export default function AddNewUser() {



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
                    window.location = "ShowUser";
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

    const onSubmit = (clientData) => {
        const {
            Email,
            Name,
            Lastname,
            Phonenumber,
            Iddocument,
        } = clientData;
        postData("http://localhost:8080/clients", {
            name: Name,
            lastname : Lastname,
            phoneNumber: Phonenumber,
            idDocument: Iddocument,
            email: Email,
        });
        console.log(postData);
    };
    return (
        <Container fluid>
            <Row className="d-flex align-items-center justify-content-start">
                <Form
                    className="d-flex flex-column"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.Group className="mb-3 mt-3" controlId="Name">
                        <FloatingLabel size="lg" label="Imię">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Imię"
                                {...register("Name")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.Name?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="Lastname">
                        <FloatingLabel size="lg" label="Nazwisko">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Nazwisko"
                                {...register("Lastname")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.Lastname?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="Phonenumber">
                        <FloatingLabel size="lg" label="Numer telefonu">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Nazwisko"
                                {...register("Phonenumber")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.Phonenumber?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="Iddocument">
                        <FloatingLabel size="lg" label="Id dokumentu">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Id dokumentu"
                                {...register("Iddocument")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.Iddocument?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Email">
                        <FloatingLabel size="lg" label="Email">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                className="formInput border-1"
                                {...register("Email")}
                            />
                        </FloatingLabel>
                        <p className="custom_error">{errors.Email?.message}</p>

                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Zatwierdź
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

