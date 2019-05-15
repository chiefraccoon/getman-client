import React, {Component} from 'react';
import { Link } from "react-router-dom";

import './CarCard.css';

const N_A = 'n/a';

class CarCard extends Component {
    render() {
        const {car: {stats}, car} = this.props;

        return (
            <Link className='car-item' to={'/car/'+car.id+'/rides/'}>
                <div>Model/Transmition type : {car.model || car.brand || N_A} / {car.transmissionType}</div>
                <div>Plate #: {car.regNumber}</div>
                <div>Avg rides amount/duration: {stats && stats.count.toFixed(2)} / {stats && stats.duration.toFixed(0)} minutes</div>
                <div>Avg Load: {stats && stats.load.toFixed(2)}%</div>
            </Link>
        );
    }
}

CarCard.defaultProps = {
    id: N_A,
    regNumber: N_A,
    brand: N_A,
    model: N_A,
    color: N_A,
    transmissionType: 0,
    stats: {
        load: 0,
        count: 0,
        duration: 0
    }
};

export default CarCard;
