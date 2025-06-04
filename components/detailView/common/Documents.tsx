import React from 'react';
import { colors } from '@/lib/tokens/colors';
import {
  Pressable,
  StyleSheet,
  View,
  Modal,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';
import { Bookmark } from './Bookmark';
import * as DocumentPicker from 'expo-document-picker';
import * as WebBrowser from 'expo-web-browser';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import RNBlobUtil from 'react-native-blob-util';
import { EnhancedPdfViewer } from '../../PDF/EnhancedPdfViewer';

interface DocumentData {
  id: string;
  name: string;
  uri?: string;
  mimeType?: string;
}

interface DocumentProps extends DocumentData {
  onViewInApp: (uri?: string) => void;
  onOpenInBrowser: (uri?: string) => void;
  onDownload: (uri?: string, name?: string) => void;
}

const DocumentItem: React.FC<DocumentProps> = ({
  id,
  name,
  uri,
  onViewInApp,
  onOpenInBrowser,
  onDownload,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMainPress = () => {
    setShowOptions(!showOptions);
  };

  return (
    <View style={styles.documentItemContainer}>
      <Pressable onPress={handleMainPress} style={styles.documentItem}>
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
        <Icon name='Menu' size='sm' color={colors.primary} />
      </Pressable>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <Pressable
            style={styles.optionButton}
            onPress={() => {
              onViewInApp(uri);
              setShowOptions(false);
            }}
          >
            <Icon name='Eye' size='xsm' color={colors.primary} />
            <Typography name='button' style={styles.optionText}>
              View in App
            </Typography>
          </Pressable>

          <Pressable
            style={styles.optionButton}
            onPress={() => {
              onOpenInBrowser(uri);
              setShowOptions(false);
            }}
          >
            <Icon name='Upload' size='xsm' color={colors.primary} />
            <Typography name='button' style={styles.optionText}>
              Open in Browser
            </Typography>
          </Pressable>

          <Pressable
            style={styles.optionButton}
            onPress={() => {
              onDownload(uri, name);
              setShowOptions(false);
            }}
          >
            <Icon name='Download' size='xsm' color={colors.primary} />
            <Typography name='button' style={styles.optionText}>
              Download
            </Typography>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

  const handleViewInApp = async (uri?: string) => {
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

  const handleOpenInBrowser = async (uri?: string) => {
    if (!uri || uri.length === 0) {
      Alert.alert('Error', 'Document URI is not available.');
      return;
    }

    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      console.error('Error opening browser:', error);
      Alert.alert('Error', 'Failed to open document in browser.');
    }
  };

  const handleDownload = async (uri?: string, name?: string) => {
    if (!uri || uri.length === 0) {
      Alert.alert('Error', 'Document URI is not available.');
      return;
    }

    try {
      const fileName = name || 'document.pdf';
      const downloadPath = `${RNBlobUtil.fs.dirs.DownloadDir}/${fileName}`;

      const response = await RNBlobUtil.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: 'application/pdf',
          description: 'Downloading PDF document',
          path: downloadPath,
        },
      }).fetch('GET', uri);

      if (Platform.OS === 'ios') {
        // For iOS, use the sharing API
        await Sharing.shareAsync(response.path());
      }

      Alert.alert('Success', `Document downloaded successfully!`);
    } catch (error) {
      console.error('Error downloading document:', error);
      Alert.alert('Error', 'Failed to download document.');
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
          const newDocument: DocumentData = {
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
        {documents.map((doc: DocumentData) => (
          <DocumentItem
            key={doc.id}
            id={doc.id}
            name={doc.name}
            uri={doc.uri}
            mimeType={doc.mimeType}
            onViewInApp={handleViewInApp}
            onOpenInBrowser={handleOpenInBrowser}
            onDownload={handleDownload}
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
            showDownload={true}
            showBrowserButton={true}
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
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    marginLeft: 10,
    color: colors.primary,
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
