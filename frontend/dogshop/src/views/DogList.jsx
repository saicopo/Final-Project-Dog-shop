import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DogCard from "../component/dogCard/DogCard";
import { ReactComponent as HomeLogo } from '../component/styleComponent/home-title.svg';

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  

  const fetchListDogs = async () => {
   
    try {
      const response = await fetch("http://localhost:3001/api/dogs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
     
      setDogs(data);
    } catch (error) {
      console.error("Errore nel recupero dei cani:", error);
       
    } 
  };


  useEffect(() => {
    fetchListDogs();
  }, []);

  console.log(dogs);
  

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center mb-4">
          <h1 className="titolo-home me-3">Cuccioli</h1>
          <HomeLogo className="home-logo" />
        </Col>
      </Row>
      <Row >
      <Col className="d-flex flex-wrap mb-4">
      {dogs.map((dog) => (
        <Col xs={12} md={6} lg={4} key={dog._id}> 
          <DogCard {...dog} />
        </Col>
      ))}
    </Col>
      </Row>
    </Container>
  );
};

export default DogList;