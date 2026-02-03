export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category: string;
  color?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCartMessage: () => string;
  userName: string | null;
  setUserName: (name: string) => void;
}
