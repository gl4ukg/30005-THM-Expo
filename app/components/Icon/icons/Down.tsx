import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface SearchProps {
    size: number;
    color: string;
}

const Down: React.FC<SearchProps> = ({ size, color }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect width={size} height={size} transform="translate(0.5 24) rotate(-90)" fill="none" fill-opacity="0.01"/>
            <Path d="M12.5 16.5L5 9L6.05 7.95L12.5 14.4L18.95 7.95L20 9L12.5 16.5Z" fill={color}/>
        </Svg>

    );
};

export default Down;
