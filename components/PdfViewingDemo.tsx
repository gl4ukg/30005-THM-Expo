import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Typography } from './Typography';
import { colors } from '@/lib/tokens/colors';
import { Documents } from './detailView/common/Documents';

export const PdfViewingDemo = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Typography name='sectionHeader' style={styles.headerText}>
          PDF Viewing Demo
        </Typography>
        <Typography name='sectionText' style={styles.descriptionText}>
          This demo shows two different ways to view and download PDF documents:
        </Typography>

        <View style={styles.featureList}>
          <Typography name='fieldLabel' style={styles.featureText}>
            📱 In-App Viewer: View PDFs directly within the React Native app
            with download capability
          </Typography>
          <Typography name='fieldLabel' style={styles.featureText}>
            🌐 Browser Viewer: Open PDFs in the device's default browser
          </Typography>
          <Typography name='fieldLabel' style={styles.featureText}>
            📥 Download: Save PDF files directly to the device
          </Typography>
        </View>

        <Typography name='sectionText' style={styles.instructionText}>
          Tap on any document below, then choose your preferred viewing option:
        </Typography>
      </View>

      <Documents />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: {
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  descriptionText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  featureList: {
    marginVertical: 15,
  },
  featureText: {
    marginVertical: 8,
    paddingLeft: 10,
  },
  instructionText: {
    marginTop: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#666',
  },
});

export default PdfViewingDemo;
