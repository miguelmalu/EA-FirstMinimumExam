import {Schema, model} from 'mongoose';

const ModeSchema = new Schema({
    username: {type: Schema.Types.ObjectId, required:true, ref: 'User'},
    mode: {type: String, required:true,},
    time: {type: Date, default:Date.now},
});

export default model('Mode', ModeSchema);