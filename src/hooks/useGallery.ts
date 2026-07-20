import { useApiData } from "./useApiData";
import { GalleryItem } from "@/types";

export function useGalleryItems() {
  return useApiData<GalleryItem[]>("/gallery-items");
}