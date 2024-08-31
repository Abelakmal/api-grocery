export const PORT: number =
  (process.env.API_PORT as number | undefined) || 3000;
export const baseURL = process.env.API_URL || "http://localhost:3000/api";

export const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

export const imgUploadPath = process.env.IMAGE_UPLOAD_PATH || "src/images";

export const elasticsearchConfig = {
  node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
};
