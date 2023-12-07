import axios from 'axios';

class VehicleLocationService {
  static async createVehicleLocation(vehicleId: any, latitude: any, longitude: any) {
    const newLocation = { vehicleId, latitude, longitude };
    const response = await axios.post('http://localhost:3000/location', newLocation);
    return response.data;
  }

  static async getVehicleLocation(vehicleId: any) {
    const response = await axios.get(`http://localhost:3000/location/${vehicleId}`);
    return response.data;
  }

  static async getAllVehicleLocations() {
    const response = await axios.get('http://localhost:3000/location');
    return response.data;
  }
}

export default VehicleLocationService;
