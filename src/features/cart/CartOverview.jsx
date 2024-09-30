import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice.js";
import { formatCurrency } from "../../utilities/helpers.js";

// Defines the CartOverview component to display a summary of the cart
function CartOverview() {
  // Gets the total quantity and price of items in the cart
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // Determines if priority pricing is applied and calculates total price
  const withPriority = useSelector((state) => state.cart.priority);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  // Returns null if the cart is empty
  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        {/* Displays the total price formatted as currency */}
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      {/* Link to open the full cart view */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
