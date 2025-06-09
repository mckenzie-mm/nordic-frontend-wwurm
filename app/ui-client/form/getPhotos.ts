const { AWS_BUCKET_NAME, AWS_REGION } = require('../../templates');
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"; 
import {
    S3Client,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const client = new S3Client({
    region:AWS_REGION,
    credentials: fromCognitoIdentityPool({
        identityPoolId: "ap-southeast-2:1e2b4df4-a318-4cd2-9c19-753c83be052b"
    })
});

export async function getPhotos(categoryName: string) {
    const command = new ListObjectsV2Command({
        Bucket: AWS_BUCKET_NAME,
        Prefix: categoryName
    });
    const response = await client.send(command);
    const data = response.Contents?.slice(1) || [];
    const photos: Array<string> = [];
    const albumPhotosKey = encodeURIComponent(categoryName!) + "/"; 
    data.forEach(({ Key }) => {
        const name = Key?.replace(albumPhotosKey, ""); 
        photos.push(name!)
    })
    return photos;
}