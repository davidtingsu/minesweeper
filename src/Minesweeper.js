import { Cell } from './Cell';
export const Minesweeper = (props) => {
    const total = props.m * props.n;
    const handleHover = (e,i) => {
        if (!props.debug) return;
        console.debug(props.getCellState(i))
    }
    return (
        <div className='grid grid-cols-9 grid-rows-9 h-80 w-80'>
            {[...Array(total)].map((coord, i) => {
               return  <Cell debug={props.debug} onMouseEnter={handleHover} key={i} i={i} {...props} {...props.getCellState(i)}/>;
            })}
        </div>
    );
};