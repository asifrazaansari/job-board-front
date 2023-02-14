import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { emailRegex } from '../validators/Validation';


const JobForm = (props) => {

const {
    validated,
    handleSubmit,
    setTitle,
    title,
    description,
    setDescription,
    skills,
    setSkills,
    experience,
    setExperience,
    email,
    setEmail,
    text,
    variant

} = props


    return (
            <Form
                noValidate validated={validated}
                onSubmit={handleSubmit}
                style={{ width: "100%", maxWidth: "500px", margin: "0px 10px" }}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Title
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        type="text"
                        placeholder="Enter a name"
                        size="lg"
                    />
                    <Form.Control.Feedback type="invalid">
                        <h5>Please give a title!</h5>
                    </Form.Control.Feedback>
                    <Form.Control.Feedback><h5>Looks good!</h5></Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Description
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        type="text"
                        placeholder="Enter a description"
                        size="lg"
                    />
                    <Form.Control.Feedback type="invalid">
                        <h5>Please give a description!</h5>
                    </Form.Control.Feedback>
                    <Form.Control.Feedback><h5>Looks good!</h5></Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSkills">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Skills
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setSkills(e.target.value)}
                        value={skills}
                        required
                        type="text"
                        placeholder="Enter a skills"
                        size="lg"
                    />
                    <Form.Control.Feedback type="invalid">
                        <h5>Please give a skills!</h5>
                    </Form.Control.Feedback>
                    <Form.Control.Feedback><h5>Looks good!</h5></Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicExperience">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Experience
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setExperience(e.target.value)}
                        value={experience}
                        required
                        type="text"
                        placeholder="Enter a experience"
                        size="lg"
                    />
                    <Form.Control.Feedback type="invalid">
                        <h5>Please give a experience!</h5>
                    </Form.Control.Feedback>
                    <Form.Control.Feedback><h5>Looks good!</h5></Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label
                        style={{ fontSize: "25px" }}>
                        Email address
                    </Form.Label>
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        type="email"
                        placeholder="Enter email"
                        size="lg"
                        pattern={emailRegex.source}
                    />
                    <Form.Control.Feedback type="invalid">
                        <h5>Please enter a valid email address!</h5>
                    </Form.Control.Feedback>
                    <Form.Control.Feedback><h5>Looks good!</h5></Form.Control.Feedback>
                </Form.Group>

                <Button variant={variant} type="submit">
                    {text}
                </Button>
            </Form>
    )
}

export default JobForm
