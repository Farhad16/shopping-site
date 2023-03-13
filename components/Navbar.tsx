import Link from "next/link";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useProductStore } from "../utls/Product.store";

function Navbar() {
  const { state } = useProductStore();
  const { cart } = state;
  const cartQuantity =
    cart?.cartItems?.length &&
    cart?.cartItems?.reduce((acc: any, item: any) => acc + item.quantity, 0);

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
