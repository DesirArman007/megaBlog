import conf from "../conf/conf.js";
import { Client, ID ,Databases,Storage,Query} from "appwrite";


export class Service {
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjecId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
// slug is the document id
                slug, 
// object mei vo values denge jo hame post m chaiye
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }

            )
        }catch(error){
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

// update post function

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
// object mei vo values denge jise hame post me update krna hai
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )

        }catch(error){
            console.log("Appwrite service :: updatePost :: error",error);
        }
    }

// delete post function
    async deletePost(slug){
        try{

             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error){
            console.log("Appwrite Service :: deletePost :: error",error);
            return false
        }
    }

//to fetch a particular post
    async getPost(slug){
        try{
            
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        }catch (error){
            console.log("Appwrite Service :: getPost :: error",error);
            return false
        }
    }
 
// to find posts which are active
    async getPosts(queries=[Query.equal("status","active")]){
        try{

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )

        }catch(error){
            console.log("Appwrite Service :: getPosts :: error",error);
            return false

        }
    }

// file upload method(means creating file)
    async uploadFile(file){
        try{

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )

        }catch(error){
            console.log("Appwrite Service :: uploadFile :: error",error);
            return false
        }
    }

// delete file
    async deleteFile(fileId){
        try{

             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
           return true

        }catch(error){
            console.log("Appwrite Service :: deleteFile :: error",error);
            return false
        }
    }

// to preview file
     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
     }

}

const service =new Service()
export default service
