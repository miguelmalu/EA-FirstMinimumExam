import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    username: [{type: Schema.Types.ObjectId, required:true, ref: 'User'}],
    mode: {type: String, required:true,},
    timeZone: {type: Date, default:Date.UTC},
});

export default model('Mode', UserSchema);