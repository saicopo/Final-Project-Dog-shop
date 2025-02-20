import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const RegistrationPopup = ({ show, onHide }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(
    "https://i.postimg.cc/3NLx05J8/cropped-Progetto-senza-titolo.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const formData = new FormData();

  formData.append("name", name);
  formData.append("surname", surname);
  formData.append("email", email);
  formData.append("address", address);
  formData.append("password", password);
  formData.append("image", image);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null);
    setSuccess(null);
    setLoading(true);
    
    if (password.length < 8) { 
      setError("La password deve contenere almeno 8 caratteri.");
      setLoading(false);
      return;
  }

    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/sellers", {
        method: "POST",
        
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Errore durante la registrazione.");
      }

      setSuccess("Registrazione avvenuta con successo!");

      setName("");
      setSurname("");
      setEmail("");
      setAddress("");
      setPassword("");
      setConfirmPassword("");
      setImage("");
      window.location.reload()
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Registrati</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}{" "}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci nome"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="surname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci cognome"
              required
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci cognome"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Conferma Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Conferma password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Immagine Profilo</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          <Button
            variant="primary"
            className="mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registrazione..." : "Registrati"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationPopup;
