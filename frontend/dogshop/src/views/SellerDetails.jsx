import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import DogCard from "../component/dogCard/DogCard";

//css
import "../component/styleComponent/SellerDetail.css";

const SellerDetails = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isOwner, setIsOwner] = useState(false); // Nuovo stato per isOwner
  const [ownerCheckLoading, setOwnerCheckLoading] = useState(true); // Nuovo stato per il caricamento di isOwner

  const navigateNewDog = () => {
    navigate(`/sellers/${id}/new-dog`);
  };
  const navigateUpdateSeller = () => {
    navigate(`/updateSeller/${id}`);
  };
  const fetchSellerDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/sellers/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setSeller(data[0]);
      } else if (!Array.isArray(data)) {
        setSeller(data);
      } else {
        setError("Nessun venditore trovato");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const DeleteSeller = async () => {
    if (window.confirm("Sei sicuro di voler eliminare questo profilo?")) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/api/sellers/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        navigate("/seller");
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchSellerDetails();
  }, [id]);

  useEffect(() => {
    if (seller && token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.userId;
        setIsOwner(userId === seller.sellerID);
      } catch (e) {
        console.error("Errore durante la decodifica del token", e);
        setIsOwner(false); // Imposta isOwner a false in caso di errore
      } finally {
        setOwnerCheckLoading(false);
      }
    } else {
      setOwnerCheckLoading(false); // Imposta il caricamento a false se seller o token sono nulli
    }
  }, [seller, token]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  if (!seller) {
    return <div>Venditore non trovato.</div>;
  }

  const { name, surname, address, email, seller_dog, image } = seller;

  return (
    <Container className="seller-details-container">
      <h1>I Cuccioli di {name}</h1>
      <Row className="d-flex align-items-center">
        <Col xs={12} md={6} lg={4} className="text-center">
          <img src={image} alt={name} className="img-fluid w-75" />
          <div className="d-flex flex-column align-items-center">
            <p className="w-75 seller-info p-2">
              <i className="bi bi-person-fill me-2 "></i>
              {name} {surname}
            </p>
            <p className="w-75 seller-info p-2">
              <i className="bi bi-house-door-fill me-2"></i>
              {address}
            </p>
            <p className="w-75 seller-info p-2">
              <i className="bi bi-envelope-fill me-2"></i>
              {email}
            </p>
          </div>
          <Col className="d-flex flex-column align-items-center">
            {ownerCheckLoading ? (
              <div>Controllo proprietario...</div> // Mostra un messaggio di caricamento
            ) : isOwner ? (
              <>
                <button
                  className="btn btn-primary w-50 mt-3"
                  onClick={navigateUpdateSeller}
                >
                  MODIFICA PROFILO
                </button>
                <button
                  className="btn btn-danger w-50 mt-3"
                  onClick={DeleteSeller}
                >
                  ELIMINA PROFILO
                </button>

                <button
                  className="btn btn-info w-50 mt-3"
                  onClick={navigateNewDog}
                >
                  AGGIUNGI CUCCIOLO
                </button>
              </>
            ) : null}
          </Col>
        </Col>

        {seller_dog && seller_dog.length > 0 ? (
          <Col className="dog-list" xs={12} md={6} lg={8}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {seller_dog.map((dog) => (
                <Col key={dog._id}>
                  <DogCard
                    className="card-dog"
                    Name={dog.Name}
                    Image={dog.Image}
                    _id={dog._id}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        ) : (
          <p>Nessun cane trovato per questo venditore.</p>
        )}
      </Row>
    </Container>
  );
};

export default SellerDetails;