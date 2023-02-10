import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import CardComp from '../../components/CardComp'
import axios from 'axios';

const Job = () => {
    const [jobs, setJobs] = useState([])

    const getJobs = async () => {
        const response = await axios.get("https://job-board.up.railway.app/jobs")
        setJobs(response.data.data)
    }

    useEffect(() => {
        getJobs()
    }, [])

    return (
        <div className='container mt-3'>
            <Button className="float-sm-end" variant="warning" href="/jobs/create">Create New Job</Button>
            <h2>List of all Created Job</h2>
            {
                jobs && jobs.map((job) => {
                    return <CardComp key={job._id} link={`/jobs/${job._id}/applications`} text={"Applicant"} job={job} />
                })
            }
        </div>
    )
}

export default Job
