import mongoose from "mongoose"

export const artistSchema = mongoose.Schema({
    name: { type: String, require: true },
    title: {
        type: String, enum: ['String instruments',
                            'Keyboards',
                            'Sound amplification',
                            'Sound amplification',
                            'Wind instruments',
                            'Accessories',
                        
                            'singer']
    },
    price: {type: Number, require: true, min: 100}
})

const Artist = mongoose.model('Artist', artistSchema)
export default Artist
