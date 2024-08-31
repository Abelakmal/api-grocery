export const PORT: number =
  (process.env.API_PORT as number | undefined) || 3000;
export const baseURL = process.env.API_URL!;

export const clientUrl = process.env.CLIENT_URL!;

export const imgUploadPath = process.env.IMAGE_UPLOAD_PATH!;

export const elasticsearchConfig = {
  node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
};
