import { Typography } from "@/components/typography";
import { FC } from "react";
import { View } from "react-native";
interface Props {}
export const ListTable: FC<Props> = ({}) => {
  return (
    <View>
      <View>
        <Typography name="tableHeader" text="Hose ID" />
        <Typography name="tableHeader" text="Position/Condition" />
        <Typography name="tableHeader" text="Hose ID" />
      </View>
    </View>
  );
};
