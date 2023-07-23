import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập tên."]
    },
    email: {
        type: String,
        required: [true, "Vui lòng nhập email."],
        unqiue: [true, "Email đã tồn tại."],
        lowercase: true,
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"
    },
    password: {
        type: String,
        required: [true, "Vui lòng nhập mật khẩu."],
        minLength: [6, "Plase make sure your password is atleast 6 characters long"],
    }

},
    {
        collection: "user",
        timestamps: true,
    }
)
const UserModel =
    mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;