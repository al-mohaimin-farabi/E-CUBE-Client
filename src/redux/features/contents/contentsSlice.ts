import { createSlice } from '@reduxjs/toolkit';
import { Content } from '@/lib/data';

interface ContentsState {
  allContents: Content[];
}

const initialState: ContentsState = {
  allContents: [],
};

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {},
});

export default contentsSlice.reducer;
