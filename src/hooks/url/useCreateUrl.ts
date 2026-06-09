import { useMutation } from "@tanstack/react-query";
import { urlService } from "../../api/services/url.service";

export const useCreateUrl = () => {
  return useMutation({
    mutationFn: urlService.create,
  });
};
