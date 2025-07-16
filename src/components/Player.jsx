import { useState } from "react";

export default function Player({ tempName, symbol, isActive, nameHandler }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(tempName);

  function editHandler() {
    setEdit((editing) => !editing);

    if (edit) nameHandler(symbol, name);
  }

  function changeHandler(event) {
    setName(event.target.value);
  }

  let playerName = <span className="player-name">{name}</span>;

  if (edit)
    playerName = (
      <input
        className="player input"
        type="text"
        value={name}
        onChange={changeHandler}
        required
      />
    );
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>

      <button onClick={editHandler}>{edit ? "Save" : "Edit"}</button>
    </li>
  );
}
