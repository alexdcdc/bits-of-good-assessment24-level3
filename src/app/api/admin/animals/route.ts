import Animal from "models/animal"
export async function GET(req: Request) {
    const DEFAULT_PAGE_LIMIT = 10;

    //requests can have 2 parameters: limit (max # of entries per page) & after (last _id of the previous page)
    //if limit undefined, we use default page limit of 10; if after undefined, we start from the beginning
    const url = new URL(req.url);
    const urlLimitParam = url.searchParams.get("limit");

    const limit = urlLimitParam ? parseInt(urlLimitParam) : DEFAULT_PAGE_LIMIT;
    const after = url.searchParams.get("after");

    const query = after ? Animal.find({'_id': {'$gt': after}}) : Animal.find();
    const animals = await query.limit(limit);
    const lastId = animals.length > 0 ? animals[animals.length - 1]._id : null;

    //Returns users and lastId to access next page in subsequent request
    return Response.json({data: animals, last: lastId}, {status: 200});
}