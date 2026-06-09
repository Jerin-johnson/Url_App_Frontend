import { useQuery } from "@tanstack/react-query";
import { urlService } from "../../api/services/url.service";

export const useUrls = () => {
  return useQuery({
    queryKey: ["urls"],
    queryFn: urlService.getMyUrls,
  });
};
