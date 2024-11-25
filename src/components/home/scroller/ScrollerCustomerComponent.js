import React from 'react'
import CustomerImage from "../../../assets/customerdetails.jpg"
import "./ScrollerCustomerComponentStyles.css"
import { Card } from 'reactstrap';


const ScrollerCustomerComponent = () => {
    return (
        <div className="home-image-container">
            <Card style={{ background: `url(${CustomerImage})` }} className='image-container' >
                <p></p>
            </Card>
        </div>
    )
}

export default ScrollerCustomerComponent
