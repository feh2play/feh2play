import { html, useState, useEffect, useRef } from "https://esm.sh/htm/preact/standalone";
import Tile from "./Tile.js";
import Unit from "./Unit.js";
import Engine from "../engine.js";
import useResizeListener from "../hooks/useResizeListener.js";
import Timer from "./Timer.js";
import ActionTracker from "./ActionTracker.js";

const engine = Engine();

const Board = ({ gameState, activeUnit, validActions, potentialAction, handleTileClick, lastClick, showDangerArea, playingAs }) => {
  const [tileSize, setTileSize] = useState(50);

  const boardRef = useRef(null);
  const canvasRef = useRef(null);

  const isDuel = gameState.mode === "duel";
  const boardWidth = gameState.map.terrain[0].length;
  const boardHeight = gameState.map.terrain.length;

  useResizeListener(() => {
    if (boardRef.current) {
      const containerWidth = boardRef.current.getBoundingClientRect().width;
      const newTileSize = containerWidth / boardWidth;
      setTileSize(newTileSize);
    }
  }, 10);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const tileWithPath = validActions.find(action => action.to.x === potentialAction.to?.x && action.to.y === potentialAction.to?.y);
    const path = tileWithPath?.to.path || [];
    if (path.length === 0) return;
    context.strokeStyle = "rgba(173, 216, 230, 0.5)";
    context.lineWidth = tileSize / 3;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(path[0].x * tileSize + tileSize / 2, path[0].y * tileSize + tileSize / 2);
    path.forEach(point => context.lineTo(point.x * tileSize + tileSize / 2, point.y * tileSize + tileSize / 2));
    context.stroke();
  }, [potentialAction]);

  const calculateHighlightedTiles = () => {
    const highlightedTiles = Array.from({ length: boardWidth * boardHeight }, (_, i) => ({
      x: i % boardWidth,
      y: Math.floor(i / boardWidth),
      colour: "transparent"
    }));
    if (showDangerArea && !(isDuel && gameState.isSwapPhase)) {
      gameState.teams[playingAs ^ 1].forEach(enemyUnit => {
        engine.calculateThreatRange(gameState, enemyUnit, false)
          .forEach(({ x, y }) => highlightedTiles[y * boardWidth + x].colour = "rgba(139, 0, 0, 0.3)");
      });
    }
    if (activeUnit) {
      engine.calculateThreatRange(gameState, activeUnit, false)
        .forEach(({ x, y }) => highlightedTiles[y * boardWidth + x].colour = "rgba(255, 0, 0, 0.5)");
      engine.calculateMovementRange(gameState, activeUnit, false)
        .forEach(({ x, y, path }) => highlightedTiles[y * boardWidth + x].colour = path.length > 0 ? "rgba(0, 0, 255, 0.5)" : "rgba(0, 255, 255, 0.5)");
      validActions.forEach(({ type, target }) => {
        if (type === "assist") {
          highlightedTiles[target.y * boardWidth + target.x].colour = "rgba(0, 255, 0, 0.5)";
        }
      });
    } else {
      const lastClickedUnit = gameState.teams[0].concat(gameState.teams[1])
        .find(unit => unit.pos.x === lastClick.tile.x && unit.pos.y === lastClick.tile.y);
      if (lastClickedUnit && (lastClickedUnit.team !== playingAs || !lastClickedUnit.hasAction)) {
        engine.calculateThreatRange(gameState, lastClickedUnit, false)
          .forEach(({ x, y }) => highlightedTiles[y * boardWidth + x].colour = "rgba(255, 0, 0, 0.3)");
        engine.calculateMovementRange(gameState, lastClickedUnit, false)
          .forEach(({ x, y, path }) => highlightedTiles[y * boardWidth + x].colour = path.length > 0 ? "rgba(0, 0, 255, 0.3)" : "rgba(0, 255, 255, 0.3)");
      }
    }
    if (gameState.isSwapPhase) {
      gameState.map.startingPositions[playingAs].forEach(({ x, y }) => highlightedTiles[y * boardWidth + x].colour = "rgba(0, 255, 0, 0.5)");
      if (playingAs === 0) {
        gameState.map.startingPositions[playingAs ^ 1].forEach(({ x, y }) => highlightedTiles[y * boardWidth + x].colour = "rgba(255, 0, 0, 0.3)");
      } else {
        gameState.map.startingPositions[playingAs ^ 1].forEach(({ x, y }) => highlightedTiles[y * boardWidth + x].colour = "rgba(0, 0, 255, 0.3)");
      }
    }
    return highlightedTiles;
  }

  const highlightedTiles = calculateHighlightedTiles();

  const handleBoardClick = e => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const x = Math.floor(offsetX / tileSize);
      const y = Math.floor(offsetY / tileSize);
      handleTileClick(x, y);
    }
  }

  const getCaptureAreaStyle = () => {
    const { x, y, w, h } = gameState.captureArea;
    const IMAGE_SQUARE_SIZE = 135;
    const IMAGE_BORDER_SIZE = 15;
    const scale = tileSize / IMAGE_SQUARE_SIZE;
    return {
      width: `${scale * (IMAGE_SQUARE_SIZE * w + IMAGE_BORDER_SIZE * 2)}px`,
      height: `${scale * (IMAGE_SQUARE_SIZE * h + IMAGE_BORDER_SIZE * 2)}px`,
      top: `${y * tileSize - scale * IMAGE_BORDER_SIZE}px`,
      left: `${x * tileSize - scale * IMAGE_BORDER_SIZE}px`
    }
  }

  const getCornerStyle = (x, y) => {
    return {
      width: `${tileSize * 2}px`,
      height: `${tileSize * 2}px`,
      top: `${y * tileSize}px`,
      left: `${x * tileSize}px`
    }
  }

  return html`
  <div class="board board-${gameState.mode}" ref=${boardRef} onClick=${handleBoardClick}>
    <img src="assets/maps/common/Rival_Domains_Wave.webp" alt="water" />
    <img src=${gameState.map.bg} alt="map" />
    ${isDuel && html`<img src="assets/maps/common/SummonerDuels_PointArea.webp" style=${getCaptureAreaStyle()} alt="capture area" />`}
    <div class="tile-container">
      ${highlightedTiles.map(tile => html`<${Tile} x=${tile.x} y=${tile.y} size=${tileSize} colour=${tile.colour} />`)}
    </div>
    <canvas 
      ref=${canvasRef}
      width=${tileSize * boardWidth}
      height=${tileSize * boardHeight}
      style=${{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }} />
    <div class="units">${[...gameState.teams[1], ...gameState.teams[0]]
      .filter(unit => !gameState.isSwapPhase || !isDuel || unit.team === playingAs)
      .map(unit => {
        const showActionIndicator = !gameState.isSwapPhase
          && unit.team === playingAs
          && unit.hasAction
          && gameState.currentTurn === playingAs
          && (!activeUnit || activeUnit.id === unit.id);
        return html`
        <${Unit}
          unit=${unit}
          isCaptain=${gameState.duelState[unit.team]?.captain === unit.id}
          isActive=${activeUnit?.id === unit.id}
          tileSize=${tileSize}
          potentialAction=${potentialAction}
          showActionIndicator=${showActionIndicator} />`;
      })}</div>
    ${isDuel && html`<div class="corner" style=${getCornerStyle(0, 0)}>
      <${ActionTracker} tileSize=${tileSize} gameState=${gameState} />
    </div>`}
    ${isDuel && html`<div class="corner" style=${getCornerStyle(6, 8)}><${Timer} tileSize=${tileSize} /></div>`}
  </div>
  `;
}

export default Board;
