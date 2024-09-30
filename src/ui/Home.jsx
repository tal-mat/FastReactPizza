import { useSelector } from "react-redux";

import CreateUser from "../features/user/CreateUser.jsx";
import Button from "./Button.jsx";

// Home component displaying a welcome message and either user creation or navigation
function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? ( // Check if the username is empty
        <CreateUser /> // Render the CreateUser component if no username is present
      ) : (
        <Button to="/menu" type="primary">
          {" "}
          {/* Render a button to continue ordering if username exists */}
          Continue ordering, {username}{" "}
        </Button>
      )}
    </div>
  );
}

export default Home;
