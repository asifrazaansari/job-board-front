import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComp({ link, text, job, onEdit, onDelete }) {
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
                        style={{ marginRight: '10px' }}
                        href={link}
                        variant="primary">
                        {text}
                    </Button>
                    {onEdit && <Button style={{ marginRight: '10px' }} variant='secondary' onClick={onEdit}>Edit</Button>}
                    {onDelete && <Button variant='danger' onClick={onDelete}>Delete</Button>}
                </Card.Body>
            </Card>
        </div>

    );
}


export default CardComp;