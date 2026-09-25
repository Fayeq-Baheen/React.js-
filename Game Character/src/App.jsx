import { useState } from "react";
import "./index.css";

const initialCharacter = {
  name: "Knight",
  health: 100,
  level: 1,
};

function Character({ character }) {
  return (
    <div className="character">
      <h2>{character.name}</h2>
      <p>Level: {character.level}</p>

      <div className="health-bar">
        <div
          className="health"
          style={{ width: `${character.health}%` }}
        ></div>
      </div>

      <p>Health: {character.health} / 100</p>
    </div>
  );
}

function Controls({
  onAttack,
  onHeal,
  onRestart,
  gameOver,
}) {
  return (
    <div className="controls">
      {!gameOver ? (
        <>
          <button onClick={onAttack}>Attack</button>
          <button onClick={onHeal}>Heal</button>
        </>
      ) : (
        <button onClick={onRestart}>Restart</button>
      )}
    </div>
  );
}

export default function App() {
  const [character, setCharacter] = useState(
    initialCharacter
  );

  function handleAttack() {
    setCharacter({
      ...character,
      health: Math.max(character.health - 10, 0),
    });
  }

  function handleHeal() {
    setCharacter({
      ...character,
      health: Math.min(character.health + 15, 100),
    });
  }

  function handleRestart() {
    setCharacter(initialCharacter);
  }

  const gameOver = character.health === 0;

  return (
    <div className="container">
      <h1>Game Character</h1>

      <Character character={character} />

      {gameOver && (
        <h2 className="game-over">
          💀 Game Over
        </h2>
      )}

      <Controls
        onAttack={handleAttack}
        onHeal={handleHeal}
        onRestart={handleRestart}
        gameOver={gameOver}
      />
    </div>
  );
}