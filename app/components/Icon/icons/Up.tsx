import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface SearchProps {
    size: number;
    color: string;
}

const Up: React.FC<SearchProps> = ({ size, color }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect width={size} height={size} transform="translate(24.5) rotate(90)" fill="none" fill-opacity="0.01"/>
            <Path d="M12.5 7.5L20 15L18.95 16.05L12.5 9.6L6.05 16.05L5 15L12.5 7.5Z" fill={color}/>
        </Svg>

    );
};

export default Up;
