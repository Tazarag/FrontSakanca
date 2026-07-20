import { useApiData } from "./useApiData";
import { TeamMember } from "@/types";

export function useTeamMembers() {
  return useApiData<TeamMember[]>("/team-members");
}