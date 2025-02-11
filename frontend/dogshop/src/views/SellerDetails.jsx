import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import DogCard from "../component/dogCard/DogCard";

//css
import "../component/styleComponent/SellerDetail.css";

const SellerDetails = () => {
    const { id } = useParams();
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } else if (!Array.isArray(data)){
                setSeller(data)
            }
            else{
                setError("Nessun venditore trovato")
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellerDetails();
    }, [id]);

    if (loading) {
        return <div>Caricamento...</div>;
    }

    if (error) {
        return <div>Errore: {error}</div>;
    }

    if (!seller) {
        return <div>Venditore non trovato.</div>;
    }

    const { Name, Surname, Address, Email, seller_dog, Image } = seller;



    return (
        <Container className="seller-details-container">
            <h1>I Cuccioli di {Name}</h1>
            <Row className="d-flex align-items-center">
                <Col xs={12} md={6} lg={4} className="text-center">
                    <img src={Image} alt={Name} className="img-fluid" />
                    <p>{Name} {Surname}</p>
                    <p>{Address}</p>
                    <p>{Email}</p>
                </Col>
                
                    
                    {seller_dog && seller_dog.length > 0 ? (
                        <Col className="d-flex dog-list" xs={12} md={6} lg={8}>
                            {seller_dog.map(dog => (
                                <li key={dog._id}>
                                    <DogCard className="card-dog" Name={dog.Name} Image={dog.Image} _id={dog._id}/>
                                </li>
                            ))}
                        </Col>
                    ) : (
                        <p>Nessun cane trovato per questo venditore.</p>
                    )}
                
            </Row>
        </Container>
    );
};

export default SellerDetails;