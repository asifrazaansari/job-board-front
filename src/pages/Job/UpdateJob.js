import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import JobForm from '../../components/JobForm';

const UpdateJob = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState("")
    const [experience, setExperience] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate()
    const { jobId } = useParams()

    useEffect(() => {
        const token = Cookies.get('token')
        setToken(token)
        if (!token) {
            alert("please login")
            navigate('/users/login')
        }
    }, [navigate])

    useEffect(() => {
        const fetchJobData = async () => {
            if (token) {
                const response = await axios.get(`https://job-board.up.railway.app/jobs/${jobId}`, {
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                });
                setTitle(response.data.data.title);
                setDescription(response.data.data.description);
                setSkills(response.data.data.skills);
                setExperience(response.data.data.experience);
                setEmail(response.data.data.email);
            }
        };
        fetchJobData();
    }, [jobId, token]);


    const handleUpdate = async (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            setValidated(true);
            return;
        }

        const jobData = { title, description, skills, experience, email }
        try {
            await axios.put(`https://job-board.up.railway.app/jobs/${jobId}`, jobData, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            alert("Job updated successfully")
            navigate('/jobs')
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="d-flex justify-content-center mt-5">
            <JobForm
                handleSubmit={handleUpdate}
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
                text={"Update Job"}
                variant={"warning"} 
            />
        </div>
    )
}

export default UpdateJob
