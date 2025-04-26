import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
      this.client
          .setEndpoint(config.appWriteUrl)
          .setProject(config.appWriteProjectId);
      this.account = new Account(this.client);
          
  }

  async createAccount({email, password, name}) {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
          // call another method
          return this.login({email, password});
      } else {
          return userAccount;
      }
  }

  async login({email, password}) {
      try {
          const session = await this.account.createSession(email, password);
          if (session) {
              return session;
          } else {
              return null;
          }
      } catch (error) {
          console.log("Appwrite serive :: login :: error", error);
      }
  }

  async getCurrentUser() {
      try {
          return await this.account.get();
      } catch (error) {
          console.log("Appwrite serive :: getCurrentUser :: error", error);
      }

      return null;
  }

  async logout() {

      try {
          await this.account.deleteSessions();
      } catch (error) {
          console.log("Appwrite serive :: logout :: error", error);
      }
  }
}

const authService = new AuthService();

export default authService