import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";
import Photo from "@/models/Photo";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;

  const photo = await Photo.findById(id);
  if (!photo) {
    return Response.json({ message: "Photo not found!" }, { status: 404 });
  }
  console.log(photo);
  return Response.json(photo, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const user = await getUserFromCookie();
    if (!user && user.role !== "admin")
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    console.log(id);
    const body = await req.json();
    console.log(body);
    const updatedPhoto = await Photo.findByIdAndUpdate(id, body, { new: true });
    console.log(updatedPhoto);
    return Response.json(updatedPhoto, { status: 201 });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const user = await getUserFromCookie();
        if(!user && user.role !== "admin")return Response.json({error: "Unauthorized"}, {status: 401})

  const { id } = await params;

  const deletedPhoto = await Photo.findByIdAndDelete(id);

  return Response.json(deletedPhoto, { message: "Photo Deleted!" });        
    } catch (error) {
        return Response.json({message: "Error occured!"}, {status: 500})
    }
  
}
