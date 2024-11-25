import React from 'react'
import HomeImage from "../../../assets/homepage.jpg"
import "./HomeComponentStyles.css"
import { Card } from 'reactstrap';


const Home = () => {
    return (
        <div className="home-image-container">
            <Card style={{ background: `url(${HomeImage})` }} className='image-container' >
                <p></p>
            </Card>
        </div>
    )
}

export default Home
