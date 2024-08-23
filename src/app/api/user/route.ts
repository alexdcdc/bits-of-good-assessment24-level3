import connectToMongoDB from "lib/db"
import User from "models/user"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    const SALT_ROUNDS = 10;
    
    await connectToMongoDB();

    const body = await req.json();
    const user = new User(body);
    user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);

    //Validate that data is in correct format and all required fields are present
    try {
        await user.validate();
    }
    catch (err) {
        return Response.json({message: "Invalid data format"}, {status: 400}) ;
        //the data is incorrect -> status code 400; status code 500 is returned in all other error cases by default
    }

    await user.save();

    return Response.json({message: "OK"}, {status: 200});     
}