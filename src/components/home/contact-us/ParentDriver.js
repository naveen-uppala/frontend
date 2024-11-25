import React from 'react'
import "./DriverStyles.css"
import AboutUs from './AboutUs';
import DriverForm from './DriverForm';

const ParentDriver = () => 
(
     <div className='col-md-12 contact-us-container'>
        <div className='col-md-8 p-5 text-justify'>
            <AboutUs />
        </div>
        <div className='col-md-4 p-5'>
            <DriverForm />
        </div>
    </div>
)
export default ParentDriver
