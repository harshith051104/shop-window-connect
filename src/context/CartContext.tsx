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

  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((prevItems) => {
      const itemKey = `${newItem.id}-${newItem.color || 'default'}`;
      const existingItem = prevItems.find(
        (item) => item.id === newItem.id && item.color === newItem.color
      );
      
      if (existingItem) {
        // Increase quantity if item with same color already exists
        return prevItems.map((item) =>
          item.id === newItem.id && item.color === newItem.color
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      }
      // Add new item with specified quantity or default to 1
      return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }];
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
      .map((item) => {
        const colorText = item.color ? ` (${item.color})` : '';
        return `• ${item.name}${colorText} - Qty: ${item.quantity}`;
      })
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
