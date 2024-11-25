import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CustomerDetailsComponent from "./components/home/parent/CustomerDetailsComponent";
import DriverDetailsComponent from "./components/home/parent/DriverDetailsComponent";

import HomeImage from "./assets/homepage.jpg"
//import "./ScrollerCustomerComponentStyles.css"
import { Card } from 'reactstrap';
import "./App.css"

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* Add your userdetails component here */}
          <Route path="/customer-details">
            <CustomerDetailsComponent />
          </Route>
          {/* Add your driver details component here */}
          <Route path="/driver-details">
            <DriverDetailsComponent />
          </Route>
          {/* Path for home page - two buttons */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (

    <div className="home-image-container">
            <Card style={{ background: `url(${HomeImage})` }} className='image-container' >
              <div className = "redirectButtonContainer">
                <Link to={"/driver-details"} >
                    <button className="button">Driver Details</button>
                </Link>
                <Link to={"/customer-details"}>
                    <button className="button">Customer Details</button>
                </Link>
              </div>
            </Card>
             
             
        </div>

  );
}
