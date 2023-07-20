import classNames from "classnames"
export const Cell = props => {
    const className = classNames(
        'bg-unclickedgray',
        'cursor-pointer',
        'flex',
        'justify-center',
        'items-center',
        { 'shadow-inner border-black border-solid border-1': props.clicked }
    );
    return (
        <div
            onClick={() => props.onClick(props.i)}
            className={className}
            style={{
                ...props.clicked ? {} : {
                    // unclicked
                    'boxShadow': 'inset -3px -3px #7b7b7b, inset 3px 3px #ffffFF',
                }
            }}
        >
            {props.i}
        </div>
    )
}