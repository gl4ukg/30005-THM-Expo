import { TessLines } from '@/components/decorative/tessLines';
import { Icon } from '@/components/Icon/Icon';
import { OpenMenu } from '@/components/UI/BottomNavigation/openMenu';
import { NavMenu } from '@/components/UI/NavMenu/navMenu';
import { colors } from '@/lib/tokens/colors';
import { Link, useRouter } from 'expo-router';
import { FC, useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '@/context/Reducer';

interface BottomNavigationProps {}
export const BottomNavigation: FC<BottomNavigationProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dispatch } = useContext(AppContext);

  const handleLinkPress = (to: string) => {
    dispatch({ type: 'DESELECT_ALL_HOSES' });
    setIsOpen(false);
  };

  return (
    <View style={[styles.modal, isOpen && styles.modalOpen]}>
      <View style={{ bottom: insets.bottom }}>
        <Collapsible collapsed={!isOpen} style={[styles.collapsible]}>
          <NavMenu
            handleLinkPress={() => handleLinkPress}
            elements={[
              {
                title: 'Download / sync data',
                to: '/(app)/dashbord/hoses',
                icon: () => <Icon name='Download' color={colors.primary} />,
              },
              {
                title: 'Upload your data',
                to: '/(app)/dashbord',
                icon: () => <Icon name='Upload' color={colors.primary} />,
              },
              {
                id: 'Inspection',
                title: 'Inspection',
                icon: () => <Icon name='Search' color={colors.primary} />,
                links: [
                  {
                    title: 'Inspect',
                    to: '/',
                  },
                  {
                    title: 'Edit hose data',
                    to: '/(app)/user',
                  },
                  {
                    title: 'Update RFID',
                    to: '/(app)/dashbord/hoses',
                  },
                  {
                    title: 'Metering',
                    to: '/(app)/dashbord/hoses',
                  },
                ],
              },
              {
                title: 'Alerts /KPIs',
                to: '/(app)/user',
                icon: () => <Icon name='Meter' color={colors.primary} />,
              },
              {
                title: 'Order hoses',
                to: '/scan?title=Order%20hoses',
                icon: () => <Icon name='Cart' color={colors.primary} />,
              },
              {
                title: 'Hose replacement & pressure testing',
                to: '/(app)/user',
                icon: () => <Icon name='Task' color={colors.primary} />,
              },
              {
                title: 'Report ID as scrapped',
                to: '/scan?title=Scrap%20hoses',
                icon: () => <Icon name='Trash' color={colors.primary} />,
              },
              {
                title: 'Send mail',
                to: '/(app)/user',
                icon: () => <Icon name='Email' color={colors.primary} />,
              },
              {
                title: 'Settings',
                to: '/(app)/user',
                icon: () => <Icon name='Settings' color={colors.primary} />,
              },
            ]}
          />
        </Collapsible>
      </View>
      <View style={[styles.navigationContainer, { bottom: insets.bottom }]}>
        <View style={[styles.background, { bottom: -insets.bottom }]}>
          <TessLines width={Dimensions.get('window').width * 0.6} />
        </View>
        <View style={styles.buttonsWrapper}>
          <Link
            asChild
            href='/(app)/user'
            style={[styles.button, { display: 'none' }]}
          >
            <Pressable
              style={({ pressed }) => [pressed && {}]}
              onPress={() => setIsOpen(false)}
            >
              <Icon name='User' color={colors.white} />
            </Pressable>
          </Link>
          <View style={{ width: 30, height: 30 }} />
          <OpenMenu
            isOpen={isOpen}
            handlePress={() => setIsOpen((isOpen) => !isOpen)}
          />
          {/* <Link asChild href='/scan' style={styles.button}>
            <Pressable
              style={({ pressed }) => [pressed && {}]}
              onPress={() => setIsOpen(false)}
            >
              <Icon name='Search' color='#fff' />
            </Pressable>
          </Link> */}
          <Pressable
            style={styles.button}
            onPress={() => (isOpen ? setIsOpen(false) : router.back())}
          >
            <Icon name='ChevronLeft' color='#fff' />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1000,
  },
  modalOpen: {
    flex: 1,
    height: '100%',
    position: 'absolute',
    backgroundColor: '#00000075',
    justifyContent: 'flex-end',
    top: 0,
  },
  collapsible: {
    position: 'absolute',
    left: 20,
    right: 20,
    flex: 1,
    paddingTop: 10,
    zIndex: 1000,
  },
  navigationContainer: {
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#007c34',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 1000,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    height: 50,
    maxWidth: 350,
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#007c34',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
