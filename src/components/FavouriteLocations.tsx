import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import LocationsState from '../interfaces/LocationsState';
import { AnyAction } from 'redux';
import { removeLocations } from "../actions/locationsActions";
import LocationItem from "./LocationItem";
import styles from '../assets/css/FavouriteLocations.module.css'
import Card from "./UI/Card";

const FavouriteLocations = () => {
    const locations = useSelector((state: LocationsState) => state.locations);
    const dispatch = useDispatch<ThunkDispatch<LocationsState, any, AnyAction>>();

    const removeLocation = (index: number) => {
        dispatch(removeLocations(index));
    };

    const fav_locations = <section className={styles.favourites}>
        <Card>
            <ul>{
                //--- populate list of favourite locations 
                locations.map((item, i) => (
                    <LocationItem key={i} item={item} index={i} removeLocation={removeLocation} />
                ))}
            </ul>
        </Card>
    </section>

    //--- text to show if no locations have been marked as favourite
    const fallback = <div className={styles['fallback-container']}><Card className={styles.fallback}><p>You don't have any locations favourited <br></br>
        Add a city to favourites to view wind forecast information</p></Card></div>;

    return (
        <>
            {locations !== undefined && locations.length > 0 && fav_locations}
            {locations !== undefined && locations.length === 0 && fallback}
        </>
    );
};

export default FavouriteLocations;