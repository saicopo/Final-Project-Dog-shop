import React, { useState, useEffect } from "react";
import * as jwtDecode from 'jwt-decode';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";
import { ReactComponent as Logo } from "./nav-logo.svg";
import AccessPopup from "../authComponent/AccessPoupUP";
import RegistrationPopup from "../authComponent/RegistrationPopup";
import "./Navbar.css";

const NavBar = () => {
    const [showAccessPopup, setShowAccessPopup] = useState(false);
    const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const imgToken = jwtDecode.jwtDecode(token);
                setUserImage(imgToken.profileImage);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Token non valido:", error);
                localStorage.removeItem('token'); 
                setIsLoggedIn(false);
                setUserImage(null);
            }
        } else {
            setIsLoggedIn(false);
            setUserImage(null);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem("token", token);
        try {
            const imgToken = jwtDecode.jwtDecode(token);
            setUserImage(imgToken.profileImage);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Token non valido:", error);
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUserImage(null);
        }

        console.log("Utente loggato con token:", token);
    };

    return (
        <Navbar expand="lg" className="navbar bg-body-tertiary">
            <Container fluid>
                <Link to="/" className="navbar-brand">
                    <Logo />
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                        <Nav.Link href="/seller" className="fw-bold fs-5">Venditori</Nav.Link>
                        <NavDropdown className="fw-bold fs-5" title={<span>
                            {userImage ? (<img src={userImage} alt="Immagine profilo" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }} />) : (<i className="bi bi-person-circle me-1"></i>)}
                            Area Personale
                        </span>} id="navbarScrollingDropdown">
                            {isLoggedIn ? (
                                <NavDropdown.Item onClick={() => {
                                    localStorage.removeItem("token");
                                    setIsLoggedIn(false);
                                    setUserImage(null); 
                                    window.location.reload();
                                }} className="navDropdown">LOGOUT</NavDropdown.Item>
                            ) : (
                                <>
                                    <NavDropdown.Item onClick={() => setShowAccessPopup(true)} className="navDropdown">ACCEDI</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => setShowRegistrationPopup(true)} className="navDropdown">REGISTRATI</NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
            <AccessPopup show={showAccessPopup} onHide={() => setShowAccessPopup(false)} onLogin={handleLogin} />
            <RegistrationPopup show={showRegistrationPopup} onHide={() => setShowRegistrationPopup(false)} />
        </Navbar>
    );
};

export default NavBar;