import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "api";
import { Section } from "./types";

export const sectionsApi = createApi({
  reducerPath: "sections/api",
  baseQuery,
  endpoints: (build) => ({
    getSections: build.query<Section[], void>({
      query: () => ({ url: "/api/section" }),
    }),
    getSection: build.query<Section | null, string>({
      query: (id) => ({ url: `/api/section/${id}` }),
    }),
    getSectionsByData: build.query<Section[], string>({
      query: (body) => ({ url: "/api/section/by-data", method: "POST", body }), // change
    }),
    createSection: build.mutation<string, Omit<Section, "id">>({
      query: (body) => ({ url: "/api/section", method: "POST", body }),
    }),
    updateSection: build.mutation<string, Section>({
      query: (body) => ({ url: "/api/section", method: "PUT", body }),
    }),
    deleteSection: build.mutation<string, Pick<Section, "id">>({
      query: (body) => ({ url: "/api/section", method: "DELETE", body }),
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetSectionQuery,
  useGetSectionsByDataQuery,
  useLazyGetSectionsByDataQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionsApi;

export default sectionsApi;
