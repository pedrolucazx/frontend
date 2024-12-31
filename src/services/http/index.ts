import useAxios from "@/hooks/useAxios";

export const api = useAxios(import.meta.env.VITE_API_URL || "");
