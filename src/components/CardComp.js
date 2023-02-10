import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComp({ link, text, job }) {
    return (
        <div className='container mb-2'>
            <Card>
                <Card.Header as="h5">{job.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p><b>Description</b>: {job.description}</p>
                        <p><b>Skills</b>: {job.skills}</p>
                        <p><b>Experience</b>: {job.experience}</p>
                        <p><b>Email: </b>{job.email}</p>
                    </Card.Text>
                    <Button
                        href={link}
                        variant="primary">
                        {text}
                    </Button>
                </Card.Body>
            </Card>
        </div>

    );
}

// {
//     "_id": "63bf8e15f23799e0a8249ade",
//     "title": "MYSQL Database",
//     "description": "Good in RDBMS",
//     "skills": "python, java, c, mysql, sql",
//     "experience": "1+ years experience with SQL",
//     "email": "ahmad@gmail.com",
//     "user": "63bf6c860109d402d55a5ec9",
//     "isDeleted": false,
//     "createdAt": "2023-01-12T04:35:33.535Z",
//     "updatedAt": "2023-01-12T04:35:33.535Z",
//     "__v": 0
// }

export default CardComp;