import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Pressable } from 'react-native';
import { Typography } from '../Typography';
import { Icon } from '../Icon/Icon';
import { colors } from '@/lib/tokens/colors';
import * as WebBrowser from 'expo-web-browser';
import EnhancedPdfViewer from './EnhancedPdfViewer';
import BrowserPdfViewer from './BrowserPdfViewer';

interface PdfDocument {
  id: string;
  name: string;
  uri: string;
  description?: string;
}

export const PdfViewingExample = () => {
  const [selectedPdf, setSelectedPdf] = useState<PdfDocument | null>(null);
  const [viewingMode, setViewingMode] = useState<'enhanced' | 'browser' | null>(
    null,
  );

  const sampleDocuments: PdfDocument[] = [
    {
      id: '1',
      name: 'Sample Technical Manual',
      uri: 'https://www.uio.no/studier/emner/matnat/ifi/IN1000/h24/ressurser-per-uke/uke07/kort-fra-uke-7---introduksjon-til-oo.pdf',
      description: 'A technical manual demonstrating PDF viewing capabilities',
    },
    {
      id: '2',
      name: 'React Native Documentation',
      uri: 'https://reactnative.dev/docs/getting-started',
      description: 'Official React Native documentation (will open in browser)',
    },
  ];

  const handleViewInApp = (document: PdfDocument) => {
    setSelectedPdf(document);
    setViewingMode('enhanced');
  };

  const handleViewInBrowser = (document: PdfDocument) => {
    setSelectedPdf(document);
    setViewingMode('browser');
  };

  const handleOpenDirectly = async (uri: string) => {
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      console.error('Error opening browser:', error);
      Alert.alert('Error', 'Failed to open document in browser.');
    }
  };

  const handleCloseViewer = () => {
    setSelectedPdf(null);
    setViewingMode(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Typography name='sectionHeader' style={styles.title}>
            PDF Viewing Options
          </Typography>
          <Typography name='sectionText' style={styles.subtitle}>
            Choose how you want to view PDF documents
          </Typography>
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.optionCard}>
            <Icon name='Eye' size='lg' color={colors.primary} />
            <Typography name='fieldLabel' style={styles.optionTitle}>
              In-App Viewer
            </Typography>
            <Typography name='fieldValue' style={styles.optionDescription}>
              View PDFs directly within the app with full-screen experience,
              page navigation, and download capability.
            </Typography>
          </View>

          <View style={styles.optionCard}>
            <Icon name='Upload' size='lg' color={colors.primary} />
            <Typography name='fieldLabel' style={styles.optionTitle}>
              Browser Viewer
            </Typography>
            <Typography name='fieldValue' style={styles.optionDescription}>
              Open PDFs in your device's default browser or use WebView for
              embedded viewing.
            </Typography>
          </View>
        </View>

        <View style={styles.documentsSection}>
          <Typography name='sectionHeader' style={styles.sectionTitle}>
            Sample Documents
          </Typography>

          {sampleDocuments.map((doc) => (
            <View key={doc.id} style={styles.documentCard}>
              <View style={styles.documentInfo}>
                <Icon name='Document' size='sm' color={colors.primary} />
                <View style={styles.documentText}>
                  <Typography name='fieldLabel' style={styles.documentName}>
                    {doc.name}
                  </Typography>
                  {doc.description && (
                    <Typography
                      name='fieldValue'
                      style={styles.documentDescription}
                    >
                      {doc.description}
                    </Typography>
                  )}
                </View>
              </View>

              <View style={styles.actionButtons}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleViewInApp(doc)}
                >
                  <Icon name='Eye' size='xsm' color='white' />
                  <Typography name='button' style={styles.buttonText}>
                    App View
                  </Typography>
                </Pressable>

                <Pressable
                  style={[styles.actionButton, styles.browserButton]}
                  onPress={() => handleViewInBrowser(doc)}
                >
                  <Icon name='Upload' size='xsm' color='white' />
                  <Typography name='button' style={styles.buttonText}>
                    Browser
                  </Typography>
                </Pressable>

                <Pressable
                  style={[styles.actionButton, styles.directButton]}
                  onPress={() => handleOpenDirectly(doc.uri)}
                >
                  <Icon name='Upload' size='xsm' color='white' />
                  <Typography name='button' style={styles.buttonText}>
                    Direct
                  </Typography>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Enhanced PDF Viewer Modal */}
      <Modal
        visible={viewingMode === 'enhanced' && selectedPdf !== null}
        onRequestClose={handleCloseViewer}
        presentationStyle='fullScreen'
      >
        {selectedPdf && (
          <EnhancedPdfViewer
            uri={selectedPdf.uri}
            fileName={selectedPdf.name}
            onClose={handleCloseViewer}
            showDownload={true}
            showBrowserButton={true}
          />
        )}
      </Modal>

      {/* Browser PDF Viewer Modal */}
      <Modal
        visible={viewingMode === 'browser' && selectedPdf !== null}
        onRequestClose={handleCloseViewer}
        presentationStyle='fullScreen'
      >
        {selectedPdf && (
          <BrowserPdfViewer
            uri={selectedPdf.uri}
            fileName={selectedPdf.name}
            onClose={handleCloseViewer}
            showDownload={true}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
  },
  optionsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  optionCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionTitle: {
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  optionDescription: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  documentsSection: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 15,
    color: colors.primary,
  },
  documentCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  documentText: {
    flex: 1,
    marginLeft: 12,
  },
  documentName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  browserButton: {
    backgroundColor: '#2196F3',
  },
  directButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default PdfViewingExample;
