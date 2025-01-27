import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface SearchProps {
    size: number;
    color: string;
}

const Left: React.FC<SearchProps> = ({ size, color }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect width={size} height={size} transform="translate(0.5)" fill="none"/>
            <Path d="M8 12L15.5 4.5L16.55 5.55L10.1 12L16.55 18.45L15.5 19.5L8 12Z" fill={color}/>
        </Svg>

    );
};

export default Left;
