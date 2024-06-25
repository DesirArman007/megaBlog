import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

 export class AuthService {

    client = new Client();
    account;
// constructor m iss liye banaya taki resource bache and ye...only tabhi client ki properties set honge jab ek obj crat hoga toh..const inn properties ko automatically execute kr dega when obj is crated

    constructor(){
//  this.client ka reference set kr diya phir properties set kiya
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjecId);
// client ki properties set ho gayi toh ab account and client ka ref leke account create kr denge
        this.account= new Account(this.client);
    }


// async means jab tak createAccount({email,password,name}) create nhi hota ye aage ni jayega
    async createAccount({email,password,name}){

// account creation method may fail so we will use error handling
        try{
// appwrite me ID mila hai....toh ID.unique() will create unique id for the accounts created
            const userAccount= await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
// if account got created then we will call login method to login
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch(error){
            throw error;
        }
    }

// creating login method
    async login({email,password}){
        try{
           return await this.account.createEmailPasswordSession(email,password);

        } catch(error){
            console.log("Appwrite authService error : " + error)
        }
    }

// to check kei user login hai ya nahi
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
//  try catch m kuch dikkat aa gayi toh return null work krega automatically
        return null;
    }

// account se logout krne keliye
    async logout(){
        try{
            await this.account.deleteSessions();
        } catch(error){
            console.log("Appwrite servicr::logout:: error",error);
        }
// try catch m kuch dikkat aa gayi toh return null work krega automatically
        return null;

    }
 }

 const authService= new AuthService();

// authService is obj of AuthService class jisko ham export kar rhe hai...
 export default authService;