import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { colors } from '@/lib/tokens/colors';
import { S1Item, TransformedS1 } from '@/services/api/asset';
import { useState } from 'react';
import {
  ActivityIndicator,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  selectedS1Code: string | null;
  onSelectS1: (s1Code: string) => void;
  isLoading: boolean;
  s1Items: TransformedS1[];
}

export const TopBarNavigation: React.FC<Props> = ({
  onSelectS1,
  selectedS1Code,
  s1Items = [],
  isLoading,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const insets = useSafeAreaInsets();

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((exp) => !exp);
  };

  const handelSelection = (s1Code: string) => {
    onSelectS1(s1Code);
    setIsExpanded(false);
  };

  const selectedS1Item =
    s1Items?.find((item) => item.S1Code === selectedS1Code) || s1Items[0];

  return (
    <View style={styles.container}>
      <Pressable style={styles.selectContainer} onPress={toggleExpanded}>
        <Icon name='Industry' color={colors.white} size='xsm' />
        <Typography
          name='navigation'
          text={selectedS1Item?.S1Name || 'Select S1'}
          style={styles.selectText}
        />
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Icon name='ChevronDown' color={colors.white} size='xsm' />
        )}
      </Pressable>

      <Modal visible={isExpanded} transparent style={styles.modal}>
        <Pressable onPress={toggleExpanded} style={styles.modal} />
        <View
          style={[
            styles.dropdownContainer,
            { top: Platform.OS === 'ios' ? insets.top : 0 },
          ]}
        >
          <ScrollView>
            {s1Items?.map((s1Item) => (
              <Pressable
                key={s1Item.S1Code}
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
                onPress={() => handelSelection(s1Item.S1Code)}
              >
                {s1Item.S1Code === selectedS1Code && (
                  <Icon name='Industry' color={colors.white} size='xsm' />
                )}
                <Typography
                  name='navigation'
                  text={s1Item.S1Name}
                  style={styles.optionText}
                />
              </Pressable>
            )) || []}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'visible',
    zIndex: 1000,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary25,
    justifyContent: 'center',
    gap: 10,
    height: 28,
    shadowColor: colors.black,
    shadowOpacity: 0.25, // 25% opacity
    shadowRadius: 4, // blur 8
    shadowOffset: {
      width: 0, // no x-offset
      height: 8, // y-offset 2
    },
    elevation: 4, // android
  },
  selectText: {
    color: colors.white,
    marginLeft: 5,
  },
  dropdownContainer: {
    backgroundColor: colors.linkLightGreen,
    width: '100%',
    maxHeight: '40%',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    gap: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  option: {
    backgroundColor: colors.secondary25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  optionPressed: {
    backgroundColor: colors.secondary50,
  },
  optionText: {
    color: colors.white,
  },
});
