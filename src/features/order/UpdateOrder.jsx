import { useFetcher } from "react-router-dom";

import Button from "../../ui/Button.jsx";
import { updateOrder } from "../../services/apiRestaurant.js";

// Renders a form to update the order status to priority.
function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// Handles the action of updating the order to priority in the backend.
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
