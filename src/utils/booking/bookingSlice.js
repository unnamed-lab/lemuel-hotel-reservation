import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new order
export const createOrder = createAsyncThunk(
  "booking/new",
  async (pageId, orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.createOrder(orderData, token, pageId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Find order
export const findOrder = createAsyncThunk(
  "booking/find",
  async (pageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getOrder(token, pageId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Find my orders
export const findMyOrders = createAsyncThunk(
  "booking/find",
  async (pageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getMyOrders(token, pageId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Approve order
export const approveOrder = createAsyncThunk(
  "booking/find",
  async (pageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.approveOrder(token, pageId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Decline order
export const rejectOrder = createAsyncThunk(
  "booking/find",
  async (pageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.rejectOrder(token, pageId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "booking/find",
  async (pageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.deleteOrder(token, pageId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.orders = [];
      })
      .addCase(findOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(findOrder.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.orders = [];
      })
      .addCase(findMyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(findMyOrders.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.orders = [];
      })
      .addCase(approveOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(approveOrder.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.orders = [];
      })
      .addCase(rejectOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(rejectOrder.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.orders = [];
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        state.message = action.payload;
        state.orders = [];
      });
  },
});

export const { resey } = bookingSlice.actions;
export default bookingSlice.reducer;
