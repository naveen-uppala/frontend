import React, { useState } from "react";
// import axios from 'axios';
import "./CustomerStyles.css";
import { Button, Form, Label, FormGroup, Input, Row, Col } from 'reactstrap';
// import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
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
            fetch("/customer/customerDetails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to submit data");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Data submitted successfully:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            
            }

    };



    return(
        <div className="d-flex justify-content-center">
            <div className='col-md-10 card-container'>
                <h2 className='text-center pb-3 pt-4 bg-black text-light'>Customer Details</h2>
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
                                <Label className="form-label-text">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    color="#005a87"
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email"
                                />
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
                        <Col className='col-md-6'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">From Address</Label>
                                <Input
                                    type="text"
                                    name="fromAddress"
                                    value={values.fromAddress}
                                    onChange={handleChange}
                                    required
                                    placeholder="From Address" />
                            </FormGroup>
                        </Col>
                        <Col className='col-md-6'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">To Address</Label>
                                <Input
                                    type="text"
                                    name="toAddress"
                                    value={values.toAddress}
                                    onChange={handleChange}
                                    required
                                    placeholder="To Address" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-md-12'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">Estimated Date</Label>
                                <Input
                                    type="date"
                                    name="estDate"
                                    value={values.estDate}
                                    onChange={handleChange}
                                    required
                                    placeholder="EST. MOVING DATE" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col-md-12'>
                            <FormGroup className="input_section">
                                <Label className="form-label-text">Moving Size</Label>
                                <select
                                    type="select"
                                    name="moveSize"
                                    className="form-control"
                                    value={values.moveSize}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="hidden">Select Move Size</option>
                                    <option value="1 Bedroom Apartment">1 Bedroom Apartment</option>
                                    <option value="2 Bedroom Apartment">2 Bedroom Apartment</option>
                                    <option value="3 Bedroom Apartment">3 Bedroom Apartment</option>
                                    <option value="1 Bedroom House">1 Bedroom House</option>
                                    <option value="2 Bedroom House">2 Bedroom House</option>
                                    <option value="3 Bedroom House">3 Bedroom House</option>
                                    <option value="Office">Office</option>
                                    <option value="Other">Other</option>
                                </select>
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

export default CustomerForm;
