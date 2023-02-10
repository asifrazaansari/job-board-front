import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

function Application() {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [resume, setResume] = useState(null)
    const [coverLetter, setCoverLetter] = useState(null)

    const [token, setToken] = useState("")
    
    const {jobId} = useParams()
    console.log(jobId)

    useEffect(() => {
        const token = Cookies.get('token')
        setToken(token)
        if (!token) {
            console.log("please login")
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('email', email);
        formData.append('resume', resume);
        formData.append('coverLetter', coverLetter);


        try {
            const response = await axios.post(`https://job-board.up.railway.app/jobs/${jobId}/apply`, formData, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response)
            alert("Application submitted successfully!")
        } catch (error) {
            console.log(error)
        }
    }

    console.log(fname, lname, email, resume)
    return (
        <div className="d-flex justify-content-center mt-5">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setFname(e.target.value)}
                            value={fname}
                            type="text"
                            placeholder="Enter first name"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setLname(e.target.value)}
                            value={lname}
                            type="text"
                            placeholder="Enter last name"
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formFile">
                        <Form.Label>Resume</Form.Label>
                        <Form.Control
                            onChange={(e) => setResume(e.target.files[0])}
                            type="file"
                            accept="application/pdf"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formFile">
                        <Form.Label>Cover Letter</Form.Label>
                        <Form.Control
                            onChange={(e) => setCoverLetter(e.target.files[1])}
                            type="file"
                            accept=".md"
                        />
                    </Form.Group>
                </Row>
                <Button variant="success" type="submit">
                    Apply
                </Button>
            </Form>
        </div>

    );
}

export default Application;