import React from 'react'
import { Container, Row, Form, Button , Col} from 'react-bootstrap'
const NewDog = () => {
    const handleSubmit = async ( event) => {
        event.preventDefault();
        try {
            const newDog = {
                name: event.target.name.value,
                age: event.target.age.value,
                breed: event.target.breed.value,
                bio: event.target.bio.value,
                image: event.target.image.value,
            };
            const response = await fetch('http://localhost:3001/api/dogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDog),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }}
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100"> 
    <Row className="w-100"> 
        <h1 className="text-center mb-4 fs-1" style={{font:"sans-serif"}}>AGGIUNGI CUCCIOLO</h1>
      <Col xs={12} md={8} className="mx-auto">
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 w-50 mx-auto" controlId="name">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="inserisci il nome" />
    </Form.Group>

    <Form.Group className="mb-3 w-50 mx-auto"  controlId="breed">
        <Form.Label>Breed</Form.Label>
        <Form.Control type="text" placeholder="inserisci la razza" />
    </Form.Group>

    <Form.Group className="mb-3 w-50 mx-auto" controlId="age">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" placeholder="inserisci l'eta" />
    </Form.Group>
    

    <Form.Group className="mb-3 w-50 mx-auto" controlId="bio">
        <Form.Label>Bio</Form.Label>
        <Form.Control type="text" placeholder="inserisci le caratteristiche" />
    </Form.Group>

    <Form.Group className="mb-3 w-50 mx-auto" controlId="image">
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="text" placeholder="Enter Avatar" />
    </Form.Group>

    

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </Col>
    </Row>
    </Container>
  )
}

export default NewDog