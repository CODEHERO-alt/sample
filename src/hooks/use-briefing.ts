import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useBriefing() {
  return useQuery({
    queryKey: [api.briefing.get.path],
    queryFn: async () => {
      const res = await fetch(api.briefing.get.path);
      if (!res.ok) {
        throw new Error("Failed to fetch daily briefing");
      }
      return api.briefing.get.responses[200].parse(await res.json());
    },
    // Don't refetch too often, news updates slowly
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
