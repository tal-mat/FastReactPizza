import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../ui/Button.jsx";
import { isValidName } from "../../utilities/helpers.js";
import { updateName } from "./userSlice.js";

// Renders a form to create a new user by entering their username.
function CreateUser() {
  const [username, setUsername] = useState("");
  const [isValidUserName, setIsValidUserName] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handles form submission, validating the username and updating the state.
  function handleSubmit(e) {
    e.preventDefault();

    const valid = isValidName(username);
    setIsValidUserName(valid);
    if (!valid) return;

    dispatch(updateName(username));
    navigate("/menu");
  }

  // Resets validation state to clear error messages and provides real-time feedback on user input.
  const handleChange = (e) => {
    setUsername(e.target.value);
    setIsValidUserName(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={handleChange}
        className="input mb-8 w-72"
      />
      {!isValidUserName && (
        <p className="mx-auto -mt-5 mb-4 w-1/3 rounded-md bg-red-100 p-2 text-xs text-red-700">
          Please write a valid name
        </p>
      )}

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
