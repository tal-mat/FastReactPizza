const API_URL = "https://react-fast-pizza-api.onrender.com/api";

// Fetches the menu from the API
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // Check if the response is not OK; this handles 400 errors manually
  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

// Fetches a specific order by its ID
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);

  // Check if the response is not OK; throw an error if order not found
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

// Creates a new order in the API
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();

    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

// Updates an existing order by its ID
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
