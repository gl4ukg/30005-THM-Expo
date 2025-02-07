import { Icon } from "@/components/Icon/Icon";
import { Typography } from "@/components/typography";
import { FC, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Option<T> = {
  icon?: FC<any>;
  label: string;
  value: T;
};
interface Props<T> {
  menuTitle?: string;
  selected: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}

export const Select: FC<Props<string>> = ({
  selected,
  options,
  onChange,
  menuTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };
  return (
    <View>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={style.button}>
        <Text style={style.buttonText}>
          {menuTitle
            ? menuTitle
            : options.find((o) => o.value === selected)?.label}
        </Text>
        {isOpen ? (
          <Icon name="Up" color="#009640" />
        ) : (
          <Icon name="Down" color="#009640" />
        )}
      </Pressable>
      <Modal visible={isOpen} transparent>
        <Pressable onPress={() => setIsOpen(false)} style={style.modal}>
          <View style={style.options}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleChange(option.value)}
              >
                <View key={option.value} style={style.option}>
                  {option.icon && <option.icon />}
                  <Typography name="navigation" text={option.label} />
                </View>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  modal: {
    flex: 1,
    position: "relative",
    backgroundColor: "#00000075",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonText: {
    color: "#009640",
  },
  options: {
    backgroundColor: "#BDECB9",
    width: "90%",
    position: "absolute",
    top: "20%",
    left: 20,
    right: 20,
    padding: 20,
    gap: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: "#009640",
    borderBottomColor: "#009640",
  },
  option: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
});
