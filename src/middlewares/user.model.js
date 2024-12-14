import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { ACCESS_TOKEN_EXPIRTY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from "../dbconfig/server";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
        _id:this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    ACCESS_TOKEN_SECRET,
    {
        expiresIn: ACCESS_TOKEN_EXPIRTY
    }
)
}

userSchema.methods.genrateRefreshToken = async function () {
    return jwt.sign(
        {
        _id:this._id
    },
    REFRESH_TOKEN_SECRET,
    {
        expiresIn: REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User", userSchema)