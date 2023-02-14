import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardComp from '../../components/CardComp'

const Home = ({ search }) => {
    const [jobs, setJobs] = useState([])

    const getJobs = async () => {
        const response = await axios.get("https://job-board.up.railway.app/jobs", {
            params: {
                title: search
            }
        })
        setJobs(response.data.data)
    }

    useEffect(() => {
        getJobs()
    }, [search])

    return (
        <div className='container'>
            <h2>List of all Jobs</h2>
            {
                jobs && jobs.map((job) => {
                    return <CardComp key={job._id} link={`/jobs/${job._id}/apply`} text={"Apply"} job={job} />
                })
            }
        </div>
    )
}

export default Home
