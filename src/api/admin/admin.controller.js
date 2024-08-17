import  service from './admin.service.js';
import { sendResponse } from '../../utils/response.js';

export const addDestination = async (req, res, next) => {
  try {
    const { title, location, district, description } = req.body;
    const images = req.files.map(file => file.path);

    const newDestination = await service.createDestination({
      title, location, district, description, images,userId:req.user.userId
    });

    return sendResponse(res, "Destination added successfully" , newDestination);
  } catch (err) {
    console.log("error:", err);
    next({ status: 500, msg: err.message });
  }
};

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await service.getDestinations();
    return sendResponse(res, destinations, 200);
  } catch (err) {
    console.log("error:", err);
    next({ status: 500, msg: err.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteDestination(id);
    return sendResponse(res, 'Destination deleted', 200);
  } catch (err) {
    console.log("Login error:", err);
    next({ status: 500, msg: err.message });
  }
};
