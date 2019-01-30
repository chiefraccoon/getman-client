import React from 'react';
import {Route, Link, Redirect } from "react-router-dom";
import RidesList from "../RidesList/RidesList";
import CarsList from "../CarsList/CarsList";

const SidePanel = () => (
        <>
            <nav>
                <Link to="/cars/">Cars</Link>
                <Link to="/stats/">Stats</Link>
            </nav>

            <Route path="/car/:carId/rides/" exact component={RidesList} />
            <Route path="/car/:carId/" exact component={RidesList} />
            <Route path="/cars/" component={CarsList} />
            <Redirect to="/cars/" />
        </>
);

export default SidePanel;