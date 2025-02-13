import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";

//css
import "../component/styleComponent/DogDetail.css";

const DogDetails = () => {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [seller, setSeller] = useState(null);

  const fetchDogDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/dogs/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setDog(data);
    } catch (error) {
      console.error("Errore nel recupero dettagli cane:", error);
      setDog(null);
    }
  };

  const fetchSeller = async (ownerId) => {
    if (!ownerId) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/sellers/${ownerId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSeller(data);
    } catch (error) {
      console.error("Errore nel recupero dettagli venditore:", error);
      setSeller(null);
    }
  };

  useEffect(() => {
    fetchDogDetails();
  }, []);

  useEffect(() => {
    if (dog && dog.owner) {
      const ownerId =
        typeof dog.owner === "object"
          ? dog.owner._id || dog.owner.id
          : dog.owner;
      fetchSeller(ownerId);
    } else {
      setSeller(null);
    }
  }, [dog]);

  if (dog === null) {
    return <div>Caricamento...</div>;
  }

  if (dog === undefined) {
    return <div>Errore nel caricamento dei dati.</div>;
  }

  const { Name, Age, Breed, Bio, Image, owner } = dog;


  return (
    <Container className="mt-4">
    <Row>
      
      <Col xs={12} md={4} lg={3} className="mx-auto"> 
      <Link
      className="text-decoration-none owner-link "
      to={
        owner && (typeof owner === 'object' ? owner._id || owner.id : owner)
          ? `/seller/${owner && (typeof owner === 'object' ? owner._id || owner.id : owner)}`
          : ""
      }>
        <Card className="shadow owner-card">
          <Card.Body>
            <Card.Title>Proprietario</Card.Title>
            {seller ? (
              <div className="d-flex align-items-center"> 
                <Card.Img className="owner-image"
                  src={seller.Image || "placeholder_url"} 
                  alt={seller.Name}
                  roundedCircle 
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                    borderRadius: "50%", // Stile inline
                  }}
                />
                <div> 
                  <Card.Text>
                    <strong>Nome:</strong> {seller.Name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Cognome:</strong> {seller.Surname}
                  </Card.Text>
                </div>
              </div>
            ) : (
              <Card.Text>Nessun proprietario specificato.</Card.Text>
            )}
          </Card.Body>
        </Card>
        </Link>
      </Col>
      
      <Col xs={12} md={6} lg={4} className="mx-auto">
        <Card className="shadow">
          <Card.Img variant="top" src={Image} alt={Name} />
          <Card.Body>
            <Card.Title>{Name}</Card.Title>
            <Card.Text>
              <strong>Età:</strong> {Age || "Non specificata"}
            </Card.Text>
            <Card.Text>
              <strong>Razza:</strong> {Breed || "Non specificata"}
            </Card.Text>
            <Card.Text>
              <strong>Bio:</strong> {Bio || "Non specificata"}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default DogDetails;
