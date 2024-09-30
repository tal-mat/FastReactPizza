import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";

// Component to display when a route is not found or an error occurs
function NotFound() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>{" "}
      <LinkButton to="-1">&larr; Go back</LinkButton>{" "}
    </div>
  );
}

export default NotFound;
