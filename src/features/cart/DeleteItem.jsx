import { useDispatch } from "react-redux";

import Button from "../../ui/Button.jsx";
import { deleteItem } from "./cartSlice.js";

// Component to render a button for deleting an item from the cart
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
