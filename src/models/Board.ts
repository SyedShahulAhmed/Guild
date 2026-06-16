import { model, models, Schema } from "mongoose";

const boardSchema = new Schema({
    communityId: {
        type: Schema.Types.ObjectId,
        ref: "Community",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    }
    ,
    description : String,
},{timestamps : true})

export const Board = models.Board || model("Board",boardSchema)

