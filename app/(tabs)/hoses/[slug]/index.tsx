import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  slug: string;
}

const Host: React.FC<Props> = (props) => {
  const { slug } = useLocalSearchParams();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hosse {slug}</Text>
      <Text>Hosse {slug}</Text>
    </SafeAreaView>
  );
};

export default Host;
