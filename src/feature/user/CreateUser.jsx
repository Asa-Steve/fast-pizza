import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateName } from "./userSlice";
import Button from "../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-4 mb-10 rounded-full border border-blue-900 px-2 py-1 text-center ring transition duration-300 focus:ring-blue-700 focus:ring-offset-3"
      />

      {username !== "" && (
        <div>
          <Button onClick={handleSubmit} type={"primary"}>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
