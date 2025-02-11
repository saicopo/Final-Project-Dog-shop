import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router'; 
import "./DogCard.css"
const DogCard = ({ Name, Image, _id }) => {
  
    
    
    return (
        
      <Link className="text-decoration-none" to={`/dog/${_id}`}>
        <Card className="shadow-sm h-100 card-zoom-out">
          {Image ? (
            <Card.Img
              variant="top"
              src={Image}
              alt={Name}
              style={{
                objectFit: "contain", 
                height: "200px", 
                width: "100%" 
              }}
            />
          ) : (
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              alt="Immagine in caricamento..."
              style={{ objectFit: "contain", height: "200px", width: "100%" }}
            />
          )}
          <Card.Body>
            <Card.Title className="mb-0">{Name}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    
    );
};

export default DogCard;