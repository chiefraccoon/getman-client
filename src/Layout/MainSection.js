import React from 'react';
import { Route } from "react-router-dom";
import Map from "../Map/Map";

const MainSection = () => (
    <>
        <Route path="/car/:carId/rides/" exact component={Map} />
        <Route path="/cars" exact component={() => <>Pick the car to display additional data</>} />
    </>
);

export default MainSection;