const fs = require('fs/promises');
const path = require('path');

// Adjust the file path to point to the `json` folder outside the current folder
const filePath = path.resolve(process.cwd(), "lib/json/locationData.json");

// Read all Locations from the JSON file
const getAllLocations = async () => {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data) || {}; // Ensure it returns an object, not an array
    } catch (error) {
      console.error("Error reading locations file:", error);
      return {}; // Return empty object if file doesn't exist or is unreadable
    }
  };

// Add a new Location to the JSON file
// const addLocation = async (newLocation) => {
//   try {
//     const Locations = await getAllLocations();
//     if(Locations)

//     await fs.writeFile(filePath, JSON.stringify(Locations, null, 2), 'utf8');
//     return LocationwithID;
//   } catch (error) {
//     console.error('Error adding Location:', error);
//     throw error;
//   }
// };

// Update an existing Location
const updateLocationCount = async (location) => {
    try {
      const locations = await getAllLocations();
  
      // Increment the count or set to 1 if not found
      locations[location] = (locations[location] || 0) + 1;
  
      // Write back to the JSON file
      await fs.writeFile(filePath, JSON.stringify(locations, null, 2), 'utf8');
  
      return locations;
    } catch (error) {
      console.error("Error updating location count:", error);
      throw error;
    }
  };

// Delete a Location
// const deleteLocation = async (ids) => {
//   try {
//     const Locations = await getAllLocations();
//     const filteredLocations = Locations.filter((Location) => !ids.includes(Location.id));

//     // const filteredReviews = reviews.filter((review) => !ids.includes(review.id));
//     await fs.writeFile(filePath, JSON.stringify(filteredLocations, null, 2), 'utf8');
//     return { Location: 'Location deleted successfully' };
//   } catch (error) {
//     console.error('Error deleting Location:', error);
//     throw error;
//   }
// };

module.exports = {
  getAllLocations,
  updateLocationCount,
};
