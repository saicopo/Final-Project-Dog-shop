import React, { useState } from "react";
import { Container, Row, Form, Button, Col, Alert } from "react-bootstrap";
import { useParams, Link } from "react-router";

const NewDog = () => {
    const [image, setImage] = useState("https://i.postimg.cc/BbCTpM4s/cropped-pngtree-dog-logo-design-vector-icon-png-image-1824202.jpg");
    const { sellerId } = useParams();
    
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const Name = event.target.Name.value;
        const Age = event.target.Age.value;
        const Breed = event.target.Breed.value;
        const Bio = event.target.Bio.value;

        let hasErrors = false;
        const newErrors = {};

        if (!Name) {
            newErrors.Name = "Il nome è obbligatorio";
            hasErrors = true;
        }
        if (!Age) {
            newErrors.Age = "L'età è obbligatoria";
            hasErrors = true;
        }
        if (!Breed) {
            newErrors.Breed = "La razza è obbligatoria";
            hasErrors = true;
        }
        if (!Bio) {
            newErrors.bio = "La bio è obbligatoria";
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        } else {
            setErrors({});
        }

        formData.append("Name", Name);
        formData.append("Age", Age);
        formData.append("Breed", Breed);
        formData.append("bio", Bio);
        if (image) {
            formData.append("image", image);
        }
        if (sellerId) {
            formData.append("owner", sellerId);
        }
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        try {
            const response = await fetch("http://localhost:3001/api/dogs", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setSuccessMessage("Cane aggiunto alla cucciolata!");
        setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error(error);
        }
       
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <h1 className="text-center mb-4 fs-1" style={{ font: "sans-serif" }}>
                    AGGIUNGI CUCCIOLO
                </h1>
                <Col xs={12} md={8} className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 w-50 mx-auto" controlId="Name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="inserisci il nome" isInvalid={!!errors.Name} />
                            <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 w-50 mx-auto" controlId="Breed">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control type="text" placeholder="inserisci la razza" isInvalid={!!errors.Breed} />
                            <Form.Control.Feedback type="invalid">{errors.Breed}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 w-50 mx-auto" controlId="Age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="inserisci l'eta" isInvalid={!!errors.Age} />
                            <Form.Control.Feedback type="invalid">{errors.Age}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 w-50 mx-auto" controlId="Bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control type="text" placeholder="inserisci le caratteristiche" isInvalid={!!errors.Bio} />
                            <Form.Control.Feedback type="invalid">{errors.Bio}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 w-50 mx-auto" controlId="image">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Link to={`/seller/${sellerId}`}>
                                <Button className="mt-3 me-3" variant="info">
                                    TORNA AL PROFILO
                                </Button>
                            </Link>
                            <Button className="mt-3" variant="primary" type="submit">
                                AGGIUNGI
                            </Button>
                        </div>
                    </Form>
                    {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default NewDog;