export const PORT: number =
  (process.env.API_PORT as number | undefined) || 3000;
export const baseURL = process.env.API_URL!;
