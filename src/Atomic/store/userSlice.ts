import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

type LoginResponse = {
  username: string;
  password: string;
  token: string;
  isLogin: boolean;
};

type Body = {
  username: string;
  password: string;
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  Body,
  { rejectValue: string }
>("auth/login", async (body, { rejectWithValue, dispatch }) => {
  const response = await fetch(`http://localhost:3030/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return rejectWithValue("Failed to login");
  }
  const data = await response.json(); // Получаем данные из response

  dispatch(setToken(data));
  return data; // Возвращаем данные из ответа
});

type InitialState = {
  user: LoginResponse;
  status: null | "loading" | "resolved" | "rejected";
  error: null | SerializedError;
};

const initialState: InitialState = {
  user: {
    username: "",
    password: "",
    token: "",
    isLogin: false,
  },
  status: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.user.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.user.isLogin = true;
    },
    logout: (state) => {
      state.user.token = "";
      localStorage.removeItem("token");
      state.user.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "resolved";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = initialState.user;
        state.status = "rejected";
        state.error = action.error; // Сохраняем объект ошибки
      });
  },
});

export const { setToken, logout } = userSlice.actions;
export default userSlice.reducer;
