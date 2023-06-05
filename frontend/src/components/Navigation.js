import React, {useContext, useEffect, useState} from 'react'
import {Navbar, Nav, Container, Row, NavDropdown, Offcanvas, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";


const Navigation = () => {
    const {user,logout} = useContext(AuthContext)


    const [activeKey, setActiveKey] = useState(null)

    const handleNavSelect = (selectedKey) => {
        setActiveKey(selectedKey);
    };
    useEffect(() => {
        setActiveKey(null);
    }, [user]);


    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Link to="/" className="navbar-brand" onClick={() => setActiveKey(null)}>Home</Link>

                <Nav className="me-auto" activeKey={activeKey} onSelect={handleNavSelect}>
                    {user==null?
                        <>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/login" eventKey="login">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/signup" eventKey="signup">SignUp</Nav.Link>
                        </Nav.Item>
                        </>:
                        <>
                            <Nav.Item> <Nav.Link as={Link} to={`/${user.username}/profile`} eventKey="profile">Profile</Nav.Link></Nav.Item>
                        </>}
                </Nav>
                {user &&
                <Button className='btn-secondary' onClick={logout}>Logout</Button>}
            </Container>
        </Navbar>
    );

}

export default Navigation
