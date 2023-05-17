import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GraphQLSchema, getIntrospectionQuery } from 'graphql';
import axios from 'axios';

interface schemaState {
  schema: GraphQLSchema | undefined;
  isLoading: boolean;
  error: string | null;
}

const rickAndMortyApi = 'https://rickandmortyapi.com/graphql';

export const getGraphQLSchema = createAsyncThunk(
  'schema/getGraphQLSchema',
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await axios.post<GraphQLSchema>(rickAndMortyApi, {
        query: getIntrospectionQuery(),
      });

      return response?.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(error);
    }
  }
);

const initialState: schemaState = {
  schema: undefined,
  isLoading: false,
  error: null,
};

const schemaStateSlice = createSlice({
  name: 'schemaState',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGraphQLSchema.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGraphQLSchema.fulfilled, (state, action) => {
        state.schema = action.payload; // TODO insert right type
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getGraphQLSchema.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'unknown error';
        // TODO edit error type
      });
  },
});

export default schemaStateSlice.reducer;
