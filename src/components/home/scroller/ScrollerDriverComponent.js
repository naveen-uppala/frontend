import React from 'react'
import DriverImage from "../../../assets/truckdriver.jpg"
import "./ScrollerDriverComponentStyles.css"
import { Card } from 'reactstrap';


const ScrollerDriverComponent = () => {
    return (
        <div className="home-image-container">
            <Card style={{ background: `url(${DriverImage})` }} className='image-container' >
                 <p></p>  
            </Card>
        </div>
    )
}

export default ScrollerDriverComponent
