import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../utils/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// export async function fetchAddress() {
// 1) We get the user's geolocation position
// const positionObj = await getPosition();
// const position = {
//   latitude: positionObj.coords.latitude,
//   longitude: positionObj.coords.longitude,
// };

// // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
// const addressObj = await getAddress(position);
// const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

// // 3) Then we return an object with the data that we are interested in
// return { position, address };
// }

const initialState = {
  username: "",
  address: "",
  position: {},
  status: "idle",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload.address;
        state.position = { ...action.payload.position };
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "idle";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      });
  },
});

export const fetchAddress = createAsyncThunk(
  "user/fecthAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
