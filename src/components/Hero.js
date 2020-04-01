import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
<div className="text-center hero my-5">
    <img className="mb-3 app-logo" src="https://durham.foodbank.org.uk/wp-content/uploads/sites/153/2016/05/Durham-Three-Colour-logo.png" alt="Durham Foodbank" width="120" />
    <h1 className="mb-4">Stock Management System</h1>

    <p className="lead">
      A stock management system produced for Durham Foodbank
    </p>
    <a className="btn btn-primary btn-lg" href="./dashboard" role="button">Get Started</a>


</div>
);

export default Hero;
