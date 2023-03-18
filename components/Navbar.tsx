import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useProductStore } from "../utls/Product.store";

function Navbar() {
  const { state } = useProductStore();
  const { cart } = state;
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (cart?.cartItems?.length) {
      const qn = cart?.cartItems?.reduce(
        (acc: any, item: any) => acc + item.quantity,
        0
      );
      setCartQuantity(qn);
    }
  }, [cart?.cartItems]);

  return (
    <nav className="flex h-12 justify-between shadow-md items-center px-12">
      <Link href="/">
        <span className="text-lg font-bold font-[Pasifico]">Easy Shop</span>
      </Link>
      <div className="flex gap-3">
        <Link href="/cart">
          <Badge badgeContent={cartQuantity} color="success">
            <ShoppingCartIcon />
          </Badge>
        </Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
