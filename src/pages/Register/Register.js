import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
           const response =  await axios.post("https://job-board.up.railway.app/users", userData)

           alert(`Successfully created account, ${response.data.data.name}, please Login to continue`)
           navigate("/users/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <Form onSubmit={handleSubmit} style={{ width: "30%" }}>
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
                    />
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
