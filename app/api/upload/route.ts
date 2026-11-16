import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    if (!file) {
      return Response.json({
        success: false,
        message: "Image is required",
      });
    }

    // Browser format
    const arrayBuffer = await file.arrayBuffer();

    // Node format
    const buffer = Buffer.from(arrayBuffer);
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "categories",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      //   Upload start

      uploadStream.end(buffer);
    });

    return Response.json({
      success: true,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      message: "Image uploaded successfully",
    });
  } catch (error) {
    // console.log(error);
    console.error("Cloudinary Error:", error);
    return Response.json({
      success: false,
      message: "Upload Failed",
    });
  }
}
