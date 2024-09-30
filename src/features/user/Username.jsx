import { useSelector } from "react-redux";

// Displays the username of the currently logged-in user if available.
function Username() {
  const user = useSelector((state) => state.user);
  const username = user?.username;

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
