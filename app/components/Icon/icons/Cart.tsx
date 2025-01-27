import React from 'react';
import Svg, { Path, Rect, G, Defs, ClipPath } from 'react-native-svg';

interface SearchProps {
    size: number;
    color: string;
}

const Cart: React.FC<SearchProps> = ({ size, color }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <G clip-path="url(#clip0_653_10768)">
                <Rect width={size} height={size} transform="translate(0.5)" fill="none"/>
                <Path d="M8 22.5002C8.82843 22.5002 9.5 21.8286 9.5 21.0002C9.5 20.1717 8.82843 19.5002 8 19.5002C7.17157 19.5002 6.5 20.1717 6.5 21.0002C6.5 21.8286 7.17157 22.5002 8 22.5002Z" fill={color}/>
                <Path d="M18.5 22.5002C19.3284 22.5002 20 21.8286 20 21.0002C20 20.1717 19.3284 19.5002 18.5 19.5002C17.6716 19.5002 17 20.1717 17 21.0002C17 21.8286 17.6716 22.5002 18.5 22.5002Z" fill={color}/>
                <Path d="M21.5 5.25015H4.865L4.25 2.10015C4.21494 1.9282 4.12068 1.77398 3.98364 1.66435C3.8466 1.55472 3.67546 1.49661 3.5 1.50015H0.5V3.00015H2.885L5.75 17.4002C5.78506 17.5721 5.87932 17.7263 6.01636 17.836C6.1534 17.9456 6.32454 18.0037 6.5 18.0002H20V16.5002H7.115L6.5 13.5002H20C20.1734 13.5044 20.3429 13.4484 20.4796 13.3418C20.6163 13.2351 20.7119 13.0843 20.75 12.9152L22.25 6.16515C22.2751 6.05387 22.2745 5.93832 22.2483 5.8273C22.222 5.71628 22.1708 5.61271 22.0985 5.52448C22.0261 5.43625 21.9347 5.36568 21.8309 5.31814C21.7272 5.2706 21.614 5.24735 21.5 5.25015ZM19.4 12.0002H6.215L5.165 6.75015H20.5625L19.4 12.0002Z" fill={color}/>
            </G>
            <Defs>
                <ClipPath id="clip0_653_10768">
                    <Rect width={size} height={size} fill="none" transform="translate(0.5)"/>
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default Cart;
