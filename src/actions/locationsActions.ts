import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Location from "../interfaces/Location";
import LocationsState from "../interfaces/LocationsState";

/*
*get weather data from open weather api
*/
export const getCurrentWeatherDetails = async (location: Location) => {
  const fetchWeatherDetails = async () => {
    try {
      const response =  await fetch(`${process.env.REACT_APP_OPENWEATHER_API_URL}weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      const data = await response.json();
      //console.log(location.name,data);
      return (data);
    } catch (error) {
      console.error("Error fetching current wind condition", error);
    }
  };

  let data = await fetchWeatherDetails();
  return data;
};

//--- get locations stored in browser cookie
export const getLocations = createAsyncThunk(
  "locations/getLocations",
  async () => {
    // Simulate an API call or access cookies and get locations
    const cookies = new Cookies();
    const locationsCookie = cookies.get("locations");
    const response: LocationsState = {
      locations: locationsCookie || undefined,
      initialLoad: false,
    };

    return response;
  }
);

//--- update locations in cookie storage
export const updateLocations = createAsyncThunk(
  "locations/updateLocations",
  async (location: Location) => {
    // Simulate an API call or add the location to a cookie
    const cookies = new Cookies();
    const locationsCookie = cookies.get("locations");

    let locationsToAdd;

    if (locationsCookie !== undefined) {
      locationsToAdd = locationsCookie;
      locationsToAdd.push(location);
    } else {
      locationsToAdd = [location];
    }

    cookies.set("locations", JSON.stringify(locationsToAdd));
    return location;
  }
);

//--- remove locations from cookie
export const removeLocations = createAsyncThunk(
  "locations/removeLocations",
  async (index: number) => {
    // Simulate an API call or remove from cookie array
    const cookies = new Cookies();
    const locationsCookie = cookies.get("locations");

    let newLocations = locationsCookie;
    const location = newLocations[index];

    if (locationsCookie !== undefined) {
      newLocations.splice(index, 1);
    }

    cookies.set("locations", JSON.stringify(newLocations));

    return location;
  }
);
