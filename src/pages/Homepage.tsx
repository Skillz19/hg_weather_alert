import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { updateLocations } from '../actions/locationsActions';
import LocationsState from '../interfaces/LocationsState';
import LocationForm from '../forms/LocationForm';
import { AnyAction } from 'redux';
import Location from '../interfaces/Location';
import FavouriteLocations from '../components/FavouriteLocations';

const HomePage: React.FC = () => {
    //--- get favourite locations from redux state
    const locations = useSelector((state: LocationsState) => state.locations);
    //---
    const dispatch = useDispatch<ThunkDispatch<LocationsState, any, AnyAction>>();

    const handleSubmit = (data: Location) => {
        const locationToAdd: Location = { ...data };
        // If the location already exists don't add it again
        if (locations !== undefined) {
            const exists = locations.some((el) => {
                return el.name === locationToAdd.name;
            });

            if (exists) {
                alert(`You've already favorited this location!`);
                return;
            }
        }
        dispatch(updateLocations(locationToAdd));
    };

    

    return (
        <>
            <LocationForm onSubmit={handleSubmit} />
            <FavouriteLocations />
        </>
    );
};

export default HomePage;
