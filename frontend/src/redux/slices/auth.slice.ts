import { LoginResponse } from "@/services/AuthService";
import { UserProfile } from "@/types/api/enums/UserProfile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  access_token?: string;
  user?: { username: string, profile: UserProfile }
}

const initialState: AuthState = { access_token: undefined }

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      console.log(action)
      state.access_token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.access_token = undefined;
      state.user = undefined;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
