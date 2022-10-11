import React from 'react';
import ReactLoading from 'react-loading';
 
interface Loadingtypes {
    type: "blank" | "balls" | "bars" | "bubbles" | "cubes" | "cylon" | "spin" | "spinningBubbles" | "spokes"
    color: string;
    height: number | string;
    width: number | string;
}

const Loading: React.FC<Loadingtypes> = (props) => {
    const { type, color, height, width } = props;

    return (
        <ReactLoading 
            type={type} 
            color={color} 
            height={height} 
            width={width}
        />
    );
}
 
export default Loading;