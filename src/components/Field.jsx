import { useState } from 'react'
import Player from './Player'
import './Field.css'

function Field({ players, onDragEnd, onRemovePlayer }) {
  const [draggingId, setDraggingId] = useState(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e, playerId) => {
    setDraggingId(playerId)
    const rect = e.currentTarget.parentElement.getBoundingClientRect()
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e) => {
    if (!draggingId) return

    const field = e.currentTarget
    const rect = field.getBoundingClientRect()
    let x = ((e.clientX - rect.left) / rect.width) * 100
    let y = ((e.clientY - rect.top) / rect.height) * 100

    // Limitar posición dentro del campo
    x = Math.max(5, Math.min(95, x))
    y = Math.max(5, Math.min(95, y))

    const player = players.find(p => p.id === draggingId)
    if (player) {
      onDragEnd(draggingId, x, y)
    }
  }

  const handleMouseUp = () => {
    setDraggingId(null)
  }

  const getPlayerIcon = (position) => {
    switch (position) {
      case 'arquero':
        return '🧤'
      case 'defensor':
        return '🛡️'
      case 'delantero':
        return '⚽'
      default:
        return '👤'
    }
  }

  return (
    <div
      className="field"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h2>Cancha</h2>
      <div className="field-container">
        {/* Líneas del campo */}
        <div className="field-center-line"></div>
        <div className="field-circle"></div>
        <div className="field-goal-area left"></div>
        <div className="field-goal-area right"></div>

        {/* Jugadores */}
        {players.map(player => (
          <div
            key={player.id}
            className={`player-wrapper ${draggingId === player.id ? 'dragging' : ''}`}
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`,
            }}
            onMouseDown={e => handleMouseDown(e, player.id)}
          >
            <Player
              player={player}
              icon={getPlayerIcon(player.position)}
              onRemove={() => onRemovePlayer(player.id)}
              isDragging={draggingId === player.id}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Field
