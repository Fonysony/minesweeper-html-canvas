export class Game {
    constructor(canvas, canvasWidth, canvasHeight, canvasScale = 1) {
        this.canvas = document.querySelector(canvas);
        this.buffer = document.createElement('canvas').getContext('2d');
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.width = `${canvasWidth * canvasScale}px`;
        this.canvas.style.height = `${canvasHeight * canvasScale}px`;
        this.context = this.canvas.getContext('2d');
        this.context.imageSmoothingEnabled = false;
        this.perElapsed = 0;
    }

    createTileSheet(tilesheet, tileColumns, mapRows, mapColumns, map) {
        this.tilesheet = new Image();
        this.tilesheet.src = tilesheet;
        this.tileColumns = tileColumns;
        this.tileSize = this.tilesheet.width / this.tileColumns;
        this.map = {
            rows: mapRows,
            columns: mapColumns,
            tiles: map
        }
    }

    calcTileSoucePos(tileIndex) {
        return {
            x: tileIndex % this.tileColumns * this.tileSize,
            y: Math.floor(tileIndex / this.tileColumns) * this.tileSize
        }
    }

    renderTiles() {
        let mapIndex = 0;
        for (let top = 0; top < this.map.rows*this.tileSize; top += this.tileSize) {
            for (let left = 0; left < this.map.columns*this.tileSize; top += this.tileSize) {
                const tileValue = this.map.tiles[mapIndex]-1;
                mapIndex++;
                if (tileValue === -1) continue;
                const tileSourcePos = this.calcTileSoucePos(tileValue);
                this.buffer.drawImage(
                    this.tilesheet,
                    tileSourcePos.x, tileSourcePos.y,
                    this.tileSize, this.tileSize,
                    left, top,
                    this.tileSize, this.tileSize
                );
            }
        }
    }

    tick = function(elapsed) {
        let delta = elapsed - this.perElapsed;
        this.perElapsed = elapsed;

        this.update(delta);
        window.requestAnimationFrame(this.tick);
    }.bind(Game);

    update(delta) {
        
    }
}