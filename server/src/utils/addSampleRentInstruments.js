import mongoose from 'mongoose';
import RentInstrument from '../models/rentInstrumentModel.js';

const addSampleRentInstruments = async () => {
    try {
        const sampleInstruments = [
            {
                name: "Guitar for Rent",
                category: "guitar",
                price: 50,
                stock: 3,
                isAvailable: true
            },
            {
                name: "Drums for Rent",
                category: "drums",
                price: 80,
                stock: 2,
                isAvailable: true
            }
        ];

        await RentInstrument.insertMany(sampleInstruments);
        console.log("Sample rent instruments added successfully");
    } catch (error) {
        console.error("Error:", error);
    }
};

export default addSampleRentInstruments; 