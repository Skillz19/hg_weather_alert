import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocationsState from '../../interfaces/LocationsState';
import { getLocations, updateLocations, removeLocations } from '../../actions/locationsActions';

const initialState: LocationsState = {
  initialLoad: true,
  locations: [],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState: initialState,
  reducers: {
    getLocationsSuccess: (state, action: PayloadAction<LocationsState>) => {
      return { ...state, ...action.payload };
    },
    updateLocationsSuccess: (state, action: PayloadAction<LocationsState>) => {
      if (state.locations !== undefined) {
        state.locations.push(action.payload.locations[0]);
      }else {
        state.locations = [action.payload.locations[0]];
        state.initialLoad = false;
      }
    },
    removeLocationsSuccess: (state, action: PayloadAction<LocationsState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.fulfilled, (state, action) => {
        //console.log("action ",action.payload);
        if (state.locations !== undefined) {
          state.locations = [...action.payload.locations];
          state.initialLoad = action.payload.initialLoad;
        }
        else{
          state.locations = [...action.payload.locations];
          state.initialLoad = action.payload.initialLoad;
        }
      })
      .addCase(updateLocations.fulfilled, (state, action) => {
        if (state.locations !== undefined) {
          state.locations.push(action.payload);
        } else {
          state.locations = [action.payload];
          state.initialLoad = false;
        }
      })
      .addCase(removeLocations.fulfilled, (state, action) => {
        // remove locations from the state
        state.locations = state.locations.filter((item)=> item.name !== action.payload.name);
      });
  },
});

export const { getLocationsSuccess, updateLocationsSuccess, removeLocationsSuccess } =
  locationsSlice.actions;

export default locationsSlice.reducer;
