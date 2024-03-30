require("dotenv").config();

import { S3Client, ListBucketsCommand, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

  
  
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET;
const region = 'ap-south-1';
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;



export function dataUrlToBuffer(dataUrl: any) {
    const base64String = dataUrl.split(',')[1];
    const buffer = Buffer.from(base64String, 'base64');
    return buffer;
}
   
 

const s3Client = new S3Client({region,credentials:{accessKeyId:accessKeyId!,secretAccessKey:secretAccessKey!}})

export  async function uploadFile(dataUrl: any, fileName: string) {
    try {
        
        let contentType = "image/jpeg";
        if (fileName.split(".")[1] === "png") {
            contentType = "image/png";
        }
    
        const base64String = dataUrl.split(',')[1];
        const fileBuffer = Buffer.from(base64String, 'base64');
    
        const uploadParams = {
            Bucket: bucketName,
            Body: fileBuffer,
            Key: fileName,
            ContentEncoding: "base64",
            ContentType: contentType,
        };
    
        const command = new PutObjectCommand(uploadParams)
        const response = await s3Client.send(command);
        // if(response.$metadata.httpStatusCode !== 200)
        return response
    } catch (error: any) {
        console.error(error, 'error')
        throw new Error(`S3 Error: ${error.message}`)
    }

}

export async function getS3Object(key: string){
    try {
        const input = {
            "Bucket": bucketName,
            "Key": key
        };
        const command = new GetObjectCommand(input);
        const response = await s3Client.send(command);
        return response;
        
    } catch (error: any) {
        console.log(error, 'error')
        // throw new Error(`Error ${error.message}` )
    }
}

export const getImageURL = async(key: string) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        };
    
        // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
        const command = new GetObjectCommand(params);
        const seconds = 3600 ;
        const url = await getSignedUrl(s3Client, command, {
            expiresIn: seconds,
        }); 
        console.log(url, Date.now(), 'url');
        return url;
    } catch (error) {
        console.log(error, 'error')
    }   
}


async function deleteFile(fileName: any) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };

    const response = await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(response);
    return response;
}
  
 
  
  
  