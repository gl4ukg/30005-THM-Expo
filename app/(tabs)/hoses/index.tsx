import { Link } from "expo-router";
import { Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Hoses = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>hoses</Text>
      <FlatList
        data={[1, 2, 3, 4, 5].map((item) => ({ id: item }))}
        renderItem={({ item }) => (
          <Link
            style={{ margin: 10, padding: 30, backgroundColor: "red" }}
            href={`/(tabs)/hoses/hose/${item.id}`}
          >
            Hose {item.id}
          </Link>
        )}
      />
    </SafeAreaView>
  );
};
export default Hoses;
