// Folder data service for Apper backend operations
export const folderService = {
  // Get all folders
  getAllFolders: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Id", "Name", "description", "parent_folder"],
        orderBy: [{ field: "Name", direction: "asc" }]
      };

      const response = await apperClient.fetchRecords("folder", params);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  },

  // Create a new folder
  createFolder: async (folderData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const folder = {
        Name: folderData.name,
        description: folderData.description || "",
        parent_folder: folderData.parentFolder || null
      };

      const response = await apperClient.createRecord("folder", { records: [folder] });
      return response.results[0].data;
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    }
  },

  // Update a folder
  updateFolder: async (folderId, folderData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const folder = {
        Id: folderId,
        Name: folderData.name,
        description: folderData.description,
        parent_folder: folderData.parentFolder
      };

      const response = await apperClient.updateRecord("folder", { records: [folder] });
      return response.results[0].data;
    } catch (error) {
      console.error("Error updating folder:", error);
      throw error;
    }
  }
};

export default folderService;