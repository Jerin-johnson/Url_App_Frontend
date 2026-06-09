import { useMutation, useQueryClient } from "@tanstack/react-query";
import { urlService } from "../../api/services/url.service";

export const useCreateUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: urlService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
    },
  });
};
