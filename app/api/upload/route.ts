import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const data = await req.formData();

  if (data.get("file")) {
    //upload a file
    const file = data.get("file") as File;

    const s3Client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET_KEY || "",
      },
    });

    const extension = file.name.split(".").slice(-1)[0];
    const newFileName = uuidv4() + "." + extension;

    const chunks = [];
    const reader = file.stream().getReader();
    let done = false;
    while (!done) {
      const { value, done: isDone } = await reader.read();
      if (isDone) {
        done = true;
      } else {
        chunks.push(value);
      }
    }
    const buffer = Buffer.concat(chunks);

    const bucket = "nextjs-food-ordering";
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );

    const link = "https://nextjs-food-ordering.s3.amazonaws.com/" + newFileName;
    return Response.json(link);
  }

  return Response.json(true);
}
