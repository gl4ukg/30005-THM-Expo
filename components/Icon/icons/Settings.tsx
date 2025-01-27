import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface SearchProps {
    size: number;
    color: string;
}

const Settings: React.FC<SearchProps> = ({ size, color }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect width="24" height="24" transform="translate(0.5)" fill="none"/>
            <Path d="M23 6H19.925C19.55 4.275 18.05 3 16.25 3C14.45 3 12.95 4.275 12.575 6H2V7.5H12.575C12.95 9.225 14.45 10.5 16.25 10.5C18.05 10.5 19.55 9.225 19.925 7.5H23V6ZM16.25 9C14.975 9 14 8.025 14 6.75C14 5.475 14.975 4.5 16.25 4.5C17.525 4.5 18.5 5.475 18.5 6.75C18.5 8.025 17.525 9 16.25 9Z" fill={color}/>
            <Path d="M2 18H5.075C5.45 19.725 6.95 21 8.75 21C10.55 21 12.05 19.725 12.425 18H23V16.5H12.425C12.05 14.775 10.55 13.5 8.75 13.5C6.95 13.5 5.45 14.775 5.075 16.5H2V18ZM8.75 15C10.025 15 11 15.975 11 17.25C11 18.525 10.025 19.5 8.75 19.5C7.475 19.5 6.5 18.525 6.5 17.25C6.5 15.975 7.475 15 8.75 15Z" fill={color}/>
        </Svg>

    );
};

export default Settings;
