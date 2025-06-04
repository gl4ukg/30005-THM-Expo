import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Pressable } from 'react-native';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography';
import * as WebBrowser from 'expo-web-browser';
import RNBlobUtil from 'react-native-blob-util';

interface BrowserPdfViewerProps {
  uri: string;
  fileName?: string;
  onClose: () => void;
  showDownload?: boolean;
}

export const BrowserPdfViewer: React.FC<BrowserPdfViewerProps> = ({
  uri,
  fileName = 'document.pdf',
  onClose,
  showDownload = true,
}) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const downloadFileName = fileName.endsWith('.pdf')
        ? fileName
        : `${fileName}.pdf`;
      const downloadPath = `${RNBlobUtil.fs.dirs.DownloadDir}/${downloadFileName}`;

      await RNBlobUtil.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mime: 'application/pdf',
          description: 'Downloading PDF document',
          path: downloadPath,
        },
      }).fetch('GET', uri);

      Alert.alert('Success', 'Document downloaded successfully!');
    } catch (error) {
      console.error('Error downloading document:', error);
      Alert.alert('Error', 'Failed to download document.');
    } finally {
      setDownloading(false);
    }
  };

  const handleOpenExternal = async () => {
    try {
      await WebBrowser.openBrowserAsync(uri);
    } catch (error) {
      console.error('Error opening browser:', error);
      Alert.alert('Error', 'Failed to open document in browser.');
    }
  };

  // For web viewing, we'll use Google Docs viewer as a fallback
  const webViewUri = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(uri)}`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: webViewUri }}
        style={styles.webview}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
        }}
        onLoadStart={() => console.log('Loading PDF...')}
        onLoadEnd={() => console.log('PDF loaded')}
        startInLoadingState={true}
        scalesPageToFit={true}
      />

      <View style={styles.toolbar}>
        <Pressable onPress={onClose} style={styles.toolbarButton}>
          <Icon name='Cross' size='sm' color='white' />
          <Typography name='button' style={styles.toolbarButtonText}>
            Close
          </Typography>
        </Pressable>

        <Pressable onPress={handleOpenExternal} style={styles.toolbarButton}>
          <Icon name='Upload' size='sm' color='white' />
          <Typography name='button' style={styles.toolbarButtonText}>
            Open in Browser
          </Typography>
        </Pressable>

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
  webview: {
    flex: 1,
  },
  toolbar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  toolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    minWidth: 80,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  toolbarButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
});

export default BrowserPdfViewer;
