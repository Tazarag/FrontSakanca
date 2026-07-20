import { useApiData } from "./useApiData";
import { About } from "@/types";

export function useAbout() {
  return useApiData<About>("/about");
}