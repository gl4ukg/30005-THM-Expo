import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  Pressable,
} from 'react-native';
import { Typography } from '../Typography';
import { Icon } from '../Icon/Icon';
import Pdf from 'react-native-pdf';
import RNBlobUtil from 'react-native-blob-util';
import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface PdfViewerProps {
  uri: string;
  fileName?: string;
  onClose: () => void;
  showDownload?: boolean;
  showBrowserButton?: boolean;
}

export const EnhancedPdfViewer: React.FC<PdfViewerProps> = ({
  uri,
  fileName = 'document.pdf',
  onClose,
  showDownload = true,
  showBrowserButton = true,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
      }).fetch('GET', uri);

      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(response.path());
      }

      Alert.alert('Success', 'Document downloaded successfully!');
    } catch (error) {
      console.error('Error downloading document:', error);
      Alert.alert('Error', 'Failed to download document.');
    } finally {
      setDownloading(false);
    }
  };

  const handleOpenInBrowser = async () => {
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      console.error('Error opening browser:', error);
      Alert.alert('Error', 'Failed to open document in browser.');
    }
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri, cache: true }}
        style={styles.pdf}
        onLoadComplete={(numberOfPages) => {
          setTotalPages(numberOfPages);
        }}
        onPageChanged={(page) => {
          setCurrentPage(page);
        }}
        onError={(error: any) => {
          console.error('Error loading PDF:', error);
          Alert.alert('Error', 'Failed to load PDF document.');
        }}
      />

      <View style={styles.topToolbar}>
        <Pressable onPress={onClose} style={styles.toolbarButton}>
          <Icon name='Cross' size='sm' color='white' />
          <Typography name='button' style={styles.toolbarButtonText}>
            Close
          </Typography>
        </Pressable>

        <View style={styles.pageInfo}>
          <Typography name='button' style={styles.pageText}>
            {totalPages > 0 ? `${currentPage} / ${totalPages}` : 'Loading...'}
          </Typography>
        </View>
      </View>

      <View style={styles.bottomToolbar}>
        {showBrowserButton && (
          <Pressable onPress={handleOpenInBrowser} style={styles.toolbarButton}>
            <Icon name='Upload' size='sm' color='white' />
            <Typography name='button' style={styles.toolbarButtonText}>
              Browser
            </Typography>
          </Pressable>
        )}

        {showDownload && (
          <Pressable
            onPress={handleDownload}
            style={[styles.toolbarButton, downloading && styles.disabledButton]}
            disabled={downloading}
          >
            <Icon name='Download' size='sm' color='white' />
            <Typography name='button' style={styles.toolbarButtonText}>
              {downloading ? 'Downloading...' : 'Download'}
            </Typography>
          </Pressable>
        )}
      </View>
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
  topToolbar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  bottomToolbar: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
});

export default EnhancedPdfViewer;
