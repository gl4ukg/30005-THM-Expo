import { Link } from 'expo-router';
import { Text, FlatList } from 'react-native';

const Hoses = () => {
  return (
    <>
      <Text>hoses</Text>
      <FlatList
        data={[1, 2, 3, 4, 5].map((item) => ({ id: item }))}
        renderItem={({ item }) => (
          <Link
            style={{ margin: 10, padding: 30, backgroundColor: 'red' }}
            href={`/(tabs)/dashbord/hoses/hose/${item.id}`}
          >
            Hose {item.id}
          </Link>
        )}
      />
    </>
  );
};
export default Hoses;
