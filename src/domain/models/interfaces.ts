// src/domain/models/interfaces.ts

/****************************************
 ********* Shared Components ************
 ***************************************/

/**
 * Interface for the Image shared component
 */
export interface ImageModel {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/****************************************
 ******** Home Page Components *********
 **************************************/

/**
 * Interface for the SearchInfo
 */
export interface SearchInfoModel {
  productsAmount: number;
}

/**
 * Interface for the ProductList
 */
export interface ProductListModel {
  productsPromise: Promise<ProductListItem[]>;
}

/**
 * Interface for the ProductListItem
 */
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

export interface ProductDetail extends ProductListItem {
  description: string;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: ProductListItem[];
  specs: Record<string, string>;
}

/**
 * Interface for the ProductCard component
 */
export interface ProductCardModel {
  product: ProductListItem;
}

/*****************************************
 ****  Cart Page Interface components ****
 ****************************************/

/**
 * Interface for the CartTitle component.
 * - cartCount: The total number of items currently in the shopping cart.
 */
export interface CartTitleModel {
  cartCount: number;
}

/**
 * Interface for the CartItem component props.
 */
export interface CartItemModel {
  productId: string;
  color: string;
  storage: string;
  imageUrl: string;
  name: string;
  quantity: number;
  price: string;
}

/**
 * Interface for the CartItem component props.
 * Includes: the item data, removal handler and index
 */
export interface CartItemProps {
  item: CartItemModel;
  handleRemoveFromCart: () => void;
  index: number;
}

/**
 * Interface for the CartTotal component props.
 */
export interface CartTotalModel {
  cartTotalPrice: number;
}

/*****************************************
 *****  Buttons Interface components *****
 ****************************************/

/**
 * Interface for the PrimaryButton component props.
 */
export interface PrimaryButtonModel {
  text: string;
  ariaLabel?: string;
}

/**
 * Interface for the LinkButton component props.
 */
export interface LinkButtonModel {
  text: string;
  to: string;
  ariaLabel?: string;
}
