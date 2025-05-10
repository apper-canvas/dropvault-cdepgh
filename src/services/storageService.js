// Storage usage data service for Apper backend operations
export const storageService = {
  // Get storage usage
  getStorageUsage: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Id", "total_size", "used_space", "free_space", "usage_percentage"],
        limit: 1
      };

      const response = await apperClient.fetchRecords("storage_usage", params);
      return response.data?.[0] || null;
    } catch (error) {
      console.error("Error fetching storage usage:", error);
      throw error;
    }
  },

  // Update storage usage
  updateStorageUsage: async (totalSize, usedSpace) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const freeSpace = totalSize - usedSpace;
      const usagePercentage = (usedSpace / totalSize) * 100;

      const storageData = {
        total_size: totalSize,
        used_space: usedSpace,
        free_space: freeSpace,
        usage_percentage: usagePercentage
      };

      const response = await apperClient.createRecord("storage_usage", { records: [storageData] });
      return response.results[0].data;
    } catch (error) {
      console.error("Error updating storage usage:", error);
      throw error;
    }
  }
};

export default storageService;