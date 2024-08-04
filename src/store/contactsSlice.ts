import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IContact } from "../types/IContact";
import { ICreateContactPayload } from "../types/ICreateContactPayload";

const API_URL = "https://live.devnimble.com/api/v1/";

interface ContactsState {
  contacts: IContact[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ContactsState = {
  contacts: [],
  status: "idle",
  error: null,
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get(`${API_URL}contacts`, {
      headers: { Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn" },
      params: { sort: "created:desc" },
    });
    return response.data;
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact: ICreateContactPayload) => {
    const response = await axios.post(`${API_URL}contact`, contact, {
      headers: { Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn" },
    });
    return response.data;
  },
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id: string) => {
    await axios.delete(`${API_URL}contact/${id}`, {
      headers: { Authorization: "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn" },
    });
    return id;
  },
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<IContact[]>) => {
          state.contacts = action.payload;
          state.status = "succeeded";
        },
      )
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<IContact>) => {
          state.contacts.push(action.payload);
        },
      )
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.contacts = state.contacts.filter(
            (contact) => contact.id !== action.payload,
          );
        },
      )
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
