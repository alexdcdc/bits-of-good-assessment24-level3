import connectToMongoDB from "lib/db"
import TrainingLog from "models/traininglog"
import User from "models/user"
import Animal from "models/animal"
import { decrypt } from "lib/auth";

export async function POST(req: Request) {
    await connectToMongoDB();

    const body = await req.json();

    const { data, token } = body;

    const user = await decrypt(token);
    if (!user) {
        return Response.json({message: "JWT verification failed"}, {status: 401});
    }

    const log = new TrainingLog({ ...data, user: user._id });

    try {
        await log.validate();
    }
    catch (err) {
        return Response.json({message: "Invalid data format"}, {status: 400});
        //the data is incorrect -> status code 400; status code 500 is returned in all other error cases
    }

    const logUserId = log.user;
    const logAnimal = await Animal.findById(log.animal);
    const userExists = await User.exists(logUserId);
    
    //Check that both the user and the animal in the log exist in the database
    if (!userExists) {
        return Response.json({message: "User does not exist in database"}, {status: 400});
    }
    if (!logAnimal) {
        return Response.json({message: "Animal does not exist in database"}, {status: 400});
    }
    
    //Check that the animal's owner is the user referenced in the log
    if (logAnimal.owner.toString() != logUserId.toString()) {
        return Response.json({message: "User ID does not match animal owner ID"}, {status: 400});
    }

    await log.save();

    return Response.json({message: "OK"}, {status: 200});     
}