import { useSelector } from "react-redux";

import { formatCurrency } from "../../utilities/helpers.js";
import DeleteItem from "./DeleteItem.jsx";
import UpdateItemQuantity from "./UpdateItemQuantity.jsx";
import { getCurrentQuantityById } from "./cartSlice.js";

// Defines the CartItem component for displaying individual items in the cart
function CartItem({ item }) {
  // Destructures pizza item
  const { pizzaId, name, quantity, totalPrice } = item;

  // Retrieves the current quantity of the pizza from the Redux store
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        {/* Displays the total price of the item formatted as currency */}
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        {/* Component for updating the quantity of the item in the cart */}
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        {/* Component for deleting the item from the cart */}
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
