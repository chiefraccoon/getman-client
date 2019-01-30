import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import CarCard from '../CarCard/CarCard';
import './CarsList.css';

const GET_CARS = gql`
    {
        cars {
            id
            regNumber
            brand
            model
            color
            transmissionType
            stats {
                load
                count
                duration
            }
        }
    }
`;

class CarsList extends Component {
    render() {
        return (
            <Query query={GET_CARS}>
                {({loading, error, data}) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :(</div>;
                    return (
                        <div className='cars-list'>
                            {data.cars
                                .sort( (item1, item2) => {
                                    if(!item2.stats){
                                        return -1
                                    }
                                    if(!item1.stats){
                                        return 1
                                    }
                                    return item2.stats.load - item1.stats.load;

                                })
                                .map(car => <CarCard key={car.id} car={car}/>)}
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default CarsList;
