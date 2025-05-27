import React from 'react';
import { colors } from '@/lib/tokens/colors';
import { Pressable, StyleSheet, View, Modal, Dimensions } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';
import { Bookmark } from './Bookmark';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import Pdf from 'react-native-pdf';

interface DocumentProps {
  id: string;
  name: string;
  uri?: string;
  mimeType?: string;
  onPress: (uri?: string) => void;
}

const DocumentItem: React.FC<DocumentProps> = ({ id, name, uri, onPress }) => {
  return (
    <Pressable onPress={() => onPress(uri)} style={styles.documentItem}>
      <Icon name='Document' size='sm' color={colors.primary} />
      <View>
        <Typography
          name='fieldValue'
          numberOfLines={2}
          style={styles.documentText}
        >
          {id} - {name}
        </Typography>
      </View>
    </Pressable>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PdfViewer: React.FC<{ uri: string; onClose: () => void }> = ({
  uri,
  onClose,
}) => {
  return (
    <View style={pdfViewerStyles.container}>
      <Pdf
        source={{ uri, cache: true }}
        style={pdfViewerStyles.pdf}
        onError={(error) => {
          console.error('Error loading PDF:', error);
        }}
      />
      <Pressable onPress={onClose} style={pdfViewerStyles.closeButton}>
        <Typography name='button' style={pdfViewerStyles.closeButtonText}>
          Close PDF
        </Typography>
      </Pressable>
    </View>
  );
};

export const Documents = () => {
  const initialDocuments: Array<Omit<DocumentProps, 'onPress'>> = [
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

  const handleDocumentPress = async (uri?: string) => {
    if (!uri || uri.length === 0) {
      console.log('Document URI is not available or empty.');
      return;
    }

    if (
      uri.startsWith('http://') ||
      uri.startsWith('https://') ||
      uri.startsWith('file://')
    ) {
      setSelectedPdfUri(uri);
      setIsPdfVisible(true);
    } else {
      console.warn('Unsupported URI scheme for PDF viewer:', uri);
    }
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

        if (
          typeof asset.name !== 'string' ||
          typeof asset.uri !== 'string' ||
          asset.uri.length === 0
        ) {
          console.error('Picked asset has invalid name or empty URI:', asset);
          return;
        }

        setDocuments((prevDocuments) => {
          const newId = `DOC-${String(prevDocuments.length + 1).padStart(3, '0')}`;
          const newDocument: Omit<DocumentProps, 'onPress'> = {
            id: newId,
            name: asset.name,
            uri: asset.uri,
            mimeType: asset.mimeType || 'application/pdf',
          };
          return [newDocument, ...prevDocuments];
        });
      } else {
        if (result.canceled) {
          console.log('Document picking was cancelled by the user.');
        } else {
          console.log('Document picking did not return any assets.');
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Bookmark title='Documents' />
      <View>
        {documents.map((doc: Omit<DocumentProps, 'onPress'>) => (
          <DocumentItem
            key={doc.id}
            id={doc.id}
            name={doc.name}
            uri={doc.uri}
            mimeType={doc.mimeType}
            onPress={handleDocumentPress}
          />
        ))}
      </View>
      <Pressable style={styles.addDocumentButton} onPress={handleAddDocument}>
        <Icon name='Plus' size='xsm' color={colors.primary} />
        <Typography name='button' style={styles.addDocumentButtonText}>
          Add document
        </Typography>
      </Pressable>

      <Modal visible={isPdfVisible} onRequestClose={handleClosePdfViewer}>
        {selectedPdfUri && (
          <PdfViewer uri={selectedPdfUri} onClose={handleClosePdfViewer} />
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
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  documentText: {
    marginLeft: 10,
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
const pdfViewerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.8,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default Documents;
