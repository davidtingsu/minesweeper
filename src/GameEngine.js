// [ x ]    clickCount
// [ x ]    initialize()
// [ x ]    handleFirstClick(x,y): this will move mine if it were already clicked.
// [ x ]    isSolved()
// [ x ]    isLoss()
// [ _ ]    isOver(): isSolved() || isLoss()
// [ _ ]    getMineCount():
// [ _ ]    getPlaceableFlagCount():
// [ x ]    placeFlag(x,y)
// [ _ ]    flaggedCells (set)
// [ _ ]    Mines (set)
// [ _ ]    clicked (set)
// [ x ]    Matrix of state (m,n)  when I try to retrieve (x,y), it will be (x-1)*m+(y-1)
// [ x ]    getCellState(x,y)
// [ x ]    getAdjacentMineCount(x,y)
// [ _ ]    isInBounds(x, y)
// [ _ ]    getDimensions(): m,n
// [ x ]    m,n
// [ x ]    click(x,y)
// [ _ ]    clickAdjacent(x,y) // this is like the water fill problem, you can’t refill.

const DEFAULT_CELL = Object.freeze({
    flagged: false,
    clicked: false,
    mine: false,
});
export class GameEngine {
    constructor(m, n, mine_count){
        // m rows (y coord)
        this.m = m;
        // n columns (x coord)
        this.n = n;
        this.mine_count = mine_count;
        this.clickCount = 0;
        this.state = new Array(m * n);
    }
    initialize(){
        this.mines = this.generateMines();
    }
    generateMines(){
        this.replenishMines();
        return this.mines;
    }
    /**
     * If a mine was removed, add in mine until mine count is met;
     */
    replenishMines(){
        this.mines = this.mines || new Set();
        const set = this.mines;
        const total = this.m * this.n;
        while(set.size < this.mine_count){
            set.add(
               this.generateMine()
            )
        };
    }

    // generateMine 1-D index of mine
    generateMine(){
        const total = this.m * this.n;
        return Math.floor(Math.random() * total);
    }
    removeMine(...args){
        const i = this._normalizeArgsToIndex(...args);
        const removed = this.mines.delete(i);
        if (!removed) throw Error('Mine does not exist');
    }
    hasMine(...args){
        const index = this._normalizeArgsToIndex(...args);
        return this.mines.has(index);
    }
    _normalizeArgsToIndex(...args){
        let i;
        if (args.length === 1){
            i = args[0];
        } else if (args.length === 2){
            i = this.coordToIndex(...args);
        } else {
            throw `Invalid number of args ${args.length}`
        }
        return i;
    }
    _normalizeArgsToCoord(...args){
        const i = this._normalizeArgsToIndex(...args);
        return this.indexToCoord(i);
    }
    coordToIndex(x, y){
        return x + y * (this.n - 1);
    }
    indexToCoord(i){
        return [i % (this.n-1), Math.floor(i/(this.n-1))];
    }
    /* handleFirstClick ensures that first click does not land on a mine */
    handleFirstClick(...args){
       const [x,y] =  this._normalizeArgsToCoord(...args);

        if (this.hasMine(x, y)){
            this.removeMine(x, y);
        }
        this.replenishMines();
    }
    click(...args){
        const [x,y] =  this._normalizeArgsToCoord(...args);
        this.clickCount++;
        if (this.clickCount === 1){
            this.handleFirstClick(x, y);
        }
        const {flagged} = this.getCellState(x,y);
        if (flagged) return;
        this.updateCell(x, y, {clicked: true});
    }
    updateCell(x,y, updates){
        const index = this.coordToIndex(x,y);
        this.state[index] = {...this.state[index], ...updates};
    }
    deleteCell(x, y){
        const index = this.coordToIndex(x,y);
        this.state[index] = null;
    }
    /**
     * returns true if user clicks a mine,
     * return true if cell has mine and
     */
    isLoss(){
        for (let i = 0; i < this.state.length; i++){
            if (this.hasMine(i) && this.state[i]?.clicked){
                return true;
            }
        }
        return false;
    }
    placeFlag(...args){
        const [x, y] = this._normalizeArgsToCoord(...args);
        this.updateCell(x,y, {flagged: true});
    }
    toggleFlag(...args){
        const [x, y] = this._normalizeArgsToCoord(...args);
        const {flagged} = this.getCellState(x,y);
        this.updateCell(x,y, {flagged: !flagged});
    }
    isSolved(){
        const flaggedCount = this.state.filter(node => node.flagged).length;
        if (flaggedCount < this.mine_count) return false;
        for(let i = 0; i < this.state.length; i++){
            if (this.state[i]?.flagged && !this.hasMine(i)){
                return false;
            }
        }
        return true;
    }
    isOver(){
        return this.isSolved() || this.isLoss();
    }
    // updateState updates the state of all the cells
    updateState(){
        // getAdjacentMineCount
    }
    getAdjacentMineCount(...args){
        const i = this._normalizeArgsToIndex(...args);
        const [x, y] = this.indexToCoord(i);
        let count = 0;
        for (let i = -1; i <= 1; i++){
            for (let j = -1; j <= 1; j++){
                if (this.hasMine(x+i, y+j)){
                    count++;
                }
            }
        }
        return count;
    }
    getCellState(...args){
        const i = this._normalizeArgsToIndex(...args);
        const adjacentMineCount = this.getAdjacentMineCount(i);
        const mine = this.hasMine(i);
        return {...DEFAULT_CELL, ...this.state[i], adjacentMineCount, mine};
    }
    getCellCount(){
        return this.m * this.n;
    }
}