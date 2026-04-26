// src/application/flows/getProductsFlow.ts

import { ApiConstants } from "../../domain/constants/api";
import type { ProductListItem } from "../../domain/models/interfaces";
import { fetchApi } from "../fetchApi";

export async function getProducts(
  search?: string,
  limit?: number,
  offset?: number,
): Promise<ProductListItem[]> {
  const params = new URLSearchParams();

  if (search) params.append(`${ApiConstants?.SEARCH_PARAM}`, search);
  if (limit !== undefined)
    params.append(`${ApiConstants?.LIMIT_PARAM}`, limit.toString());
  if (offset !== undefined)
    params.append(`${ApiConstants?.OFFSET_PARAM}`, offset.toString());

  const queryString = params.toString() ? `?${params.toString()}` : "";
  return fetchApi<ProductListItem[]>(`/products${queryString}`);
}
