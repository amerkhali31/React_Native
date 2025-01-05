// app/screens/AnnouncementScreen.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';

import BaseBackground from '../../components/BaseBackground';
// Suppose our DataManager is replaced by a custom hook or global store
// We'll just mock an array of images for demonstration.

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AnnouncementScreen() {
  // If you had DataManager.urlImages as base64 or local URIs, store them in an array
  const [images, setImages] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = images.length;

  // For zoom modal
  const [zoomVisible, setZoomVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Mimic fetching from DataManager.urlImages
    // e.g. setImages(DataManager.urlImages)
    // For a quick example:
    setImages([
      'https://via.placeholder.com/300x300/09f/fff.png',
      'https://via.placeholder.com/300x400/f90/fff.png',
      'https://via.placeholder.com/300x500/99f/fff.png',
    ]);
  }, []);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentPage(pageIndex);
  };

  const scrollLeft = () => {
    if (currentPage > 0 && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: (currentPage - 1) * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1 && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: (currentPage + 1) * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const onImagePress = (uri: string) => {
    // Show modal with zoom
    setSelectedImage(uri);
    setZoomVisible(true);
  };

  return (
    <BaseBackground logo={require('../../assets/magrImage.png')}>
      <View style={styles.container}>
        {images.length > 0 ? (
          <>
            {/* ScrollView with paging */}
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
            >
              {images.map((img, idx) => (
                <Pressable
                  key={idx.toString()}
                  style={[styles.imagePage, { width: SCREEN_WIDTH * 0.8 }]}
                  onPress={() => onImagePress(img)}
                >
                  <Image
                    source={{ uri: img }}
                    style={[styles.image]}
                    resizeMode="contain"
                  />
                </Pressable>
              ))}
            </ScrollView>

            {/* Chevrons */}
            {currentPage > 0 && (
              <Pressable onPress={scrollLeft} style={[styles.chevron, styles.chevronLeft]}>
                <Text style={styles.chevronText}>{'<'}</Text>
              </Pressable>
            )}
            {currentPage < totalPages - 1 && (
              <Pressable onPress={scrollRight} style={[styles.chevron, styles.chevronRight]}>
                <Text style={styles.chevronText}>{'>'}</Text>
              </Pressable>
            )}

            {/* Page Control Dots (simple version) */}
            <View style={styles.dotsContainer}>
              {images.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    { backgroundColor: i === currentPage ? '#fff' : 'lightgray' },
                  ]}
                />
              ))}
            </View>
          </>
        ) : (
          <Text style={{ color: 'white' }}>No images found.</Text>
        )}
      </View>

      {/* Zoom modal */}
      <Modal
        visible={zoomVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setZoomVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setZoomVisible(false)}
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.zoomedImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </BaseBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 0,
    marginTop: 50,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.5,
  },
  imagePage: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SCREEN_WIDTH * 0.1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  chevron: {
    position: 'absolute',
    top: '50%',
    padding: 10,
  },
  chevronLeft: {
    left: 0,
  },
  chevronRight: {
    right: 0,
  },
  chevronText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedImage: {
    width: '90%',
    height: '70%',
  },
});
