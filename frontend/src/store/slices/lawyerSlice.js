import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { lawyerAuthService } from '../../services/api/lawyerAuth';
import { lawyerProfileService } from '../../services/api/lawyerProfile';

export const loginLawyer = createAsyncThunk(
  'lawyer/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await lawyerAuthService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'lawyer/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await lawyerProfileService.updateProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const lawyerSlice = createSlice({
  name: 'lawyer',
  initialState: {
    profile: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
      lawyerAuthService.logout();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginLawyer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginLawyer.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.lawyer;
        state.isAuthenticated = true;
      })
      .addCase(loginLawyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  }
});

export const { logout } = lawyerSlice.actions;
export default lawyerSlice.reducer; 