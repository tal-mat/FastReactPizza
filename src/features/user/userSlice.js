import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress } from "../../services/apiGeocoding.js";

// Returns a Promise that resolves with the user's geolocation
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Fetches user's geolocation and reverse-geocodes it to return position and address data as an async action
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address,
    // so we can display it in the order form, allowing the user to correct it if wrong
    const addressObj = await getAddress(position);

    const locality = addressObj?.locality;
    const city = addressObj?.city;
    const postcode = addressObj?.postcode;
    const countryName = addressObj?.countryName;

    // Construct the address string to avoid repetition
    const address =
      locality && city && locality !== city
        ? `${locality}, ${city} ${postcode}, ${countryName}`
        : `${city} ${postcode}, ${countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // Payload of the FULFILLED state
    return { position, address };
  },
);

// Initial state with user information
const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

// Slice to manage user-related state with Redux Toolkit
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Updates the username in the state
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      // Handles pending state of address fetching
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      // Handles fulfilled state of address fetching
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      // Handles rejected state of address fetching
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field.";
      }),
});

// Exports the action to update the username
export const { updateName } = userSlice.actions;

// Exports the reducer for the user slice
export default userSlice.reducer;
