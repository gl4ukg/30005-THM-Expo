import Reactﬁ from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import {iconMapping} from './iconMapping';
import {colors} from '../../colors'

type IconProps = {
    name: keyof typeof iconMapping;
    size?: keyof typeof iconSize;
    color?:  keyof typeof colors;
};

export const iconSize = {
    sm:24,
    md:32,
} 

export const Icon: React.FC<IconProps> = ({ name, size = 'sm', color = "primary" }) => {
    const IconComponent = iconMapping[name];
    const iconSizeNumber = iconSize[size];
    const IconColor = colors[color];

    return (
            <View style={{ width: iconSizeNumber, height: iconSizeNumber }}>
                <IconComponent size={iconSizeNumber} color={IconColor} />
            </View>
    );
};