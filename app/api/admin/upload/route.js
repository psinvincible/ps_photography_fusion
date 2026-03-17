import cloudinary from "@/lib/cloudinary";

export async function POST(req){
    const data = await req.formData();
    const file = data.get("file");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {folder: "ps_photography"},
            (error, result)=> {
                if(error)reject(error)
                    else resolve(result);
            }
        ).end(buffer)
    })

    return Response.json({
        url: uploadResult.secure_url
    })
}