import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DogCard from "../component/dogCard/dogCard";

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const fetchListDogs = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/dogs");
      const data = await response.json();


      setDogs(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dogs);

  useEffect(() => {
    fetchListDogs();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Lista dei cuccioli</h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center flex-wrap">
        {dogs.map((dog) => (
          <DogCard key={dog._id} {...dog} />
        ))}
        </Col>
      </Row>
    </Container>
  );
};

export default DogList;
