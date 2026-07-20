import { useApiData } from "./useApiData";
import { DetailedService } from "@/types";

export function useDetailedServices() {
  return useApiData<DetailedService[]>("/detailed-services");
}
