const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

function generateUsername(email) {
    let name = email.split('@')[0];
    name = name.replace(/[^a-zA-Z0-9]/g, '');
    const username = `${name}_${randomBytes(3).toString('hex')}`;
    return username;
}

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        salt: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            default: 'I am a curious learner.'
        },
        role: {
            type: String,
            enum: ["user", "member", "moderator", "admin"],
            default: "user",
        },
        image: {
            type: String,
            default: "/public/images/profile/user.png",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    const salt = randomBytes(16).toString("hex");
    const hashed = createHmac("sha256", salt)
        .update(this.password)
        .digest("hex");
    
    this.username = generateUsername(this.email) 
    this.email = this.email.toLowerCase()
    this.salt = salt;
    this.password = hashed;
    next();
});

userSchema.static("validate", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return false;

    const salt = user.salt;
    const hashed = user.password;
    const hashing = createHmac("sha256", salt).update(password).digest("hex");

    if (hashed !== hashing) return false;
    return user
});

const User = mongoose.model("user", userSchema);

module.exports = User;
