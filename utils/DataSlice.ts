import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import orders from "razorpay/dist/types/orders";

export interface NutritionInformation {
  id: string;
  nutrition: string;
  quantity?: string;
}
export interface keyBenefits {
  id: string;
  topic: string;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrls: string[];
  nutritionInformation: NutritionInformation[];
  keyBenefits: keyBenefits[];
  productHighlights: string[];
  energy: string;
  price: number;
  discountPrice: number;
  stock: number;
  weight?: string; // Optional field
  flavor?: string; // Optional field
}

export interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
export interface Cart {
  id: string;
  items: CartItem[];
}
export interface CartItem {
  id: string;
  price: number;
  product: Product;
  quantity: number; // quantity of this product in the cart
}

export interface Address {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderResponse = {
  success: boolean;
  orders: Order[];
};

export type Order = {
  id: string;
  status: string;
  addressId: string;
  address: Address | null;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product | null;
};

const initialState = {
  groupedByCategory: {},
  products: [] as Product[],
  userInfo: {} as UserInfo,
  cart: {} as Cart,
  isFetch: false,
  address: [] as Address[],
  selectedAddressId: "" as string,
  orders: [] as Order[],
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setGroupedByCategory: (
      state,
      action: PayloadAction<Record<string, Product[]>>
    ) => {
      state.groupedByCategory = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    setIsFetch: (state, action: PayloadAction<boolean>) => {
      state.isFetch = action.payload;
    },
    setAddress: (state, action: PayloadAction<Address[]>) => {
      state.address = action.payload;
    },
    setSelectedAddressId: (state, action: PayloadAction<string>) => {
      state.selectedAddressId = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});
export const {
  setGroupedByCategory,
  setProducts,
  setUserInfo,
  setCart,
  setIsFetch,
  setAddress,
  setSelectedAddressId,
  setOrders,
} = dataSlice.actions;
export default dataSlice.reducer;
