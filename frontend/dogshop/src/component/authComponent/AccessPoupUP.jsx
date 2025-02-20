import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const AccessPopup = ({ show, onHide, onLogin }) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = { // Rinomino la variabile
            email: email,
            password: password,
        };
       
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3001/api/sellers/login", {
                
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Errore durante il login');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); 
            onLogin(data.token); 
            onHide(); 
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Accedi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>} 
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Inserisci email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Inserisci password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </Form.Group>

                    <Button variant="primary" className='mt-3' type="submit" disabled={loading}>
                        {loading ? "Login..." : "Accedi"} 
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AccessPopup;