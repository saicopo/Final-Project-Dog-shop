import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router';

const SellerProfile = () => {
    const token = localStorage.getItem('token')
    console.log(token);
    
    
    const { id } = useParams(); 
    const [seller, setSeller] = useState(null);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchSeller = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/api/sellers/${id}`); 
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei dati del seller');
                }
                const data = await response.json();
                setSeller(data);
                setName(data.name);
                setSurname(data.surname);
                setEmail(data.email);
                setAddress(data.address);
                setImage(data.image);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSeller();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('email', email);
        formData.append('address', address);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:3001/api/sellers/${id}`, { 
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante l\'aggiornamento dei dati del seller');
            }

            setSuccess('Dati del seller aggiornati con successo!');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    if (loading) {
        return <p>Caricamento...</p>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!seller) {
        return <p>Seller non trovato.</p>;
    }

    return (
        <div>
            <h2>Modifica Profilo Seller</h2>
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="surname">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Indirizzo</Form.Label>
                    <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Immagine Profilo</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Aggiornamento...' : 'Aggiorna'}
                </Button>
            </Form>
        </div>
    );
};

export default SellerProfile;