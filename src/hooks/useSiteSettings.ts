import { useApiData } from "./useApiData";
import { SiteSetting } from "@/types";

export function useSiteSettings() {
  return useApiData<SiteSetting>("/settings");
}