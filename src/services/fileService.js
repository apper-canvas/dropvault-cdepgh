// File data service for Apper backend operations
export const fileService = {
  // Get all files with optional filtering
  getAllFiles: async (filters = {}) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          "Id", "Name", "Tags", "Owner", "size", "type", "folder", 
          "uploaded_at", "file_type_label", "preview_url", "upload_status", "upload_progress"
        ],
        orderBy: [{ field: "uploaded_at", direction: "desc" }],
        where: []
      };

      // Add filters if provided
      if (filters.fileType && filters.fileType !== 'all') {
        params.where.push({ 
          field: "file_type_label", 
          operator: "equals", 
          value: filters.fileType 
        });
      }

      if (filters.folder) {
        params.where.push({ 
          field: "folder", 
          operator: "equals", 
          value: filters.folder 
        });
      }

      const response = await apperClient.fetchRecords("file", params);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error;
    }
  },

  // Upload a single file
  uploadFile: async (fileData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const file = {
        Name: fileData.name,
        size: fileData.size,
        type: fileData.type,
        folder: fileData.folder || "Main Directory",
        uploaded_at: new Date().toISOString(),
        file_type_label: fileData.fileTypeLabel,
        preview_url: fileData.preview || null,
        upload_status: "Completed",
        upload_progress: 100
      };

      const response = await apperClient.createRecord("file", { records: [file] });
      return response.results[0].data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  // Upload multiple files
  uploadFiles: async (filesData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const files = filesData.map(file => ({
        Name: file.name,
        size: file.size,
        type: file.type,
        folder: file.folder || "Main Directory",
        uploaded_at: new Date().toISOString(),
        file_type_label: file.fileTypeLabel,
        preview_url: file.preview || null,
        upload_status: "Completed",
        upload_progress: 100
      }));

      const response = await apperClient.createRecord("file", { records: files });
      return response.results.map(result => result.data);
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  },

  // Delete a file by ID
  deleteFile: async (fileId) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      await apperClient.deleteRecord("file", { RecordIds: [fileId] });
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
};

export default fileService;