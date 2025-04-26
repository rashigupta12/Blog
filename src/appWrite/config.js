import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  databases;
  bucket;

  constructor() {
    this.Client.setEndpoint(config.appWriteUrl).setProject(
      config.appWriteProjectId
    );
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const response = await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
      return response;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const response = await this.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
      return response;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      const response = await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return response;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      const response = await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return response;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  async getPosts(queries=[Query.equal("status", "active")]) {
    try {
      const response = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries,
      );
      return response;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }


  async uploadFile(file) {
    try {
      const response = await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.bucket.deleteFile(
        config.appWriteBucketId,
        fileId
      );
      return response;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false
      
    }
  }

  getFilePerview(fileId) {
    return this.bucket.getFilePreview(config.appWriteBucketId, fileId);

  }


}

const service = new Service();
export default service;
