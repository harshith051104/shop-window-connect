import { useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types/cart";
import { CartContext } from "./cartContextDef";

const CART_STORAGE_KEY = "Nandi-stationery-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item with quantity 1
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartMessage = () => {
    if (items.length === 0) return "";

    const itemsList = items
      .map((item) => `• ${item.name} - Qty: ${item.quantity}`)
      .join("\n");

    return `🛒 *Order from Nandi Stationery*\n\n*Items:*\n${itemsList}\n\n📦 *Total Items:* ${getTotalItems()}\n\n✅ Please confirm availability and total price.\n\n🏪 I will pick up from shop.`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getCartMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
