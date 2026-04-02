import './Player.css'

function Player({ player, icon, onRemove, isDragging }) {
  return (
    <div className={`player ${isDragging ? 'dragging' : ''}`}>
      <div className="player-icon">{icon}</div>
      <div className="player-info">
        <p className="player-name">{player.name}</p>
        <p className="player-position">
          {player.position === 'arquero' && 'Arquero'}
          {player.position === 'defensor' && 'Defensor'}
          {player.position === 'delantero' && 'Delantero'}
        </p>
        <button
          className="remove-btn"
          onClick={onRemove}
          title="Remover de la cancha"
        >
          ❌
        </button>
      </div>
    </div>
  )
}

export default Player
