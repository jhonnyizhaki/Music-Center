import mongoose from 'mongoose'

const practiceRoomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    capacity: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    isVIP: { type: Boolean, required: true, default: true }
});

const PracticeRoom = mongoose.model('PracticeRoom', practiceRoomSchema);

export default PracticeRoom
