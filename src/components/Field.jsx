import { useState } from 'react'
import Player from './Player'
import './Field.css'

function Field({ players, onDragEnd, onRemovePlayer }) {
  const [draggingId, setDraggingId] = useState(null)

  const handleMouseDown = (e, playerId) => {
    setDraggingId(playerId)
  }

  const movePlayer = (clientX, clientY, fieldElement) => {
    if (!draggingId || !fieldElement) return

    const rect = fieldElement.getBoundingClientRect()
    let x = ((clientX - rect.left) / rect.width) * 100
    let y = ((clientY - rect.top) / rect.height) * 100

    // Limitar posición dentro del campo
    x = Math.max(5, Math.min(95, x))
    y = Math.max(5, Math.min(95, y))

    const player = players.find(p => p.id === draggingId)
    if (player) {
      onDragEnd(draggingId, x, y)
    }
  }

  const handleMouseMove = (e) => {
    movePlayer(e.clientX, e.clientY, e.currentTarget)
  }

  const handleTouchMove = (e) => {
    if (!draggingId) return
    const touch = e.touches[0]
    if (!touch) return
    e.preventDefault()
    movePlayer(touch.clientX, touch.clientY, e.currentTarget)
  }

  const handleMouseUp = () => {
    setDraggingId(null)
  }

  const handleTouchStart = (e, playerId) => {
    const touch = e.touches[0]
    if (!touch) return
    setDraggingId(playerId)
  }

  const handleTouchEnd = () => {
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
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
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
            onTouchStart={e => handleTouchStart(e, player.id)}
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
