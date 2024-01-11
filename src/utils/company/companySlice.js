import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";

const brand = JSON.parse(localStorage.getItem("company"));

const initialState = {
  company: brand ? brand : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new company
export const createCompany = createAsyncThunk(
  "business/new",
  async (companyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await companyService.createCompany(companyData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get coompany
export const getCompany = createAsyncThunk(
  "business/mine",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await companyService.getCompany(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get coompany
export const getCompanies = createAsyncThunk(
  "business/all",
  async (_, thunkAPI) => {
    try {
      return await companyService.getAllCompanies();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove company from storage
export const removeCompany = createAsyncThunk("business/clear", async () => {
  await companyService.removeCompany();
});

export const companySlice = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.company = null;
      })
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.company = null;
      })
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.company = null;
      })
      .addCase(removeCompany.fulfilled, (state) => {
        state.company = null;
      });
  },
});

export const { reset } = companySlice.actions;
export default companySlice.reducer;
