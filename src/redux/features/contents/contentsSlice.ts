import { createSlice } from '@reduxjs/toolkit';

export interface Content {
  id: number;
  title: string;
  image: string;
  platform: string;
  video: string;
}

const initialContents: Content[] = [
  {
    id: 1,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 1',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 2,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 2',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 3,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 3',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 4,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 4',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 5,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 5',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 6,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 5',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
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
