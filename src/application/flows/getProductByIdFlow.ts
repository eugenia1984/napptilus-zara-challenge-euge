// src/application/flows/getProductsByIdFlow.ts

import type { ProductDetail } from "../../domain/models/interfaces";
import { fetchApi } from "../fetchApi";

export async function getProductById(id: string): Promise<ProductDetail> {
  return fetchApi<ProductDetail>(`/products/${id}`);
}
