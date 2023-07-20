import classNames from "classnames"
const Content = props => {
    if (props.mine) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z" clipRule="evenodd" />
            </svg>
        )
    }
    if (props.flagged) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" />
            </svg>
        );
    }
    if (props.adjacentMineCount > 0) {
        return <span className="font-bold">{props.adjacentMineCount}</span>
    }
    return null;
}
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
            <Content {...props}/>
        </div>
    )
}