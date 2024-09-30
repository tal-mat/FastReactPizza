import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { createOrder } from "../../services/apiRestaurant.js";
import Button from "../../ui/Button.jsx";
import { formatCurrency, isValidPhone } from "../../utilities/helpers.js";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
  togglePriority,
} from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import store from "../../store.js";
import { fetchAddress } from "../user/userSlice.js";

// Component for creating a new order
function CreateOrder() {
  // State to manage whether the order has priority
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  // State management for form submission navigation
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Action data for form errors
  const formErrors = useActionData();
  const dispatch = useDispatch();

  // Cart data for the order
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  // Calculate priority price if applicable
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  // Calculate the total price including priority
  const totalPrice = totalCartPrice + priorityPrice;

  // Handle the change in priority checkbox
  const handlerPriorityChange = (e) => {
    setWithPriority(e.target.checked);
    dispatch(togglePriority(e.target.checked));
  };

  // Render empty cart if there are no items in the cart
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[35px] z-20 sm:top-[3px] md:right-[5px] md:top-[5px]">
              {" "}
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={handlerPriorityChange}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {!isSubmitting
              ? `Order now from ${formatCurrency(totalPrice)}`
              : "Placing order..."}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Action function to handle form submission and create an order
export async function action({ request }) {
  // Parse form data from the request
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Create order object from form data
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  // Validate phone number
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  // Return errors if validation fails
  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create a new order and redirect
  const newOrder = await createOrder(order);

  // Clear the cart after successful order creation
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
