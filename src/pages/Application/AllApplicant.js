import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';

const AllApplicant = () => {

    const [applicants, setApplicants] = useState([])
    const [token, setToken] = useState("")

    const { jobId } = useParams()

    useEffect(() => {
        const token = Cookies.get('token')
        setToken(token)
        if (!token) {
            console.log("please login")
        }
    }, [])

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                const response = await axios.get(`https://job-board.up.railway.app/jobs/${jobId}/applications`, {
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                })
                setApplicants(response.data.data)
            }
            fetchData()
        }

    }, [token, jobId])


    return (
        <div>
            <h1>List of all applicant</h1>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Resume</th>
                        <th>CoverLetter</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{applicant.fname}</td>
                            <td>{applicant.lname}</td>
                            <td>{applicant.email}</td>
                            <td>
                                <a href={applicant.resume} download>
                                    <Button variant='danger'>Download</Button>
                                </a>
                            </td>
                            <td>
                                <a href={applicant.coverLetter} download>
                                    <Button variant='danger'>Download</Button>
                                </a>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default AllApplicant
