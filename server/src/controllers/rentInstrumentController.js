import RentInstrument from "../models/rentInstrumentModel.js";


export const createRentInstrument = async (req, res) => {
    try {
        const newInstrument = new RentInstrument(req.body);
        await newInstrument.save();
        res.status(201).json(newInstrument);
    } catch (error) {
        console.error(error);

        if (error.name == "ValidationError") {
            return res.status(422).json({ message: error._message, error: error.message });
        }
        res.status(500).json({ message: 'Failed to create instrument', error });
    }
};

export const getInstruments = async (req, res) => {
    try {
        const { category } = req.query;

        const query = category
            ? { category: { $regex: new RegExp(`^${category}$`, 'i') } }  // Case-insensitive regex search
            : {};

        const instruments = await Instrument.find(query);

        res.status(200).json(instruments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch instruments', error });
    }
};
export const getInstrumentById = async (req, res) => {
    try {
        const instrument = await Instrument.findById(req.params.id);
        if (!instrument) {
            return res.status(404).json({ message: 'Instrument not found' });
        }
        res.status(200).json(instrument);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch instrument', error });
    }
};

export const updateInstrument = async (req, res) => {
    try {
        const updatedInstrument = await Instrument.updateOne({
            _id: req.params.id
        }, req.body);
        if (updatedInstrument.modifiedCount == 0) {
            return res.status(404).json({ message: "Couldn't update instrument" });
        }
        res.status(200).json(updatedInstrument);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update instrument', error });
    }
};

export const deleteInstrument = async (req, res) => {
    try {
        const instrument = await Instrument.findByIdAndDelete(req.params.id);
        if (!instrument) {
            return res.status(404).json({ message: 'Instrument not found' });
        }
        res.status(200).json({ message: 'Instrument deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete instrument', error });
    }
};
