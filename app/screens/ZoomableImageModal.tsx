// app/screens/ZoomableImageModal.tsx
import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

interface ZoomableImageModalProps {
  visible: boolean;
  onClose: () => void;
  imageUri: string;
}

export default function ZoomableImageModal({
  visible,
  onClose,
  imageUri,
}: ZoomableImageModalProps) {
  const images = [{ url: imageUri }];

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          onSwipeDown={onClose}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000E6',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: '#00000099',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
