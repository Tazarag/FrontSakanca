import { useApiData } from "./useApiData";
import { Hero } from "@/types";

export function useHero() {
  return useApiData<Hero>("/hero");
}