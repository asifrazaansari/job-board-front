import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "js-cookie";

function NavScroll() {
  
  const userName = localStorage.getItem("userName") || ""

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId")
    Cookies.remove("token")
    window.location.reload();
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Job Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/jobs">Hire</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ width: '70%' }}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className="me-right my- my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {
              userName === ""
                ? <Nav.Link href="/users/login" style={{ color: 'green' }}>Login</Nav.Link>
                : <>
                  <Navbar.Text>
                    Signed in as: <a href="/">{userName}</a>
                  </Navbar.Text>
                  <Nav.Link href="/" onClick={handleLogout} style={{ color: 'red' }}>Logout</Nav.Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
