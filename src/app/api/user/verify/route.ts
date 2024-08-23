import User from "models/user"
import bcrypt from "bcrypt"
import connectToMongoDB from "lib/db"
import { SignJWT } from "jose";
import { encrypt } from "lib/auth";

export async function POST(req: Request) {

    


    await connectToMongoDB();

    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
        return Response.json({ message: "Missing email or password" }, { status: 403 });
    }

    const user = await User.findOne({ email });
    if (bcrypt.compareSync(password, user.password)) {
        const token = await encrypt(user.toObject())
        return Response.json({ message: "Valid email/password; token issued", token: token }, { status: 200 });
    }

    return Response.json({ message: "Invalid email/password" }, { status: 403 });
}