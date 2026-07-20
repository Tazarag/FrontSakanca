import { useApiData } from "./useApiData";
import { Project } from "@/types";

export function useProjects() {
  return useApiData<Project[]>("/projects");
}