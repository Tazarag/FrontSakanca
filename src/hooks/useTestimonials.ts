import { useApiData } from "./useApiData";
import { Testimonial } from "@/types";

export function useTestimonials() {
  return useApiData<Testimonial[]>("/testimonials");
}