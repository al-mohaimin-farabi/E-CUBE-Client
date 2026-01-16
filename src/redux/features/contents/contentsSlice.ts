import { createSlice } from '@reduxjs/toolkit';

export interface Content {
  id: number;
  title: string;
  image: string;
  platform: string;
}

const initialContents: Content[] = [
  {
    id: 1,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 1',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
  },
  {
    id: 2,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 2',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
  },
  {
    id: 3,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 3',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
  },
  {
    id: 4,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 4',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
  },
  {
    id: 5,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 5',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
  },
  {
    id: 6,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 5',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
  },
];

interface ContentsState {
  allContents: Content[];
}

const initialState: ContentsState = {
  allContents: initialContents,
};

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {},
});

export default contentsSlice.reducer;
