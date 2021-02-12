const initialState = {
  blogList: [],
  selectedData: null,
  activiyTypes: null,
};

const Blogs = (state = initialState, action) => {
  if (action.type === "BLOG_TABLE_DATA") {
    state.blogList = action.payload;
  }
  if (action.type === "SELECTED_BLOG_DATA") {
    state.selectedData = action.payload;
  }

  if (action.type === "ACTIVITY_TYPES") {
    state.activiyTypes = action.payload;
  }
  return state;
};

export default Blogs;
