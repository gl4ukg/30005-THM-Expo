import Reactﬁ from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import iconMapping from './iconMapping';
import colors from '../../colors'

type IconName = keyof typeof iconMapping;

type SizeOptions = 'small' | 'large';

type IconProps = {
    name: IconName;
    size?: SizeOptions;
    color?: string;
};

const getSizeValue= (size:SizeOptions)=>{
    switch (size){
        case 'small':
            return 24;
        case 'large':
            return 32;
        default:
            return 24;
    }
}
const Icon: React.FC<IconProps> = ({ name, size = 'small', color = colors.primary }) => {
    const IconComponent = iconMapping[name];
    const IconSize = getSizeValue(size)

    return (
            <View style={{ width: IconSize, height: IconSize }}>
                <IconComponent size={IconSize} color={color} />
            </View>
    );
};

export default Icon;
