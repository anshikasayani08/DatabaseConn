import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';

// Sample image data (array of image URLs or local image sources)
const imageData = [
  { id: '1', uri: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg' },
  { id: '2', uri: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg' },
  { id: '3', uri: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg' },
  { id: '4', uri: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg' },
  { id: '5', uri: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg' },
  // Add more images as needed
];

const MiniImageList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={imageData} // Data for images
        keyExtractor={(item) => item.id} // Key for each list item
        horizontal={true} // Makes the list horizontal
        showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items horizontally
    paddingVertical: 10, // Adjust vertical padding
    marginTop:40,
    backgroundColor:'white',
    flex:1
  },
  imageContainer: {
    marginHorizontal: 10, // Space between images
  },
  image: {
    width: 100, // Mini image size width
    height: 100, // Mini image size height
    borderRadius: 50, // Optional: rounded corners for images
    borderColor:'black',
    borderWidth:2,
  },
});

export default MiniImageList;