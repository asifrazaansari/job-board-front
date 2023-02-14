import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import JobForm from '../../components/JobForm';


const CreateJob = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState("")
    const [experience, setExperience] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('token')
        setToken(token)
        if (!token) {
            alert("please login")
            navigate('/users/login')
        }
    }, [navigate])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            setValidated(true);
            return;
        }

        const jobData = { title, description, skills, experience, email }

        try {
            await axios.post("https://job-board.up.railway.app/jobs", jobData, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            alert("Job created successfully")
            navigate('/jobs')
        } catch (error) {
            console.log(error)
        }


    }


    return (
        <div className="d-flex justify-content-center mt-5">
            <JobForm
                handleSubmit={handleFormSubmit}
                validated={validated}
                setTitle={setTitle}
                title={title}
                setDescription={setDescription}
                description={description}
                setSkills={setSkills}
                skills={skills}
                setExperience={setExperience}
                experience={experience}
                setEmail={setEmail}
                email={email}
                text={"Create Job"}
                variant={"info"}
            />
        </div>
    )
}

export default CreateJob
