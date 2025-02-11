
import React, { useEffect, useState } from 'react'
import { Card, Container, Row,Col } from 'react-bootstrap';

import SellerCard from '../component/sellerCard/SellerCard';


const SellerList = () => {

  const [sellers,setSellers]=useState([]);
  const fetchSellers=async()=>{
    try{
      const response=await fetch('http://localhost:3001/api/sellers');
      const data=await response.json();
      console.log(data);
      
      setSellers(data);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchSellers();
  },[])

  return (
    <Container>
      <h1>VENDITORI</h1>
      <Row className='d-flex justify-content-center flex-wrap'>
        {sellers.map((seller, index) => (
          <Col key={seller._id} xs={12} md={6} lg={4} className="mb-4">
            <SellerCard seller={seller} index={index} />
          </Col>
        ))}
      </Row>
    </Container>
    
  )
}

export default SellerList