import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GraphQLSchema, getIntrospectionQuery } from 'graphql';
import axios from 'axios';

interface schemaState {
  schema: GraphQLSchema | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

const rickAndMortyApi = 'https://rickandmortyapi.com/graphql';

export const getGraphQLSchema = createAsyncThunk<GraphQLSchema, void, { rejectValue: Error }>(
  'schema/getGraphQLSchema',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<GraphQLSchema>(rickAndMortyApi, {
        query: getIntrospectionQuery(),
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

const initialState: schemaState = {
  schema: undefined,
  isLoading: false,
  error: undefined,
};

const schemaStateSlice = createSlice({
  name: 'schemaState',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGraphQLSchema.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getGraphQLSchema.fulfilled, (state, action) => {
        // todo Schema type
        state.schema = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getGraphQLSchema.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default schemaStateSlice.reducer;
