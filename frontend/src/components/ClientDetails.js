import React, { useState, useEffect } from "react";
import { Container, Button, Row, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
    name: yup.string().trim().required("Imię jest polem wymaganym"),
    email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email jest polem wymaganym"),
    lastname: yup.string().trim().required("Nazwisko jest polem wymaganym"),
    phoneNumber: yup.string()
        .required("Numer telefonu jest polem wymaganym")
        .matches(/^[0-9]+$/, "Musi zawierać tylko cyfry")
        .min(9, "Minimum 9 cyfr")
        .max(10, "Maksimum 10 cyfr"),
    idDocument: yup.string().trim().required("Id dokumentu jest polem wymaganym"),
});

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ShowUser() {

    let query = useQuery();

    const history = useHistory();
    useEffect(() => {
        if (query.get("id") === null) {
            history.goBack();
        }
    }, [])

    const [users, setUsers] = useState(null);
    const [err, setError] = useState(false);

    useEffect(() => {
        fetchedUsers();
    }, []);

    async function fetchedUsers() {
        try {
            const response = await fetch(
                `http://localhost:8080/clients/${query.get("id")}`,
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
        } catch (error) {
            setError(error);
            console.log(err);
        }
    }


    ////////////////////

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function postData(url, data) {
        let dataJson = JSON.stringify(data);
        try {
            const response = await axios.put(url, dataJson, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            console.log(response);
            if (response.status === 200) {
                swal({
                    text: "Pomyślnie zmieniono dane użytkownika!",
                    icon: "success",
                }).then(function () {
                    window.location = "ShowUser";
                });;
            }
        } catch (error) {
            if (error) {
                swal({ text: "Niepowodzenie", icon: "warning" });
                console.log(error)
            }
        }
    }

    const onSubmit = (clientData) => {
        const {
            email,
            name,
            lastname,
            phoneNumber,
            idDocument,
        } = clientData;
        postData(`http://localhost:8080/clients/${query.get("id")}`, {
            id: query.get("id"),
            name: name,
            lastname: lastname,
            phoneNumber: phoneNumber,
            idDocument: idDocument,
            email: email,
        });
        console.log(postData);
    };

    useEffect(() => {
        setName(users && users.name)
    }, [users]);

    const [name, setName] = useState(""); // useState hook

    // handle change event
    const handleChange = (e) => {
      e.preventDefault(); // prevent the default action
      setName(e.target.value); // set name to e.target.value (event)
    };

    return (
        <Container fluid>
            <Row className="d-flex align-items-center justify-content-start">
                <Form
                    className="d-flex flex-column"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.Group className="mb-3 mt-3" controlId="name">
                        <FloatingLabel size="lg" label="Imię">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Imię"
                                defaultValue={users && users.name}
                                onChange={handleChange}
                                {...register("name")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.name?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="Lastname">
                        <FloatingLabel size="lg" label="Nazwisko">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Nazwisko"
                                defaultValue={users && users.lastname}
                                {...register("lastname")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.lastname?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="Phonenumber">
                        <FloatingLabel size="lg" label="Numer telefonu">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Numer telefonu"
                                defaultValue={users && users.phoneNumber}
                                {...register("phoneNumber")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.phoneNumber?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="IdDocument">
                        <FloatingLabel size="lg" label="Id dokumentu">
                            <Form.Control
                                size="lg"
                                className="formInput border-1"
                                type="text"
                                placeholder="Id dokumentu"
                                defaultValue={users && users.idDocument}
                                {...register("idDocument")} />
                        </FloatingLabel>
                        <p className="custom_error">{errors.idDocument?.message}</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Email">
                    <Form.Label></Form.Label>
                        <FloatingLabel size="lg" label="Email">
                            <Form.Control
                                type="email"
                                placeholder="email"
                                className="formInput border-1"
                                defaultValue={users && users.email}
                                {...register("email")}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </FloatingLabel>
                        <p className="custom_error">{errors.email?.message}</p>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Zmień
                    </Button>
                </Form>
            </Row>

        </Container>
    );
};

