import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading: "Loading course data...",
      success: "Courses loaded successfully",
      error: "Failed to get the courses",
    });

    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const deleteCourses = createAsyncThunk("/course/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`/courses/${id}`);
    toast.promise(response, {
      loading: "Deleting course ...",
      success: "Courses deleted successfully",
      error: "Failed to delete the courses",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title)
    formData.append("description", data?.description)
    formData.append("category", data?.category)
    formData.append("createdBy", data?.createdBy)
    formData.append("thumbnail", data?.thumbnail)

    const response = axiosInstance.post("/courses", formData);
    toast.promise(response, {
      loading : "Creating new course",
      success: "Course created successfully",
      error: "Failed to create course"
    });

    return (await response).data

  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

export const updateCourse = createAsyncThunk("/course/update", async (data) => {
  try {
    const response = axiosInstance.put(`/courses/${data._id}`, data);
    toast.promise(response, {
      loading: "Updating course ...",
      success: "Course updated successfully",
      error: "Failed to update the course",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload)
        state.courseData = [...action.payload];
      }
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("upadte id", action.payload);
        const index = state.courseData.findIndex(course => course._id === action.payload._id);
        if (index !== -1) {
          state.courseData[index] = action.payload;
        }
      }
    });
  },
});

export default courseSlice.reducer;
