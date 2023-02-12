import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import CardComp from '../../components/CardComp'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Job = () => {
    const [jobs, setJobs] = useState([])
    const [token, setToken] = useState("")

    const userId = localStorage.getItem("userId")
    const userName = localStorage.getItem("userName")
    const navigate = useNavigate()

    const getJobs = async () => {
        const response = await axios.get("https://job-board.up.railway.app/jobs")
        setJobs(response.data.data)
    }

    useEffect(() => {
        const token = Cookies.get('token')
        setToken(token)
        if (!token) {
            alert("please login")
            navigate('/users/login')
        }
    }, [navigate])

    const handleDelete = async (jobId) => {
        await axios.delete(`https://job-board.up.railway.app/jobs/${jobId}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        alert("Job deleted successfully")
        getJobs()     
    }


    useEffect(() => {
        getJobs()
    }, [])

    return (
        <div className='container mt-3'>
            <Button className="float-sm-end" variant="warning" href="/jobs/create">Create New Job</Button>
            <h2>List of created job by {userName}</h2>
            {
                jobs && jobs.map((job) => {
                    if (userId === job.user) {
                        return <CardComp
                            key={job._id}
                            link={`/jobs/${job._id}/applications`}
                            text={"Applicant"}
                            job={job}
                            onEdit={() => navigate(`/jobs/${job._id}`)}
                            onDelete={() => handleDelete(job._id)}
                        />
                    }
                    return ""
                })
            }
        </div>
    )
}

export default Job
