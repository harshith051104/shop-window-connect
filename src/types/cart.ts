export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getCartMessage: () => string;
}
