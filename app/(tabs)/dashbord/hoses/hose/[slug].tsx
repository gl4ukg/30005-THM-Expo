import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockedData } from '../[filter]/mocked';
import React, { useRef } from 'react';
import DetailsHeader from '@/components/detailView/DetailsHeader';
import GeneralInfo from '@/components/detailView/GeneralInfo';
import Photos from '@/components/detailView/Photos';
import HoseModule from '@/components/detailView/HoseModule';
import TessPartNumbers from '@/components/detailView/TessPartNumbers';
import MaintananceInfo from '@/components/detailView/MaintananceInfo';
import Documents from '@/components/detailView/Documents';
import Structure from '@/components/detailView/Structure';
import HistoryView from '@/components/detailView/History';

export type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const HoseDetails = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const photosRef = useRef<View>(null);
  const hoseModuleRef = useRef<View>(null);
  const tessPartNumbersRef = useRef<View>(null);
  const maintenanceInfoRef = useRef<View>(null);
  const documentsRef = useRef<View>(null);
  const structureRef = useRef<View>(null);
  const historyRef = useRef<View>(null);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const hoseData = mockedData.find((hose) => hose.id === id);

  if (!hoseData) {
    return <Text>Hose not found</Text>;
  }

  const checkMissingData = (hose: any): boolean => {
    return Object.values(hose).some(
      (value) => value === null || value === undefined || value === '',
    );
  };

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    switch (sectionId) {
      case 'photos':
        photosRef.current?.measure((x, y, width, height, pageX, pageY) => {
          scrollViewRef.current?.scrollTo({ y: pageY, animated: true });
        });
        break;
      case 'hoseModule':
        hoseModuleRef.current?.measure((x, y, width, height, pageX, pageY) => {
          scrollViewRef.current?.scrollTo({ y: pageY, animated: true });
        });
        break;
      case 'tessPartNumbers':
        tessPartNumbersRef.current?.measure(
          (x, y, width, height, pageX, pageY) => {
            scrollViewRef.current?.scrollTo({ y: pageY, animated: true });
          },
        );
        break;
      case 'maintenanceInfo':
        maintenanceInfoRef.current?.measure(
          (x, y, width, height, pageX, pageY) => {
            scrollViewRef.current?.scrollTo({ y: pageY, animated: true });
          },
        );
        break;
      case 'documents':
        documentsRef.current?.measure((x, y, width, height, pageX, pageY) => {
          scrollViewRef.current?.scrollTo({ y: pageY, animated: true });
        });
        break;
      case 'structure':
        structureRef.current?.measure((x, y, width, height, pageX, pageY) => {
          scrollViewRef.current?.scrollTo({ y: pageY, animated: true });
        });
        break;
      case 'history':
        historyRef.current?.measure((x, y, width, height, pageX, pageY) => {
          scrollViewRef.current?.scrollTo({ y: pageY, animated: true });
        });
        break;
      default:
        break;
    }
  };

  const shortcuts: Section[] = [
    {
      id: 'photos',
      title: 'Photos',
      content: (
        <View ref={photosRef}>
          <Photos />
        </View>
      ),
    },
    {
      id: 'hoseModule',
      title: 'Hose module',
      content: (
        <View ref={hoseModuleRef}>
          <HoseModule />
        </View>
      ),
    },
    {
      id: 'tessPartNumbers',
      title: 'TESS Part Numbers',
      content: (
        <View ref={tessPartNumbersRef}>
          <TessPartNumbers />
        </View>
      ),
    },
    {
      id: 'maintenanceInfo',
      title: 'Maintenance info',
      content: (
        <View ref={maintenanceInfoRef}>
          <MaintananceInfo />
        </View>
      ),
    },
    {
      id: 'documents',
      title: 'Documents',
      content: (
        <View ref={documentsRef}>
          <Documents />
        </View>
      ),
    },
    {
      id: 'structure',
      title: 'Structure',
      content: (
        <View ref={structureRef}>
          <Structure />
        </View>
      ),
    },
    {
      id: 'history',
      title: 'History',
      content: (
        <View ref={historyRef}>
          <HistoryView />
        </View>
      ),
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <DetailsHeader
        id={hoseData.id}
        date={hoseData.prodDate}
        missingData={checkMissingData(hoseData)}
        shortcuts={shortcuts}
        scrollToSection={scrollToSection}
      />
      <ScrollView ref={scrollViewRef}>
        <GeneralInfo
          description={hoseData.Description}
          customerId={hoseData.customerId}
          s1PlantVesselUnit={hoseData.s1PlantVesselUnit}
          S2Equipment={hoseData.S2Equipment}
          equipmentSubunit={hoseData.equipmentSubunit}
          otherInfo={hoseData.otherInfo}
          RFid={hoseData.RFid}
        />
        {shortcuts.map((section) => (
          <View key={section.id}>{section.content}</View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HoseDetails;
