import React, { useState } from "react";
// import axios from 'axios';
import "./DriverStyles.css";
import { Button, Form, Label, FormGroup, Input, Row, Col } from 'reactstrap';
// import { useNavigate } from "react-router-dom";

const DriverForm = () => {
    const [values, setValues] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if((values.fullName === undefined || values.fullName === "") && (values.phone === undefined || values.phone === "")) {
            setError("Please enter your Full Name and Phone Number")
            setInterval(() => {
                setError(null)
            }, 3000);
        }
        else if(values.phone === undefined || values.phone === "") {
            setError("Please enter your Phone Number")
            setInterval(() => {
                setError(null)
            }, 3000);
        }

        else if(values.fullName === undefined || values.fullName === "") {
            setError("Please enter your Full Name")
            setInterval(() => {
                setError(null)
            }, 3000);
        }
        
        else {
            console.log(values)

            fetch("http://localhost:8081/home/customerDetails",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values)                
            }).then(()=>{
                console.log("New user added")
            })
            }

    /*    else {
            console.log(values)
            fetch("https://backend.hyderabad-packers-movers.in/home/customerDetails",{

                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values)
                
            }).then(()=>{
                console.log("New user added")
            })
        }
    */    
    };



    return(       
        <div className="d-flex justify-content-center">
            <div className='col-md-10 card-container'>
                <h2 className='text-center pb-3 pt-4 bg-black text-light'>Driver Details</h2>
                <Form className="form-container">
                    <Row className="">
                        <Col className='col-md-12'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">Name *</Label>
                                <Input
                                    type="text"
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    id="full_name"
                                    required
                                    placeholder="Full Name" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='col-md-12'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">Phone Number *</Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    pattern="[789][0-9]{9}"
                                    required
                                    placeholder="Phone" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-md-12'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">Vehicle Number</Label>
                                <Input
                                    type="text"
                                    name="vehicleNumber"
                                    value={values.vehicleNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Vehicle Number" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-md-12'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">Vehicle Type</Label>
                                <select
                                    type="select"
                                    name="moveSize"
                                    className="form-control"
                                    value={values.moveSize}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="hidden">Select Vehicle Type</option>
                                    <option value="1 Bedroom Apartment">Ashok Leyland</option>
                                    <option value="2 Bedroom Apartment">Tata Super Ace</option>
                                </select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-md-12'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">Ride Date</Label>
                                <Input
                                    type="date"
                                    name="rideDate"
                                    value={values.rideDate}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ride Date" />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                {
                    error !== null && (<p className="text-center text-light">{error}</p>)
                }
                <div className='button-container'>
                    <Button className="form-button" color="black" size='md' onClick={handleSubmit}><h2>Submit</h2></Button>
                </div>
            </div>
        </div>
    )
};

export default DriverForm;
