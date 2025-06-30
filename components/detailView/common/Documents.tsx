import React from 'react';
import { colors } from '@/lib/tokens/colors';
import { Pressable, StyleSheet, View, Modal, Alert } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';
import { Bookmark } from './Bookmark';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { EnhancedPdfViewer } from '../../PDF/EnhancedPdfViewer';

interface DocumentData {
  id: string;
  name: string;
  uri?: string;
  mimeType?: string;
}

interface DocumentProps extends DocumentData {
  onViewInApp: (uri?: string) => void;
}

const DocumentItem: React.FC<DocumentProps> = ({
  id,
  name,
  uri,
  onViewInApp,
}) => {
  const handlePress = () => {
    onViewInApp(uri);
  };

  return (
    <View style={styles.documentItemContainer}>
      <Pressable onPress={handlePress} style={styles.documentItem}>
        <Icon name='Document' size='sm' color={colors.primary} />
        <View style={styles.documentTextContainer}>
          <Typography
            name='fieldValue'
            numberOfLines={2}
            style={styles.documentText}
          >
            {id} - {name}
          </Typography>
        </View>
        <Icon name='ChevronRight' size='sm' color={colors.primary} />
      </Pressable>
    </View>
  );
};

export const Documents = () => {
  const initialDocuments: Array<DocumentData> = [
    {
      id: 'DOC-001',
      name: 'Hose Certificate',
      uri: 'https://www.uio.no/studier/emner/matnat/ifi/IN1000/h24/ressurser-per-uke/uke07/kort-fra-uke-7---introduksjon-til-oo.pdf',
    },
    {
      id: 'DOC-002',
      name: 'Inspection Report',
      uri: 'https://www.uio.no/studier/emner/matnat/ifi/IN1000/h24/ressurser-per-uke/uke07/kort-fra-uke-7---introduksjon-til-oo.pdf',
    },
    {
      id: 'DOC-003',
      name: 'Maintenance Log',
      uri: 'https://www.uio.no/studier/emner/matnat/ifi/IN1000/h24/ressurser-per-uke/uke07/kort-fra-uke-7---introduksjon-til-oo.pdf',
    },
  ];

  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedPdfUri, setSelectedPdfUri] = useState<string | null>(null);
  const [isPdfVisible, setIsPdfVisible] = useState(false);

  const handleViewInApp = (uri?: string) => {
    if (!uri) {
      Alert.alert('Error', 'Document URI is not available.');
      return;
    }

    setSelectedPdfUri(uri);
    setIsPdfVisible(true);
  };

  const handleClosePdfViewer = () => {
    setIsPdfVisible(false);
    setSelectedPdfUri(null);
  };

  const handleAddDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        if (!asset.name || !asset.uri) {
          console.error('Picked asset has invalid name or URI:', asset);
          return;
        }

        setDocuments((prevDocuments) => {
          const newId = `DOC-${String(prevDocuments.length + 1).padStart(3, '0')}`;
          const newDocument: DocumentData = {
            id: newId,
            name: asset.name,
            uri: asset.uri,
            mimeType: asset.mimeType || 'application/pdf',
          };
          return [newDocument, ...prevDocuments];
        });
      } else {
        console.log('Document picking was cancelled or no assets returned.');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Bookmark title='Documents' />
      <View>
        {documents.map((doc: DocumentData) => (
          <DocumentItem
            key={doc.id}
            id={doc.id}
            name={doc.name}
            uri={doc.uri}
            mimeType={doc.mimeType}
            onViewInApp={handleViewInApp}
          />
        ))}
      </View>
      <Pressable style={styles.addDocumentButton} onPress={handleAddDocument}>
        <Icon name='Plus' size='xsm' color={colors.primary} />
        <Typography name='button' style={styles.addDocumentButtonText}>
          Add document
        </Typography>
      </Pressable>

      <Modal
        visible={isPdfVisible}
        onRequestClose={handleClosePdfViewer}
        presentationStyle='fullScreen'
      >
        {selectedPdfUri && (
          <EnhancedPdfViewer
            uri={selectedPdfUri}
            onClose={handleClosePdfViewer}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 30,
  },
  documentItemContainer: {
    marginBottom: 5,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  documentTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  documentText: {
    marginLeft: 0,
  },
  addDocumentButton: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginLeft: 20,
  },
  addDocumentButtonText: {
    color: colors.primary,
    marginLeft: 5,
  },
});

export default Documents;
