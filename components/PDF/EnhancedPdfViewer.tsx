import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../Typography';
import { Icon } from '../Icon/Icon';
import Pdf from 'react-native-pdf';
import RNBlobUtil from 'react-native-blob-util';
import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';
import { colors } from '@/lib/tokens/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface PdfViewerProps {
  uri: string;
  fileName?: string;
  onClose: () => void;
}

export const EnhancedPdfViewer: React.FC<PdfViewerProps> = ({
  uri,
  fileName = 'document.pdf',
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [downloading, setDownloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfSource, setPdfSource] = useState<{
    uri: string;
    cache?: boolean;
  } | null>(null);

  useEffect(() => {
    validateAndPrepareUri();
  }, [uri]);

  const validateAndPrepareUri = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if URI is valid
      if (!uri || uri.trim() === '') {
        throw new Error('No PDF URI provided');
      }

      console.log('Validating PDF URI:', uri);

      // For local files, ensure they exist
      if (uri.startsWith('file://')) {
        const fileExists = await RNBlobUtil.fs.exists(
          uri.replace('file://', ''),
        );
        if (!fileExists) {
          throw new Error('PDF file not found');
        }
      }

      // For HTTPS URLs, try to download and cache locally for better reliability
      if (uri.startsWith('https://')) {
        try {
          console.log('Caching HTTPS PDF locally...');
          const cacheDir = RNBlobUtil.fs.dirs.CacheDir;
          const fileName = `cached_pdf_${Date.now()}.pdf`;
          const localPath = `${cacheDir}/${fileName}`;

          const response = await RNBlobUtil.config({
            fileCache: true,
            path: localPath,
          }).fetch('GET', uri);

          console.log('PDF cached at:', response.path());
          setPdfSource({ uri: `file://${response.path()}`, cache: false });
          return;
        } catch (downloadError) {
          console.warn('Caching failed, using direct URL:', downloadError);
        }
      }

      setPdfSource({ uri, cache: true });
    } catch (err) {
      console.error('PDF validation failed:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load PDF';

      if (errorMessage.includes('SSL') || errorMessage.includes('TLS')) {
        setError('SSL/TLS certificate error. Please try opening in browser.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const downloadFileName = fileName.endsWith('.pdf')
        ? fileName
        : `${fileName}.pdf`;
      const downloadPath = `${RNBlobUtil.fs.dirs.DownloadDir}/${downloadFileName}`;

      const response = await RNBlobUtil.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: 'application/pdf',
          description: 'Downloading PDF document',
          path: downloadPath,
        },
        trusty: true,
      }).fetch('GET', uri);

      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(response.path());
      }

      Alert.alert('Success', 'Document downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download document.');
    } finally {
      setDownloading(false);
    }
  };

  const handleRetry = () => {
    validateAndPrepareUri();
  };

  const handleOpenInBrowser = async () => {
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      console.error('Error opening browser:', error);
      Alert.alert('Error', 'Failed to open document in browser.');
    }
  };

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Icon name='Cross' size='lg' color={colors.error} />
      <Typography name='sectionHeader' style={styles.errorTitle}>
        Failed to Load PDF
      </Typography>
      <Typography name='sectionText' style={styles.errorMessage}>
        {error}
      </Typography>

      <View style={styles.errorActions}>
        <Pressable onPress={handleRetry} style={styles.retryButton}>
          <Icon name='Upload' size='sm' color='white' />
          <Typography name='button' style={styles.retryButtonText}>
            Retry
          </Typography>
        </Pressable>
      </View>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color={colors.primary} />
      <Typography name='sectionText' style={styles.loadingText}>
        Loading PDF...
      </Typography>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && renderLoading()}
      {error && renderError()}
      {!loading && !error && pdfSource && (
        <>
          <Pdf
            source={pdfSource}
            style={styles.pdf}
            onLoadComplete={(numberOfPages) => {
              console.log('PDF loaded, pages:', numberOfPages);
              setTotalPages(numberOfPages);
              setCurrentPage(1);
              setLoading(false);
              setError(null);
            }}
            onPageChanged={(page) => {
              setCurrentPage(page);
            }}
            onError={(error: any) => {
              console.error('PDF load error:', error);
              setLoading(false);
            }}
            enablePaging={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />

          <View
            style={[styles.topToolbarContainer, { paddingTop: insets.top }]}
          >
            <View style={styles.topToolbar}>
              <Pressable onPress={onClose} style={styles.toolbarButton}>
                <Icon name='Cross' size='sm' color='white' />
                <Typography name='button' style={styles.toolbarButtonText}>
                  Close
                </Typography>
              </Pressable>

              <View style={styles.pageInfo}>
                <Typography name='button' style={styles.pageText}>
                  {totalPages > 0
                    ? `${currentPage} / ${totalPages}`
                    : 'Loading...'}
                </Typography>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.bottomToolbarContainer,
              { paddingBottom: insets.bottom },
            ]}
          >
            <View style={styles.bottomToolbar}>
              <Pressable
                onPress={handleDownload}
                style={[
                  styles.toolbarButton,
                  downloading && styles.disabledButton,
                ]}
                disabled={downloading}
              >
                <Icon name='Download' size='sm' color='white' />
                <Typography name='button' style={styles.toolbarButtonText}>
                  {downloading ? 'Downloading...' : 'Download'}
                </Typography>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pdf: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'white',
  },
  topToolbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10,
  },
  topToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bottomToolbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10,
  },
  bottomToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  toolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    minWidth: 100,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  toolbarButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  pageInfo: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  pageText: {
    color: 'white',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  errorTitle: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.errorText,
  },
  errorMessage: {
    textAlign: 'center',
    color: colors.errorText,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  errorActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 15,
    textAlign: 'center',
    color: colors.secondary50,
  },
});

export default EnhancedPdfViewer;
