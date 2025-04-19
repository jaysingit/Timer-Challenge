import { useState } from 'react';
import { useRef } from 'react';

export default function Player() {
  const playerName = useRef();
  const [enteredPlayername, setEnteredPlayerName] = useState(null);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
  }
  
  return (
    <section id="player">
      <h2>Welcome { enteredPlayername ?? 'Unknown Identity' }</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
