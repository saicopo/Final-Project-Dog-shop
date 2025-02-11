import React, { use, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

import { useParams } from 'react-router'


const DogDetails = ({}) => {
    const {id} = useParams()
    const [dog, setDog] = useState([])
   

    const {Name, Age, Breed, Bio,Image} = dog



    const fetchDogDetails = async (res) => {
     try   { const response = await fetch(`http://localhost:3001/api/dogs/${id}`)
        const data = await response.json()
        console.log(data);
        
        setDog(data) 
        
 }
        catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        fetchDogDetails()
    }, [])
  return (
    <Container className="mt-4"> 
    <Row>
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
  )
}

export default DogDetails