import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";
import Photo from "@/models/Photo";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  let query = {};

  if(search){
    query = {
      $or: [
        {title: { $regex: search, $options: "i"}},
        {description: { $regex: search, $options: "i"}},
        {category: { $regex: search, $options: "i"}}
      ]
    }
  }

  const limit = parseInt(searchParams.get("limit")) || 6;
  const skip = parseInt(searchParams.get("skip")) || 0;

  try {
    await connectDB();

    const photos = await Photo.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const totalPhotos = await Photo.countDocuments();

    if (!photos) {
      return Response.json({ error: "Photos not found!" }, { status: 404 });
    }

    return Response.json(
      { photos, totalPhotos, hasMore: skip + photos.length < totalPhotos },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch Image!" },
      { status: 500 },
    );
  }
}

//below-photo post route for admin add photo
export async function POST(req) {
  try {
    const user = await getUserFromCookie();
    if (!user && user.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();

    if (!body) {
      return Response.json({ message: "Data not received!" }, { status: 400 });
    }

    const photo = await Photo.create(body);

    return Response.json(photo, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Error adding photo" }, { status: 500 });
  }
}
