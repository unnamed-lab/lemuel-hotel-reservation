import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hotelService from "./hotelService";

const initialState = {
  hotels: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new hotel
export const createHotel = createAsyncThunk(
  "hotel/new",
  async (hotelData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user._id;
      const companyId = thunkAPI.getState().company.company._id;
      return await hotelService.createHotel(
        hotelData,
        userId,
        companyId,
        token
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user hotels
export const getMyHotel = createAsyncThunk(
  "hotel/getMine",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const companyId = thunkAPI.getState().company._id;
      return await hotelService.getMyHotel(companyId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all hotels
export const getHotels = createAsyncThunk(
  "hotel/getAll",
  async (_, thunkAPI) => {
    try {
      return await hotelService.getAllHotels();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels.push(action.payload);
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels = action.payload;
      })
      .addCase(getMyHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; 
      })
      .addCase(getHotels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels = action.payload;
      })
      .addCase(getHotels.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; 
      });
  },
});

export const { reset } = hotelSlice.actions;
export default hotelSlice.reducer;
