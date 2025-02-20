import React from 'react'
import "./SellerCard.css"
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router'



const SellerCard = ({seller,index}) => {
  const { name, address, image, _id,email,surname } = seller
    
   


  return (
    <Link className="text-decoration-none" to={`/seller/${_id}`}> 
    <Card className="shadow seller-card p-0"> 
        
           
       
        <Card.Body className='w-100'>
        <div className="image-container">
                    <Card.Img
                        variant="top"
                        src={image}
                        alt={name}
                        className="seller-image"
                    />
                </div>
            <Card.Title className='d-flex justify-content-center fs-5'> 
               {name} {surname}
            </Card.Title>
            
            <Card.Text>
            <i  class="bi bi-envelope me-2"></i>
                 {email}
            </Card.Text>
            <Card.Text>
            <i  class="bi bi-geo-alt me-2"></i>
                 {address}
            </Card.Text>
        </Card.Body>
    </Card>
    </Link>

  )
}

export default SellerCard