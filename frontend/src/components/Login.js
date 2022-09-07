import React, { useState, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    props.history.push("/profile");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="d-flex align-items-center justify-content-center">
                <Col className="custom_login_wrapper" xs={12} sm={6} lg={4}>
                    <Form onSubmit={handleLogin} ref={form}>
                        <Row className="d-flex align-items-center justify-content-center">
                            <Col>
                                <Row className="mb-3" controlId="formBasicEmail">
                                    <label>Nazwa użytkownika:</label>
                                    <Col>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={username}
                                            onChange={onChangeUsername}
                                            validations={[required]} />
                                    </Col>
                                </Row>
                                <Row className="mb-3" controlId="formBasicPassword">
                                    <label>Hasło:</label>
                                    <Col>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={password}
                                            onChange={onChangePassword}
                                            validations={[required]}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="d-flex align-items-center justify-content-center mb-5">
                            <Col xs={5}>
                                <Button
                                    disabled={loading}
                                    className="basic w-100"
                                    variant="primary"
                                    type="submit"
                                >
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    Zaloguj
                                </Button>
                            </Col>
                            {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                        </Row>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;