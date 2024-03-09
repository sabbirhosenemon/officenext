import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const fileManagerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFolders: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `folder?${query}`,
        }
      },
      providesTags: ["Folders"],
    }),

    getFolder: builder.query({
      query: (id) => ({
        url: `folder/${id}`, 
      }),
      providesTags: ["Folder"],
    }),

    getFolderDirectory: builder.query({
      query: (id) => ({
        url: `folder/directory/${id}`, 
      }),
      providesTags: ["Folder"],
    }),

    addFolder: builder.mutation({
      query: (values) => ({
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `folder?parentId=${values.parentFolderId ? values.parentFolderId: ""}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Folder added successfully","success");
        } catch (err) {
          toastHandler(err.error.data.error ||"Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Folders"],
    }),
    
    updateFolder: builder.mutation({
			query: ({ id, values }) => ({
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `folder/${id}`,
				body: values,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					toastHandler("Folder updated successfully","success");
				} catch (err) {
					toastHandler("Something went wrong, Please try again", "warning");
				}
			},
			invalidatesTags: ["Folders", "Folder"],
		}),

    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `folder/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted Folder successful","success");
        } catch (err) {
          toastHandler(err.error.data.error ||"Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Folders"],
    }),

    getFileByFolderId: builder.query({
        query: (id) => ({
          url: `file/byFolderId/${id}`, 
        }),
        providesTags: ["Files"],
      }),

      getFile: builder.query({
        query: () => ({
          url: `file/home`, 
        }),
        providesTags: ["Files"],
      }),

      addFile: builder.mutation({
        query: (formData) => ({
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          url: `file`,
          body: formData,
        }),
  
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            toastHandler("File added successfully","success");
          } catch (err) {
            toastHandler(err.error.data.error ||"Something went wrong, Please try again", "warning");
          }
        },
        invalidatesTags: ["Folders"],
      }),

      deleteFile: builder.mutation({
        query: (id) => ({
          url: `file/${id}`,
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          }
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            toastHandler("Deleted File successful","success");
          } catch (err) {
            toastHandler(err.error.data.error ||"Something went wrong, Please try again","warning");
          }
        },
        invalidatesTags: ["Files"],
      }),

  }),
});

export const {
  useGetFolderQuery,
  useGetFoldersQuery,
  useGetFolderDirectoryQuery,
  useGetFileByFolderIdQuery,
  useGetFileQuery,
  useAddFolderMutation,
  useAddFileMutation,
  useDeleteFileMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation
} = fileManagerApi;
