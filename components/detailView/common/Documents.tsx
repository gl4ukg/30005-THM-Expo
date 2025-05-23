import { colors } from '@/lib/tokens/colors';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '../../Icon/Icon';
import { Typography } from '../../Typography';
import { Bookmark } from './Bookmark';
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
import { useState } from 'react';

interface DocumentProps {
  id: string;
  name: string;
  uri?: string;
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

  const handleDocumentPress = async (uri?: string) => {
    if (uri) {
      try {
        await Linking.openURL(uri);
      } catch (error) {
        console.error('Failed to open document:', error);
      }
    } else {
      console.log(
        'Document URI is not available locally. Implement remote fetching or viewing logic.',
      );
    }
  };

  const handleAddDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        if (typeof asset.name !== 'string' || typeof asset.uri !== 'string') {
          console.error('Picked asset has invalid name or URI:', asset);
          return;
        }

        setDocuments((prevDocuments) => {
          const newId = `DOC-${String(prevDocuments.length + 1).padStart(3, '0')}`;
          const newDocument: Omit<DocumentProps, 'onPress'> = {
            id: newId,
            name: asset.name,
            uri: asset.uri,
          };
          return [...prevDocuments, newDocument];
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
