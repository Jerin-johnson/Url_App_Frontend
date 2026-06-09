export interface CreateUrlDto {
  originalUrl: string;
}

export interface ShortUrlResponse {
  shortUrl: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
}

export interface Url {
  id: string;
  shortCode: string;
  originalUrl: string;
  userId: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}
