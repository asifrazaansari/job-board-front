import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import CardComp from '../../components/CardComp'

const Home = ({ search }) => {
    const [jobs, setJobs] = useState([])

    const getJobs = useCallback(async () => {

        try {
            const response = await axios.get("https://job-board.up.railway.app/jobs", {
                params: {
                    title: search
                }
            })
            setJobs(response.data.data)
        } catch (error) {
            //console.log(error)
            setJobs([])
        }

    }, [search])

    useEffect(() => {
        getJobs()
    }, [search, getJobs])

    return (
        <div className='container'>
            <h2>List of all Jobs</h2>
            {
                jobs.length ? (
                    jobs && jobs.map((job) => {
                        return <CardComp key={job._id} link={`/jobs/${job._id}/apply`} text={"Apply"} job={job} />
                    })
                ) : (
                    <p>No jobs found</p>
                )
                
            }
        </div>
    )
}

export default Home
