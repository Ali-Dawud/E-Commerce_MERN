import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed to fetch user cart. Please try again");
      }
      const cart = await response.json();
      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity, unitPrice, }: { product: any; quantity: number; unitPrice: number; }) => ({
          productId: product._id, 
          image: product.image, 
          title: product.title, 
          quantity, unitPrice,
        })
      );
      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };
    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}cart/items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart.");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse to cart data.");
      }

      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity, unitPrice, }: { product: any; quantity: number; unitPrice: number; }) => ({
          productId: product._id,
          image: product.image,
          title: product.title,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemInCart = async (productId: string, quantity: number) => {
    try {
      const response = await fetch("http://localhost:3001/cart/items", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        setError("Failed to update to cart.");
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse to cart data.");
      }

      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity, unitPrice, }: { product: any; quantity: number; unitPrice: number; }) => ({
          productId: product._id,
          image: product.image,
          title: product.title,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItemInCart = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/cart/items/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Failed to Delete to cart.");
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse to cart data.");
      }

      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity, unitPrice, }: { product: any; quantity: number; unitPrice: number; }) => ({
          productId: product._id,
          image: product.image,
          title: product.title,
          quantity,
          unitPrice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async ()=>{
        try {
      const response = await fetch(`http://localhost:3001/cart/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to Delete to cart.");
      }

      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse to cart data.");
      }
      
      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        deleteItemInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
