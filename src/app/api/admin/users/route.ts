import User from "models/user"

export async function GET(req: Request) {
    const DEFAULT_PAGE_LIMIT = 10;

    //requests can have 2 parameters: limit (max # of entries per page) & after (last _id of the previous page)
    //if limit undefined, we use default page limit of 10; if after undefined, we start from the beginning
    const url = new URL(req.url);
    const urlLimitParam = url.searchParams.get("limit");

    const limit = urlLimitParam ? parseInt(urlLimitParam) : DEFAULT_PAGE_LIMIT;
    const after = url.searchParams.get("after");

    const query = after ? User.find({'_id': {'$gt': after}}) : User.find();
    const users = await query.limit(limit);
    const lastId = users.length > 0 ? users[users.length - 1]._id : null;

    for (const user of users) {
        user.password = undefined;
    }

    //Returns users and lastId to access next page in subsequent request
    return Response.json({data: users, last: lastId}, {status: 200});
}