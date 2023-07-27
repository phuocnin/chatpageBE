import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập tên."],
        trim: true
    },
    isGroup: {
        type: Boolean,
        required: true,
        default: false
    },
    users: [{
        type: ObjectId,
        ref: "UserModel"
    }],
    laterMessage: {
        type: ObjectId,
        ref: "MessageModel"
    },
    admin: {
        type: ObjectId,
        ref: "UserModel"
    },
},
    {
        collection: "conversations",
        timestamps: true,
    }
)
const ConversationModel = mongoose.models.ConversationModel || mongoose.model("ConversationModel", conversationSchema);

export default ConversationModel
