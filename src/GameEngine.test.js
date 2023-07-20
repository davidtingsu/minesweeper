import { GameEngine } from './GameEngine';

test('generates mines', () => {
    const mineCount = 10;
    const engine = new GameEngine(5, 6, 10);
    expect(engine.generateMines().size).toBe(mineCount)
});


// coord is x,y or (c,r) and not row, column.
test('coordToIndex', () => {
    const engine = new GameEngine(5, 6, 10);
    // first
    expect(engine.coordToIndex(0, 0)).toBe(0);
    expect(engine.coordToIndex(3, 1)).toBe(9);


    // last
    expect(engine.coordToIndex(5, 4)).toBe(29);

    expect(engine.coordToIndex(1, 0)).toBe(1);
});
test('indexToCoord', () => {
    const engine = new GameEngine(5, 6, 10);
    // first
    expect(engine.indexToCoord(0)).toEqual([0, 0]);
    expect(engine.indexToCoord(9)).toEqual([3, 1]);


    // last
    expect(engine.indexToCoord(29)).toEqual([5, 4]);

    expect(engine.indexToCoord(1)).toEqual([1, 0]);

    const engine2 = new GameEngine(9, 9);
    expect(engine2.indexToCoord(51)).toEqual([6, 5]);

});

test('generateMine', () => {
    const m = 5;
    const n = 6;
    const engine = new GameEngine(5, 6, 10);
    const total = m * n;
    let i = 1000;
    expect(() => {
        while(i--){
            const mineIndex = engine.generateMine();
            if (mineIndex < 0 || mineIndex >= total){
                throw Error(`mine index ${mineIndex} out of bounds`);
            }
         }
    }).not.toThrowError()

});

test('handleFirstClick', () => {
    const m = 5;
    const n = 6;
    const engine = new GameEngine(5, 6, 10);
    engine.initialize();
    const mines = Array.from(engine.mines);
    const arbitraryMine = mines[0];
    expect(typeof arbitraryMine).toBe('number')
    const mineCoords = engine.indexToCoord(arbitraryMine);

    expect(engine.hasMine(...mineCoords)).toBe(true);

    engine.handleFirstClick(...mineCoords);
    expect(engine.hasMine(...mineCoords)).toBe(false);
});

test('isSolved', () => {
    const m = 5;
    const n = 6;
    const engine = new GameEngine(5, 6, 10);
    engine.initialize();

    let count = 0;
    for(let mine of engine.mines){
        const mineCoords = engine.indexToCoord(mine);
        engine.placeFlag(...mineCoords);
        if (count < engine.mines.length){
            expect(engine.isSolved()).toBe(false);
        }
        count++;
    }
    expect(engine.isSolved()).toBe(true);
    expect(engine.isOver()).toBe(true);
});

test('isLoss', () => {
    const m = 5;
    const n = 6;
    const engine = new GameEngine(m, n, 10);
    engine.initialize();

    const mines = Array.from(engine.mines);
    const arbitraryMine = mines[0];
    const mineCoords = engine.indexToCoord(arbitraryMine);
    for (let i = 0; i < engine.getCellCount(); i++){
        /// first click has to not be mine;
        if (!engine.hasMine(i)){
            engine.click(...engine.indexToCoord(i));
            break;
        }
    }
    engine.click(...mineCoords);
    expect(engine.hasMine(...mineCoords)).toBe(true);
    expect(engine.hasMine(arbitraryMine)).toBe(true);


    expect(engine.isLoss()).toBe(true);
    expect(engine.isOver()).toBe(true);

});


test('placeFlag', () => {
    const m = 5;
    const n = 6;
    const engine = new GameEngine(m, n, 10);
    engine.initialize();

    const mines = Array.from(engine.mines);
    const arbitraryMine = mines[0];
    const mineCoords = engine.indexToCoord(arbitraryMine);
    let flagX;
    let flagY;
    for (let i = 0; i < engine.getCellCount(); i++){
        /// first click has to not be mine;
        if (!engine.hasMine(i)){
            [flagX, flagY] = engine.indexToCoord(i);
            engine.placeFlag(flagX, flagY);
            break;
        }
    }
    engine.click(flagX, flagY);
    expect(engine.getCellState(flagX, flagY).flagged).toBe(true);
    expect(engine.getCellState(flagX, flagY).clicked).toBe(false);

});