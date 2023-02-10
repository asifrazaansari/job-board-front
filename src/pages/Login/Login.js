import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userdata, setUserdata] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post("https://job-board.up.railway.app/users/login", userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data.data)
            setUserdata(response.data.data)
            console.log(userdata, userdata.token, userdata.userName)
            Cookies.set('token', userdata.token, { expires: 7 });
            localStorage.setItem('userName', userdata.userName)

            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = () => {
        Cookies.remove("token")
        localStorage.removeItem("userName")
        setIsLoggedIn(true)
        navigate("/")
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            {
                isLoggedIn ? (
                    <Button variant='danger' onClick={handleLogout} >
                        Logout
                    </Button>
                ) : (
                    <Form onSubmit={handleSubmit} style={{ width: "30%" }}>
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
                            Login
                        </Button> <br />
                        <Form.Text className="text-muted">
                            Don't have an account, please create it!
                            <Button
                                href="/users"
                                variant="warning"
                                size="sm">
                                Register
                            </Button>
                        </Form.Text>
                    </Form>
                )
            }
        </div>
    )
}

export default Login
