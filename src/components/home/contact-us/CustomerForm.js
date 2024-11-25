import React, { useState } from "react";
import "./CustomerStyles.css";
import { Button, Form, Label, FormGroup, Input, Row, Col } from "reactstrap";

const CustomerForm = () => {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!values.fullName && !values.phone) {
      setError("Please enter your Full Name and Phone Number");
    } else if (!values.phone) {
      setError("Please enter your Phone Number");
    } else if (!values.fullName) {
      setError("Please enter your Full Name");
    } else {
      try {
        console.log("Submitting values:", values);

        const response = await fetch("http://localhost:3000/customerDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Server response:", data);

        // Clear form after successful submission
        setValues({});
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }

    // Clear error after 3 seconds
    if (error) {
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-10 card-container">
        <h2 className="text-center pb-3 pt-4 bg-black text-light">
          Customer Details
        </h2>
        <Form className="form-container" onSubmit={handleSubmit}>
          <Row>
            <Col className="col-md-12">
              <FormGroup className="input_section">
                <Label className="form-label-text">Name *</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={values.fullName || ""}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-12">
              <FormGroup className="input_section">
                <Label className="form-label-text">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={values.email || ""}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-12">
              <FormGroup className="input_section">
                <Label className="form-label-text">Phone Number *</Label>
                <Input
                  type="text"
                  name="phone"
                  value={values.phone || ""}
                  onChange={handleChange}
                  pattern="[789][0-9]{9}"
                  required
                  placeholder="Phone"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-6">
              <FormGroup className="input_section">
                <Label className="form-label-text">From Address</Label>
                <Input
                  type="text"
                  name="fromAddress"
                  value={values.fromAddress || ""}
                  onChange={handleChange}
                  placeholder="From Address"
                />
              </FormGroup>
            </Col>
            <Col className="col-md-6">
              <FormGroup className="input_section">
                <Label className="form-label-text">To Address</Label>
                <Input
                  type="text"
                  name="toAddress"
                  value={values.toAddress || ""}
                  onChange={handleChange}
                  placeholder="To Address"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-12">
              <FormGroup className="input_section">
                <Label className="form-label-text">Estimated Date</Label>
                <Input
                  type="date"
                  name="estDate"
                  value={values.estDate || ""}
                  onChange={handleChange}
                  placeholder="EST. MOVING DATE"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-12">
              <FormGroup className="input_section">
                <Label className="form-label-text">Moving Size</Label>
                <select
                  name="moveSize"
                  className="form-control"
                  value={values.moveSize || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="" key="hidden">
                    Select Move Size
                  </option>
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
          {error && <p className="text-center text-light">{error}</p>}
          <div className="button-container">
            <Button className="form-button" color="black" size="md" type="submit">
              <h2>Submit</h2>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CustomerForm;
