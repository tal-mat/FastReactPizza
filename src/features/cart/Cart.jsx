import { useDispatch, useSelector } from "react-redux";

import LinkButton from "../../ui/LinkButton.jsx";
import Button from "../../ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import { clearCart, getCart } from "./cartSlice.js";
import EmptyCart from "./EmptyCart.jsx";

// Defines the Cart component for displaying the user's cart items
function Cart() {
  // Retrieves the username and the current cart items from the Redux store
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  // Renders an EmptyCart component if the cart is empty
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {/* Maps through the cart items and renders each as a CartItem component */}
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        {/* Button for navigating to the new order page */}
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        {/* Button for clearing the cart, dispatching the clearCart action */}
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
