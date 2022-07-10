import { Game } from './modules/Game.js';

/** @type {HTMLCanvasElement} */
window.onload = function() {
    const GameViewport = {
        width: 500,
        height: 500,
        scale: 1
    };

    const canvas = document.querySelector('canvas');
    const buffer = document.createElement('canvas').getContext('2d');
    const context = canvas.getContext('2d');

    canvas.width = GameViewport.width;
    canvas.height = GameViewport.height;
    canvas.style.width = `${GameViewport.width * GameViewport.scale}px`;
    canvas.style.height = `${GameViewport.height * GameViewport.scale}px`;

    context.imageSmoothingEnabled = false;

    const tileImage = new Image();
    tileImage.src = '../assets/tiledata.png';
    const tileSize = tileImage.width / 23;
    const map = {
        columns: 6,
        rows: 5,
        tiles: [1,1,1,1,1,1,
                1,1,0,1,1,1,
                1,1,1,1,1,1,
                1,1,1,1,1,1,
                1,1,1,1,1,1]
    };

    function calculateTileSourcePos(tileIndex, tilesheetColumns) {
        return {
            x: tileIndex % tilesheetColumns * tileSize,
            y: Math.floor(tileIndex / tilesheetColumns) * tileSize
        }
    }
    
    function renderTiles() {
        let mapIndex = 0;
        for (let top = 0; top < map.rows*tileSize; top += tileSize) {
            for (let left = 0; left < map.columns*tileSize; left += tileSize) {
                let tileValue = map.tiles[mapIndex]-1;
                mapIndex++;
                if (tileValue === -1) continue;
                console.log('render');
                const tileSoucePos = calculateTileSourcePos(tileValue, 23);
                buffer.drawImage(
                    tileImage,
                    tileSoucePos.x, tileSoucePos.y,
                    tileSize, tileSize,
                    left, top,
                    tileSize, tileSize
                );
                
            }
        }
    }

    function gameLoop() {
        context.drawImage(buffer.canvas, 0, 0);
    }

    tileImage.onload = function() {
        renderTiles();
        setInterval(() => {
            buffer.drawImage(
                tileImage,
                64, 0,
                32, 32,
                128, 0,
                32, 32
            );
            context.drawImage(
                tileImage,
                64, 32,
                32, 32,
                64, 0,
                32, 32
            );
        }, 5000);
    }
    window.addEventListener('click', () => {
        context.drawImage(buffer.canvas, 0, 0);
    });
}
