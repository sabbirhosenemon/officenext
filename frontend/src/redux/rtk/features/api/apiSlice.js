import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [
    "Users",
    "User",
    "TaskTimes",
    "TaskStatusAll",
    "TaskStatusById",
    "TaskStatus",
    "TaskPriority",
    "TaskPriorities",
    "TaskDependency",
    "ProjectTeams",
    "ProjectTeam",
    "ProjectTeamsById",
    "ProjectTask",
    "ProjectAll",
    "Projects",
    "Project",
    "Milestones",
    "MilestoneById",
    "Milestone",
    "AssignedTasks",
    "Designations",
    "Designation",
    "DesignationHistories",
    "DesignationHistory",
    "DesignationByEmployee",
    "Departments",
    "Department",
    "setting",
    "Roles",
    "Role",
    "ConfigEmail",
    "Folders",
    "Folder",
    "Files",
    "File"
  ],
  endpoints: (builder) => ({}),
});
