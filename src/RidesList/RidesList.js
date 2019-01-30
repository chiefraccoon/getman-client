import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import CarCard from '../CarCard/CarCard';
import './RidesList.css';
import {Query} from 'react-apollo';
import { withRouter } from "react-router";

import {GET_RIDES_BY_CAR, GET_CAR_BY_ID} from "./RidesList.gql";

class RidesList extends Component {
    state = {
        activeRide: null
    };
    renderRideItem = (ride) => {
        const startedAt = moment(parseInt(ride['startedAt']));
        const endedAt = moment(parseInt(ride['endedAt']));
        const duration = Math.ceil(moment.duration(endedAt - startedAt).asMinutes());
        const id = ride['id'];
        const isActive = id === this.state.activeRide;
        const itemClassNames = classNames('ride-item', {
            'ride-item-active': isActive
        });

        return (
            <div key={id} className={itemClassNames} onClick={this.handleRideClick(id)} >
                <div>Ride id: {id}</div>
                <div>Start date: {startedAt.format('lll')}</div>
                <div>End date: {endedAt.format('lll')}</div>
                <div>Duration: {duration} minutes</div>
            </div>
        );
    };

    handleRideClick = (id) => () => {
        this.setState({
            activeRide: id
        });
    };

    render() {
        return (
            <>
                <Query query={GET_CAR_BY_ID} variables={{ id: this.props.match.params.carId }}>
                    { ({loading, error, data}) => {
                        if (loading) return <div>Loading...</div>;
                        if (error) return <div>Error :(</div>;
                        return  <CarCard car={data.car}/>
                    }}
                </Query>
                <div className="rides-list">
                    <Query query={GET_RIDES_BY_CAR} variables={{ id: this.props.match.params.carId }}>
                        { ({loading, error, data}) => {
                            if (loading) return <div>Loading...</div>;
                            if (error) return <div>Error :(</div>;
                            return data.ridesByCar.map((ride) => this.renderRideItem(ride))
                        }}
                    </Query>
                </div>
            </>
        );
    }
}

RidesList.defaultProps = {
    carId: null
};

export default withRouter(RidesList);
