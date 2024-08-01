import { createEffect, createStore } from "effector";
import { apiRequest } from "../libs/fetcher";
import { ApiFile } from "./file";

type Project = { id: string; name: string; photos: ApiFile[] };

export const createProjectFx = createEffect(async (data: { name: string; description: string }) => {
  const res = await apiRequest<Project>({
    method: "post",
    url: "works",
    data,
  });

  return res;
});

export const putProjectFx = createEffect(async (data: Pick<Project, "id" | "name">) => {
  const res = await apiRequest({
    method: "put",
    url: `works/${data.id}`,
    data,
  });

  return res;
});

export const deleteProjectFx = createEffect(async (args: { id: string }) => {
  const res = await apiRequest<Project>({
    method: "delete",
    url: `works/${args.id}`,
  });

  return res;
});

export const getProjectsFx = createEffect(async () => {
  const res = await apiRequest({
    method: "get",
    url: "works",
  });

  return res;
});

export const uploadFileFx = createEffect(async ({ files, relationId }: { relationId: string; files: File[] }) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append(`files`, files[i]);
  }

  formData.append(`relationId`, relationId);
  formData.append(`type`, "Work_photos");

  const res = await apiRequest<ApiFile[]>({
    url: "files",
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res;
});

export const deleteFileFx = createEffect(async (id: string) => {
  const res = await apiRequest<ApiFile>({
    method: "delete",
    url: "files",
    params: { id },
  });

  return res;
});

export const $projects = createStore<Array<Project>>([])
  .on(getProjectsFx.doneData, (_, payload: any) => payload)
  .on(createProjectFx.doneData, (state, payload) => [payload, ...state])
  .on(deleteProjectFx.doneData, (state, payload) => state.filter((s) => s.id !== payload.id))
  .on(deleteFileFx.doneData, (state, payload) =>
    state.map((project) => {
      if (project.id === payload.relationId) {
        return { ...project, photos: project.photos.filter((s) => s.id !== payload.id) };
      } else {
        return project;
      }
    })
  )
  .on(uploadFileFx.doneData, (state, payload) =>
    state.map((project) => {
      if (project.id === payload[0].relationId) {
        return { ...project, photos: [...project.photos, ...payload] };
      } else {
        return project;
      }
    })
  );

