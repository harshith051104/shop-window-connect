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

  const [userName, setUserName] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("Nandi-stationery-user-name");
    }
    return null;
  });

  useEffect(() => {
    if (userName) {
      localStorage.setItem("Nandi-stationery-user-name", userName);
    }
  }, [userName]);

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

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      // Remove non-numeric chars except period for potential decimals
      // Assuming format like "₹50", "Rs. 50", "50/-"
      const priceStr = item.price.replace(/[^\d.]/g, '');
      const price = parseFloat(priceStr) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartMessage = () => {
    if (items.length === 0) return "";

    const userHeader = userName ? `Order from ${userName}` : "Order from Nandi Stationery";

    const itemsList = items
      .map((item) => {
        const colorText = item.color ? ` (${item.color})` : '';
        return `• ${item.name}${colorText} - Qty: ${item.quantity}`;
      })
      .join("\n");

    const totalPrice = getTotalPrice();
    const formattedTotal = `₹${totalPrice}`; // Assuming INR based on context

    return `\uD83D\uDED2 *${userHeader}*\n\n*Items:*\n${itemsList}\n\n\uD83D\uDCE6 *Total Items:* ${getTotalItems()}\n\uD83D\uDCB0 *Total Price:* ${formattedTotal}\n\n\u2705 Please confirm availability.\n\n\uD83C\uDFEA I will pick up from shop.`;
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
        getTotalPrice,
        getCartMessage,
        userName,
        setUserName
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
