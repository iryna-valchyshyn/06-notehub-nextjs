import axios, { type AxiosResponse } from "axios";
import type { CreateNoteData, Note } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteApi = axios.create({
  baseURL: API_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page,
  perPage,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await noteApi.get("/notes", {
    params: { page, perPage, ...(search.trim() ? { search: search.trim() } : {}) },
  });
  return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response: AxiosResponse<Note> = await noteApi.post("/notes", data);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await noteApi.delete(`/notes/${id}`);
  return response.data;
}


export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await noteApi.get(`/notes/${id}`);
  return response.data;
}
