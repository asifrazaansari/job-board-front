import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const emailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
const passRegex = RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)


const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name: name,
            email: email,
            password: password
        }

        try {
            const response = await axios.post("https://job-board.up.railway.app/users", userData)

            alert(`Successfully created account, ${response.data.data.name}, please Login to continue`)
            navigate("/users/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px", padding: "20px" }}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Name
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Enter a name"
                        size="lg"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Email address
                    </Form.Label>
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
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Password
                    </Form.Label>
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
                    Create account
                </Button> <br />
                <Form.Text className="text-muted">
                    Already have an account, please login!
                    <Button
                        href="/users/login"
                        variant="warning"
                        size="sm">
                        Login
                    </Button>
                </Form.Text>
            </Form>
        </div>
    )
}

export default Register
