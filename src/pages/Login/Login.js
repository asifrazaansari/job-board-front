import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const emailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
const passRegex = RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userdata, setUserdata] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                "https://job-board.up.railway.app/users/login",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setUserdata(response.data.data);
        } catch (error) {
            alert(error);
        }
    };

    const handleLogout = () => {
        Cookies.remove("token");
        localStorage.removeItem("userName");
        setIsLoggedIn(true);
        setUserdata(null);
        navigate("/");
    };

    useEffect(() => {
        if (userdata) {
            Cookies.set("token", userdata.token, { expires: 7 });
            localStorage.setItem("userName", userdata.userName);
            localStorage.setItem("userId", userdata.userId);
            navigate("/");
            window.location.reload();
        }
    }, [userdata, navigate]);

    return (
        <div className="d-flex justify-content-center mt-5">
            {isLoggedIn ? (
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            ) : (
                <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px", padding: "20px" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ fontSize: "25px" }}>Email address</Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter email"
                            size="lg"
                            pattern={emailRegex.source}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ fontSize: "25px" }}>Password</Form.Label>
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            size="lg"
                            pattern={passRegex.source}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                        Password must be present in between 8 to 15 mixed with upper, lower and symbol letter
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>{" "}
                    <br />
                    <Form.Text className="text-muted">
                        Don't have an account, please create it!
                        <Button href="/users" variant="warning" size="sm">
                            Register
                        </Button>
                    </Form.Text>
                </Form>
            )}
        </div>
    );
};

export default Login;
