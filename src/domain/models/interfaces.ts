// src/domain/models/interfaces.ts

import type { Dispatch, RefObject, SetStateAction } from "react";

/****************************************
 ********* Shared Components ************
 ***************************************/

export interface ImageModel {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/****************************************
 ******** Home Page Components *********
 **************************************/

export interface SearchFormModel {
  searchQuery: string;
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export interface SearchInfoModel {
  productsAmount: number;
}

export interface ProductListModel {
  productsPromise: Promise<ProductListItem[]>;
}

export interface ProductListItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface ProductDetailContentModel {
   productPromise: Promise<ProductDetail>
  selectedColor: ColorOption | null
  // eslint-disable-next-line no-unused-vars
  setSelectedColor: (color: ColorOption | null) => void
  selectedStorage: StorageOption | null
  // eslint-disable-next-line no-unused-vars
  setSelectedStorage: (storage: StorageOption | null) => void
}

export interface ProductDetail extends ProductListItem {
  description: string;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: ProductListItem[];
  specs: Record<string, string>;
}

export interface ProductCardModel {
  product: ProductListItem;
}

/*****************************************
 ********* Product Page ****************** 
 ****************************************/
export interface ProductImageModel {
  srcImage: string;
  altImage: string;
}

export interface ProductHeaderModel {
  productName: string;
  productPrice: number;
}

export interface SimilarProductsListModel {
  product: ProductDetail;
  similarGridRef: RefObject<HTMLDivElement | null>;
  thumbRef: RefObject<HTMLDivElement | null>;
}

export interface ProductOptionsModel {
  product: ProductDetail
  selectedStorage: StorageOption | null
  setSelectedStorage: Dispatch<SetStateAction<StorageOption | null>>
  selectedColor: ColorOption | null
  setSelectedColor: Dispatch<SetStateAction<ColorOption | null>>
}
/*****************************************
 ****  Cart Page Interface components ****
 ****************************************/

export interface CartTitleModel {
  cartCount: number;
}

export interface CartItemModel {
  productId: string;
  color: string;
  storage: string;
  imageUrl: string;
  name: string;
  quantity: number;
  price: number;
  brand: string;
}

export interface CartItemProps {
  item: CartItemModel;
  handleRemoveFromCart: () => void;
  index: number;
}

export interface CartTotalModel {
  cartTotalPrice: number;
}

/*******************************************
 ******  Buttons Interface components ******
 ******************************************/

export interface PrimaryButtonModel {
  text: string;
  ariaLabel?: string;
}

export interface LinkButtonModel {
  text: string;
  to: string;
  ariaLabel?: string;
  className?: string;
}
