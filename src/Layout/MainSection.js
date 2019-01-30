import React from 'react';
import { Route } from "react-router-dom";
import Map from "../Map/Map";

const MainSection = () => (
    <>
        <Route path="/car/:carId/rides/" exact component={Map} />
        <Route path="/cars" exact component={() => <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>Pick the car to display additional data</div>} />
    </>
);

export default MainSection;