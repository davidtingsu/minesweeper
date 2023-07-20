import { Cell } from './Cell';
export const Minesweeper = (props) => {
    const total = props.m * props.n;
    return (
        <div className='grid grid-cols-9 grid-rows-9 h-80 w-80'>
            {[...Array(total)].map((coord, i) => {
               return  <Cell key={i} i={i} {...props} {...props.getCellState(i)}/>;
            })}
        </div>
    );
};