import { Icon } from '@/components/Icon/Icon';
import { Typography } from '@/components/Typography';
import { useAppContext } from '@/context/ContextProvider';
import { colors } from '@/lib/tokens/colors';
import { handleGetAccess } from '@/lib/util/getAccess';
import { Href, Link, router } from 'expo-router';
import { FC } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

interface NavElement {
  title: string;
  icon?: FC<any>;
  key?: string;
  userHasNoAccess?: true;
}
interface NavLink extends NavElement {
  to: Href;
  userHasNoAccess?: true;
}
interface NavMenu extends NavElement {
  links: NavLink[];
  id: string;
  isCollapsed: boolean;
  toggleCollapsed: (id: string) => void;
}
export type NavElementsType =
  | NavLink
  | Omit<NavMenu, 'isCollapsed' | 'toggleCollapsed'>;
type NavElementType = {
  handleLinkPress: (to: Href) => void;
} & (NavLink | NavMenu);

export const NavElement: FC<NavElementType> = (props) => {
  const { dispatch } = useAppContext();

  if (props.userHasNoAccess) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.container,
          styles.containerDisabled,
          pressed && styles.containerPressed,
        ]}
        onPress={() => handleGetAccess(dispatch)}
      >
        <View>
          <Icon name='Locked' size='sm' color={colors.primary} />
        </View>
        <Typography name='navigation' text={props.title} />
      </Pressable>
    );
  } else if ('to' in props) {
    return (
      <Link asChild href={props.to} style={[styles.container]}>
        <Pressable
          style={({ pressed }) => [pressed && styles.containerPressed]}
          onPress={() => props?.handleLinkPress(props.to)}
        >
          <View>{props.icon && <props.icon />}</View>
          <Typography name='navigation' text={props.title} />
        </Pressable>
      </Link>
    );
  } else if ('links' in props) {
    const { isCollapsed, toggleCollapsed, id } = props;
    return (
      <>
        <Pressable
          style={({ pressed }) => [
            styles.container,
            pressed && styles.containerPressed,
          ]}
          onPress={() => toggleCollapsed(id)}
        >
          <View>{props.icon && <props.icon />}</View>
          <View>
            <Typography
              name={isCollapsed ? 'navigation' : 'navigationBold'}
              text={props.title}
            />
          </View>
        </Pressable>
        <Collapsible collapsed={isCollapsed} align='center'>
          <View style={[styles.linksWrapper]}>
            {props.links.map((link, index) => (
              <View key={index} style={styles.innerLink}>
                <Link asChild href={link.to}>
                  <Pressable
                    style={({ pressed }) => [
                      pressed && styles.containerPressed,
                    ]}
                    onPress={() => props?.handleLinkPress(link.to)}
                  >
                    <View>{link.icon && <link.icon />}</View>
                    <Typography name='navigation' text={link.title} />
                  </Pressable>
                </Link>
              </View>
            ))}
          </View>
        </Collapsible>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    backgroundColor: colors.dashboardGreen,
  },
  containerDisabled: {
    opacity: 0.4,
  },
  containerPressed: {
    opacity: 0.6,
  },
  linksWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 2,
    backgroundColor: colors.dashboardGreen,
  },
  innerLink: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 69,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightContrast25,
  },
  title: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: colors.black,
  },
  titleOpened: {
    fontWeight: 'bold',
  },
});
