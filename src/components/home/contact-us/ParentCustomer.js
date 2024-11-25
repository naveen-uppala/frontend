import React from 'react'
import "./CustomerStyles.css"
import AboutUs from './AboutUs';
import CustomerForm from './CustomerForm';

const ParentCustomer = () => 
(
     <div className='col-md-12 contact-us-container'>
        <div className='col-md-8 p-5 text-justify'>
            <AboutUs />
        </div>
        <div className='col-md-4 p-5'>
            <CustomerForm />
        </div>
    </div>
)
export default ParentCustomer
