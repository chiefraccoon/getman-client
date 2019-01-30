import React, {Component} from 'react';
import mapboxgl from "mapbox-gl";
import { withRouter } from "react-router";
import './Map.css';
import {Query} from "react-apollo";
import uuid from 'uuid/v1';
import {GET_RIDES_BY_CAR} from "../RidesList/RidesList.gql";

class Map extends Component {
    rides = null;

    constructor(props) {
        super(props);
        this.map = null;
    }

    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxva296YW0iLCJhIjoiY2prNnRtdWZmMjMyYjNsbnR3OXExdnNhZCJ9.MK1LHtI14nUUBIze3HKbaw';
        this.map = new mapboxgl.Map({
            container: this.mapContainer.parentElement,
            style: 'mapbox://styles/mapbox/light-v9',
            center: [30.52, 50.45], // starting position
            zoom: 10
        });

        this.map.on('load', this.drawRides)
    }

    drawRides = () => {
        if(!this.rides) return;
        this.map.addLayer({
            "id": "route"+ uuid(),
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": this.prepareLines()
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#888",
                "line-width": 2
            }
        });
        this.map.addLayer({
            "id": "ridesStart"+uuid(),
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": this.preparePoints('startPoint')
                }
            },
            "type": "circle",
            "paint": {
                "circle-radius": 7,
                "circle-color": "#00ffbf"
            }
        });
        this.map.addLayer({
            "id": "ridesEnd"+uuid(),
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": this.preparePoints('endPoint')
                }
            },
            "type": "circle",
            "paint": {
                "circle-radius": 5,
                "circle-color": "#007cbf"
            }
        });
    };

    preparePoints = (type) => {
        return this.rides.map(ride => ({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": ride[type]
            }
        }));
    };

    prepareLines = () => {
        return this.rides.map(ride => ({
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    ride['startPoint'],
                    ride['endPoint']
                ]
            }
        }));
    };

    parseRideData = (ride) => {
        return {
            "_id": ride.id,
            id: ride.id,
            endPoint: ride.endPoint.coordinates.map( item => parseFloat(item)),
            startPoint: ride.startPoint.coordinates.map( item => parseFloat(item)),
            startedAt: ride.startedAt,
            endedAt: ride.endedAt
        }
    };

    render() {
        return <div className="map-container">
            <Query query={GET_RIDES_BY_CAR} variables={{ id: this.props.match.params.carId }}>
                { ({loading, error, data}) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :(</div>;
                    this.rides = data.ridesByCar.map((ride) => this.parseRideData(ride));
                    this.drawRides();
                    return null;
                }}
            </Query>
            <div ref={el => this.mapContainer = el}></div>
        </div>;
    }
}

export default withRouter(Map);