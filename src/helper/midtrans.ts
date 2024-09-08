import fetch from "node-fetch";
export const updateStatusInMidtrans = async (url: string): Promise<void> => {
  const data = await fetch(url, {
    method: "POST",
    headers: { accept: "application/json" },
  });

  console.log(data);
};
