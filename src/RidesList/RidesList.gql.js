import gql from "graphql-tag";

export const GET_CAR_BY_ID = gql`
    query CarDetails($id: ID!) {
        car(id: $id) {
            id
            regNumber
            brand
            model
            color
            transmissionType
            stats{
                load
                duration
                count
            }
        }
    }
`;

export const GET_RIDES_BY_CAR = gql`
    query RidesDetails($id: ID!){
        ridesByCar(id: $id){
            id
            startPoint{
                coordinates
            }
            endPoint{
                coordinates
            }
            endedAt
            startedAt
        }
    }
`;