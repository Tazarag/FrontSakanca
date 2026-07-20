import { useApiData } from "./useApiData";
import { Service } from "@/types";

export function useServices() {
  return useApiData<Service[]>("/services");
}