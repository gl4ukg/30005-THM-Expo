import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  slug: string;
}

const Host: React.FC<Props> = (props) => {
  console.log({ props });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hosse 1{props.slug}</Text>
      <Text>Hosse 1{props.slug}</Text>
    </SafeAreaView>
  );
};

export default Host;
