// src/application/fetchApi

import { ApiConstants } from "../domain/constants/api";

function getApiConfig() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error(`${ApiConstants?.MISSING_API_URL_OR_KEY}`);
  }

  return { apiUrl, apiKey };
}

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const { apiUrl, apiKey } = getApiConfig();

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  };

  const response = await fetch(`${apiUrl}${endpoint}`, { headers });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
