// Asset mapping for local image files
// This file maps artwork IDs and image indices to local image paths

export const artworkImages = {
  1: {
    title: "Spirits of the Ancestors",
    images: [
      "/assets/images/artwork-1-1.jpg",
      "/assets/images/artwork-1-2.jpg"
    ]
  },
  2: {
    title: "Urban Rhythm",
    images: [
      "/assets/images/artwork-3-1.jpg"
    ]
  },
  3: {
    title: "The Weaver's Dream",
    images: [
      "/assets/images/artwork-3-1.jpg"
    ]
  },
  4: {
    title: "Earth's Memory",
    images: [
      "/assets/images/artwork-4-1.jpg"
    ]
  },
  5: {
    title: "Crown of the Queen",
    images: [
      "/assets/images/artwork-5-1.jpg"
    ]
  },
  6: {
    title: "Morning in the Village",
    images: [
      "/assets/images/artwork-8-1.jpg"
    ]
  },
  7: {
    title: "Digital Heritage",
    images: [
      "/assets/images/artwork-7-1.jpg"
    ]
  },
  8: {
    title: "Mother's Love",
    images: [
      "/assets/images/artwork-8-1.jpg"
    ]
  },
  9: {
    title: "Savanna Sunset",
    images: [
      "/assets/images/artwork-1-1.jpg"
    ]
  },
  10: {
    title: "Sacred Dancer",
    images: [
      "/assets/images/artwork-3-1.jpg"
    ]
  },
  11: {
    title: "Elephant Wisdom",
    images: [
      "/assets/images/artwork-5-1.jpg"
    ]
  },
  12: {
    title: "Market Day",
    images: [
      "/assets/images/artwork-4-1.jpg"
    ]
  },
  13: {
    title: "Future Ancestors",
    images: [
      "/assets/images/artwork-7-1.jpg"
    ]
  },
  14: {
    title: "Harvest Celebration",
    images: [
      "/assets/images/artwork-8-1.jpg"
    ]
  }
};

export const artistProfileImage = "/assets/images/artist-profile-new.jpg";

// Helper function to get local image path for an artwork
export function getArtworkLocalImages(artworkId) {
  const artwork = artworkImages[artworkId];
  return artwork ? artwork.images : [];
}
