import { decrypt } from "lib/auth";
import connectToMongoDB from "lib/db"
import Animal from "models/animal"
import User from "models/user"

export async function POST(req: Request) {
    await connectToMongoDB();

    const { data, token } = await req.json();

    const user = await decrypt(token);
    if (!user) {
        return Response.json({message: "JWT verification failed"}, {status: 401});
    }

    const animal = new Animal({...data, owner: user._id});

    try {
        await animal.validate();
    }
    catch (err) {
        return Response.json({message: "Invalid data format"}, {status: 400}) ;
        //the data is incorrect -> status code 400; status code 500 is returned in all other error cases
    }

    //Check that owner ID exists in database
    const ownerExists = await User.exists(animal.owner);
    if (!ownerExists) {
        return Response.json({message: "Owner ID does not exist"}, {status: 400}) ;
    }

    await animal.save();

    return Response.json({message: "OK"}, {status: 200});     
}