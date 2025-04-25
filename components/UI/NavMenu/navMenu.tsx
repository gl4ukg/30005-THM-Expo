import {
  type NavElementsType,
  NavElement,
} from '@/components/UI/NavMenu/navElement';
import { colors } from '@/lib/tokens/colors';
import { Href } from 'expo-router';
import { FC, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

/**
 * NavMenu component
 *
 * @description A navigation menu component that displays a list of navigation elements.
 * @param {NavElementsType[]} elements - An array of navigation elements to display.
 * @param {function} handleLinkPress - A callback function to handle link presses.
 *        
  *  @example
  *  elements={[
        title: 'Non Collapsible Title / Link',
        to: '/existing-route',
        icon: () => <Icon name='Inspect' color={colors.primary} />,
      },
      {
        id: 'Inspection',
        title: 'Collapsible Title / List of links',
        icon: () => <Icon name='Search' color={colors.primary} />,
        links: [
          {
            title: 'Inspect',
            to: '/',
          },
          {
            title: 'Edit hose data',
            to: '/(app)/user',
          }
        ],
      },
 */
export const NavMenu: FC<{
  /**
   * Navigation elements to display.
   */
  elements: NavElementsType[];

  handleLinkPress: (to: Href) => void;
}> = ({ elements, handleLinkPress }) => {
  const collapsable = elements.filter((element) => 'links' in element);
  const [areCollapsed, updateAreCollapsed] = useState<Record<string, boolean>>(
    collapsable.reduce(
      (acc, element) => {
        acc[element.id] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const toggleCollapsed = (id: string) => {
    const nowState = areCollapsed[id];
    if (nowState === false) {
      return updateAreCollapsed({
        ...areCollapsed,
        [id]: true,
      });
    } else {
      let newAreCollapsed = { ...areCollapsed };
      Object.keys(newAreCollapsed).forEach((key) => {
        if (key !== id) {
          newAreCollapsed[key] = true;
        } else {
          newAreCollapsed[key] = false;
        }
      });
      updateAreCollapsed(newAreCollapsed);
    }
  };
  return (
    <ScrollView style={styles.list}>
      {elements.map((element) => {
        if ('links' in element) {
          return (
            <NavElement
              key={element.id}
              id={element.id}
              isCollapsed={areCollapsed[element.id]}
              toggleCollapsed={toggleCollapsed}
              title={element.title}
              icon={element.icon}
              links={element.links}
              handleLinkPress={handleLinkPress}
            />
          );
        } else {
          return (
            <NavElement
              key={element.title}
              title={element.title}
              icon={element.icon}
              to={element.to}
              handleLinkPress={() => handleLinkPress(element.to)}
            />
          );
        }
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    minWidth: 300,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 50,
    marginBottom: 40,
    borderTopWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.dashboardGreen,
  },
});
