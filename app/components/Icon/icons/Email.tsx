import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface SearchProps {
    size: number;
    color: string;
}

const Email: React.FC<SearchProps> = ({ size, color }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect width="24" height="24" transform="translate(0.5)" fill="none" fill-opacity="0.01"/>
            <Path d="M21.5 4.5H3.5C3.10218 4.5 2.72064 4.65804 2.43934 4.93934C2.15804 5.22064 2 5.60218 2 6V18C2 18.3978 2.15804 18.7794 2.43934 19.0607C2.72064 19.342 3.10218 19.5 3.5 19.5H21.5C21.8978 19.5 22.2794 19.342 22.5607 19.0607C22.842 18.7794 23 18.3978 23 18V6C23 5.60218 22.842 5.22064 22.5607 4.93934C22.2794 4.65804 21.8978 4.5 21.5 4.5ZM19.85 6L12.5 11.085L5.15 6H19.85ZM3.5 18V6.6825L12.0725 12.615C12.198 12.7021 12.3472 12.7488 12.5 12.7488C12.6528 12.7488 12.802 12.7021 12.9275 12.615L21.5 6.6825V18H3.5Z" fill={color}/>
        </Svg>

    );
};

export default Email;
