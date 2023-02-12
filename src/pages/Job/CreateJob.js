import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState("")
    const [experience, setExperience] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")

    const navigate = useNavigate()

    const jobData = {
        title: title,
        description: description,
        skills: skills,
        experience: experience,
        email: email
    }

    useEffect(() => {
        const token = Cookies.get('token')
        setToken(token)
        if (!token) {
            alert("please login")
            navigate('/users/login')
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("https://job-board.up.railway.app/jobs", jobData, {
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        alert("Job created successfully")
        navigate('/jobs')
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <Form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px", padding: "10px" }}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Title
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        placeholder="Enter a name"
                        size="lg"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Description
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        type="text"
                        placeholder="Enter a description"
                        size="lg"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSkills">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Skills
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setSkills(e.target.value)}
                        value={skills}
                        type="text"
                        placeholder="Enter a skills"
                        size="lg"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicExperience">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Experience
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setExperience(e.target.value)}
                        value={experience}
                        type="text"
                        placeholder="Enter a experience"
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

                <Button variant="info" type="submit">
                    Create Job
                </Button>
            </Form>
        </div>
    )
}

export default CreateJob
