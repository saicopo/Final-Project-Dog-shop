import React, { useEffect, useState } from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router";
const DogCard = ({ _id, Name}) => {
  const [imgdogs, setImgDogs] = useState([]);
  const fetchImgDogs = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setImgDogs(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(imgdogs);

  useEffect(() => {
    fetchImgDogs();
  }, []);

  return (
    <Col xs={12} md={6} lg={4}>
      <Link className="text-decoration-none" to={`/dog/${_id}`}>
        <Card className="shadow-sm">
          <Card.Img className="img-fluid w-75 h-75" variant="top" src={imgdogs.message} />
          <Card.Body>
            <Card.Title>{Name}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default DogCard;
