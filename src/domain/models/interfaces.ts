// src/domain/models/interfaces.ts

import type { Dispatch, RefObject, SetStateAction } from "react";

/****************************************
 ********* Shared Components ************
 ***************************************/

/**
 * Interface for PrimaryButton component props.
 */
export interface PrimaryButtonProps {
  text: string;
  ariaLabel?: string;
}

/**
 * Interface for LinkButton component props.
 */
export interface LinkButtonProps {
  text: string;
  to: string;
  ariaLabel?: string;
  className?: string;
}

/**
 * Interface for Image component props.
 */
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Interface for Loader component props.
 */
export interface LoaderProps {
  /** The message to display while loading */
  message: string;
}

/**
 * Interface for ErrorMessage component props.
 */
export interface ErrorMessageProps {
  /** The error message text to be displayed to the user */
  message: string;
}
/****************************************
 ******** Home Page Components *********
 **************************************/

/**
 * Interface for SearchForm component props.
 */
export interface SearchFormProps {
  searchQuery: string;
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

/**
 * Interface for SearchInfo component props.
 */
export interface SearchInfoProps {
  productsAmount: number;
}

/**
 * Interface for ProductList component props.
 */
export interface ProductListProps {
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
  productPromise: Promise<ProductDetail>;
  selectedColor: ColorOption | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedColor: (color: ColorOption | null) => void;
  selectedStorage: StorageOption | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedStorage: (storage: StorageOption | null) => void;
}

export interface ProductDetail extends ProductListItem {
  description: string;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: ProductListItem[];
  specs: Record<string, string>;
}

/**
 * Interface for ProductCard component props.
 */
export interface ProductCardProps {
  product: ProductListItem;
}

/*****************************************
 ********* Product Page ******************
 ****************************************/

/**
 * Interface for ProductImage component props.
 */
export interface ProductImageProps {
  srcImage: string;
  altImage: string;
}

/**
 * Interface for ProductHeader component props.
 */
export interface ProductHeaderProps {
  productName: string;
  productPrice: number;
}

/**
 * Interface for SimilarProductsList component props.
 */
export interface SimilarProductsListProps {
  product: ProductDetail;
  similarGridRef: RefObject<HTMLDivElement | null>;
  thumbRef: RefObject<HTMLDivElement | null>;
}

export interface ProductOptionsModel {
  product: ProductDetail;
  selectedStorage: StorageOption | null;
  setSelectedStorage: Dispatch<SetStateAction<StorageOption | null>>;
  selectedColor: ColorOption | null;
  setSelectedColor: Dispatch<SetStateAction<ColorOption | null>>;
}
/*****************************************
 ****  Cart Page Interface components ****
 ****************************************/

/**
 * Interface for CartTitle component props.
 */
export interface CartTitleProps {
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

/**
 * Interface for CartItem component props.
 */
export interface CartItemProps {
  item: CartItemModel;
  // eslint-disable-next-line no-unused-vars
  handleRemoveFromCart: (productId: string, color: string, storage: string) => void;
  index: number;
}

/**
 * Interface for CartTotal component props.
 */
export interface CartTotalProps {
  cartTotalPrice: number;
}

