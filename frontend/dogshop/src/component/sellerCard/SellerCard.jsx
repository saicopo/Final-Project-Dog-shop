import React from 'react'
import "./SellerCard.css"
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router'



const SellerCard = ({seller,index}) => {
  const { Name, Address, Image, _id,Email,Surname } = seller
    
   


  return (
    <Link className="text-decoration-none" to={`/seller/${_id}`}> 
    <Card className="shadow seller-card p-0"> 
        
           
       
        <Card.Body className='w-100'>
            <Card.Img
                variant="top"
                src={Image}
                alt={Name}
                className="rounded-circle seller-image"
                />
            <Card.Title className='d-flex justify-content-center fs-5'> 
               {Name} {Surname}
            </Card.Title>
            
            <Card.Text>
            <i  class="bi bi-envelope me-2"></i>
                 {Email}
            </Card.Text>
            <Card.Text>
            <i  class="bi bi-geo-alt me-2"></i>
                 {Address}
            </Card.Text>
        </Card.Body>
    </Card>
    </Link>

  )
}

export default SellerCard