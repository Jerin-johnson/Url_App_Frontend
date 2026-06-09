// features/url/services/url.service.ts

import type {
  CreateUrlDto,
  ShortUrlResponse,
  Url,
} from "../../types/url.types";
import { api } from "../axios";

export const urlService = {
  create: async (data: CreateUrlDto): Promise<ShortUrlResponse> => {
    const response = await api.post("/shorten", data);

    return response.data;
  },

  getMyUrls: async (): Promise<Url[]> => {
    const response = await api.get("/my-urls");

    console.log("Fetched URLs:", response.data); // Debug log
    return response.data;
  },
};
