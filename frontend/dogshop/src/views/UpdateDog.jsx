

import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router";

const UpdateDog = () => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [Name, setName] = useState("");
    const [Age, setAge] = useState("");
    const [Breed, setBreed] = useState("");
    const [Bio, setBio] = useState("");
    const [Image, setImage] = useState(null);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchDog = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/dogs/${id}`);
                if (!response.ok) {
                    throw new Error("Errore durante il recupero dei dati del cucciolo");
                }
                const data = await response.json();
                setDog(data);
                setName(data.Name);
                setAge(data.Age);
                setBreed(data.Breed);
                setBio(data.Bio);
                setImage(data.Image);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDog();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append("Name", Name);
        formData.append("Age", Age);
        formData.append("Breed", Breed);
        formData.append("Bio", Bio);
        if (Image) {
            formData.append("Image", Image);
        }

        try {
            const response = await fetch(`http://localhost:3001/api/dogs/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ||
                    "Errore durante l'aggiornamento dei dati del cucciolo"
                );
            }

            setSuccess("Dati del cucciolo aggiornati con successo!");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!dog) {
        return <p>Cucciolo non trovato.</p>;
    }

    return (
        <div>
            <h2>Modifica Profilo Cucciolo</h2>
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Age">
                    <Form.Label>Età</Form.Label>
                    <Form.Control
                        type="number"
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Breed">
                    <Form.Label>Razza</Form.Label>
                    <Form.Control
                        type="text"
                        value={Breed}
                        onChange={(e) => setBreed(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={Bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="Image">
                    <Form.Label>Immagine Cucciolo</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
                <Link to={`/dog/${id}`}>
                <Button className="mt-3 me-3" variant="info " type="submit">
                    TORNA AL PROFILO
                </Button>
                </Link>
                <Button className="mt-3" variant="success" type="submit">
                    APPLICA MODIFICHE
                </Button>
            </Form>
        </div>
    );
};

export default UpdateDog;