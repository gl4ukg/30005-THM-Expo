import { colors } from '@/lib/tokens/colors';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '../Icon/Icon';
import { Typography } from '../typography';
import { Bookmark } from './common/Bookmark';

interface DocumentProps {
  id: string;
  name: string;
}

const DocumentItem: React.FC<DocumentProps> = ({ id, name }) => {
  return (
    <View style={styles.documentItem}>
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
    </View>
  );
};

export const Documents = () => {
  const documents = [
    { id: 'DOC-001', name: 'Hose Certificate' },
    { id: 'DOC-002', name: 'Inspection Report' },
    { id: 'DOC-003', name: 'Maintenance Log' },
  ];

  return (
    <View>
      <Bookmark title='Documents' />
      {documents.map((doc) => (
        <DocumentItem key={doc.id} id={doc.id} name={doc.name} />
      ))}
      <Pressable style={styles.addDocumentButton}>
        <Icon name='Plus' size='xsm' color={colors.primary} />
        <Typography name='button' style={styles.addDocumentButtonText}>
          Add document
        </Typography>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
