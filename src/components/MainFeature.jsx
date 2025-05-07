import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature() {
  // State declarations for file uploading
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Refs
  const fileInputRef = useRef(null);
  
  // Icon declarations
  const UploadCloudIcon = getIcon('UploadCloud');
  const FileIcon = getIcon('File');
  const ImageIcon = getIcon('Image');
  const FileTextIcon = getIcon('FileText');
  const FileMusicIcon = getIcon('FileAudio');
  const FileVideoIcon = getIcon('FileVideo');
  const FileArchiveIcon = getIcon('Archive');
  const FileCodeIcon = getIcon('Code');
  const FolderIcon = getIcon('Folder');
  const GridIcon = getIcon('Grid');
  const ListIcon = getIcon('List');
  const PlusIcon = getIcon('Plus');
  const TrashIcon = getIcon('Trash');
  const ExternalLinkIcon = getIcon('ExternalLink');
  const RefreshCwIcon = getIcon('RefreshCw');
  const XIcon = getIcon('X');
  
  // File type detection helpers
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return ImageIcon;
    if (fileType.startsWith('text/')) return FileTextIcon;
    if (fileType.startsWith('audio/')) return FileMusicIcon;
    if (fileType.startsWith('video/')) return FileVideoIcon;
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return FileArchiveIcon;
    if (fileType.includes('json') || fileType.includes('xml') || fileType.includes('html')) return FileCodeIcon;
    return FileIcon;
  };
  
  const getFileTypeLabel = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType.startsWith('text/')) return 'Document';
    if (fileType.startsWith('audio/')) return 'Audio';
    if (fileType.startsWith('video/')) return 'Video';
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) return 'Archive';
    if (fileType.includes('json') || fileType.includes('xml') || fileType.includes('html')) return 'Code';
    return 'Other';
  };
  
  // File size formatter
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;
    
    processFiles(droppedFiles);
  };
  
  // File input handler
  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;
    
    processFiles(selectedFiles);
  };
  
  // Process files before adding to state
  const processFiles = (newFiles) => {
    // Process files and add unique IDs
    const processedFiles = newFiles.map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      folder: folderName || 'Main Directory',
      uploadedAt: new Date(),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    
    // Update state with new files
    setFiles(prev => [...prev, ...processedFiles]);
    
    // Show success toast
    toast.success(`${processedFiles.length} file${processedFiles.length > 1 ? 's' : ''} added`, {
      icon: <UploadCloudIcon className="h-5 w-5" />
    });
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Upload files simulation
  const uploadFiles = () => {
    if (files.length === 0) {
      toast.error("No files to upload", {
        icon: <XIcon className="h-5 w-5" />
      });
      return;
    }
    
    setIsUploading(true);
    const newProgress = {};
    
    // Set initial progress for all files
    files.forEach(file => {
      newProgress[file.id] = 0;
    });
    setUploadProgress(newProgress);
    
    // Simulate progress for each file
    files.forEach(file => {
      const duration = 1000 + Math.random() * 2000; // Random duration between 1-3 seconds
      const interval = 100;
      const steps = duration / interval;
      let currentStep = 0;
      
      const progressInterval = setInterval(() => {
        currentStep++;
        const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
        
        setUploadProgress(prev => ({
          ...prev,
          [file.id]: progress
        }));
        
        // Clear interval when reaches 100%
        if (progress === 100) {
          clearInterval(progressInterval);
          
          // Check if all files are uploaded
          const allUploaded = Object.values(newProgress).every(p => p === 100);
          if (allUploaded) {
            setTimeout(() => {
              setIsUploading(false);
              toast.success("All files uploaded successfully!", {
                icon: <FileIcon className="h-5 w-5" />
              });
            }, 500);
          }
        }
      }, interval);
    });
  };
  
  // Delete file
  const deleteFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    toast.info("File removed", {
      icon: <TrashIcon className="h-5 w-5" />
    });
  };
  
  // Delete all files
  const deleteAllFiles = () => {
    if (files.length === 0) return;
    
    // Revoke object URLs for image previews
    files.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    
    setFiles([]);
    setUploadProgress({});
    setIsUploading(false);
    
    toast.info("All files cleared", {
      icon: <RefreshCwIcon className="h-5 w-5" />
    });
  };
  
  // Filter files by type
  const filteredFiles = selectedFileType === 'all' 
    ? files 
    : files.filter(file => {
      if (selectedFileType === 'image') return file.type.startsWith('image/');
      if (selectedFileType === 'document') return file.type.startsWith('text/');
      if (selectedFileType === 'audio') return file.type.startsWith('audio/');
      if (selectedFileType === 'video') return file.type.startsWith('video/');
      if (selectedFileType === 'archive') return file.type.includes('zip') || file.type.includes('rar') || file.type.includes('tar');
      if (selectedFileType === 'code') return file.type.includes('json') || file.type.includes('xml') || file.type.includes('html');
      return false;
    });

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">File Management</h2>
        <p className="text-surface-600 dark:text-surface-300">
          Upload, organize, and manage your files securely
        </p>
      </div>
      
      {/* File upload area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 mb-8 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-surface-300 dark:border-surface-700 hover:border-primary hover:bg-surface-50 dark:hover:bg-surface-800/50'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          multiple
        />
        
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragging ? 1.05 : 1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full mb-4">
            <UploadCloudIcon className="h-10 w-10 md:h-12 md:w-12 text-primary" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">
            {isDragging ? 'Drop files here' : 'Drag & Drop Files'}
          </h3>
          
          <p className="text-surface-500 dark:text-surface-400 mb-4">
            or click to browse from your device
          </p>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary"
            onClick={triggerFileInput}
          >
            Select Files
          </motion.button>
        </motion.div>
      </div>
      
      {/* Folder and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="flex gap-3">
            <div className="flex items-center bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-700 rounded-lg p-2 flex-1">
              <FolderIcon className="h-5 w-5 text-surface-400 dark:text-surface-500 mr-2" />
              <input
                type="text"
                placeholder="Folder name (optional)"
                className="bg-transparent border-none focus:outline-none w-full"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            
            <select
              className="bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="archive">Archives</option>
              <option value="code">Code</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-lg border ${
              viewMode === 'grid' 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white dark:bg-surface-800 border-surface-300 dark:border-surface-700'
            }`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <GridIcon className="h-5 w-5" />
          </button>
          
          <button
            className={`p-2 rounded-lg border ${
              viewMode === 'list' 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white dark:bg-surface-800 border-surface-300 dark:border-surface-700'
            }`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <ListIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn btn-primary flex items-center gap-2"
          onClick={uploadFiles}
          disabled={isUploading || files.length === 0}
        >
          <UploadCloudIcon className="h-5 w-5" />
          <span>{isUploading ? 'Uploading...' : 'Upload All Files'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn btn-outline flex items-center gap-2"
          onClick={triggerFileInput}
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add More Files</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn border border-red-300 text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30 flex items-center gap-2"
          onClick={deleteAllFiles}
          disabled={files.length === 0}
        >
          <TrashIcon className="h-5 w-5" />
          <span>Clear All</span>
        </motion.button>
      </div>
      
      {/* File list */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden">
        <div className="border-b border-surface-200 dark:border-surface-700 px-4 py-3">
          <h3 className="font-medium flex items-center">
            <FileIcon className="h-5 w-5 mr-2 text-surface-500" />
            <span>
              {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''} ready to upload
            </span>
          </h3>
        </div>
        
        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center text-surface-500 dark:text-surface-400">
            <div className="max-w-sm mx-auto">
              <p className="mb-4">No files selected. Drag and drop files or use the select button above.</p>
              <button
                className="btn btn-outline"
                onClick={triggerFileInput}
              >
                Select Files
              </button>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'p-4' : ''}>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map(file => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface-50 dark:bg-surface-900 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700"
                  >
                    <div className="aspect-square relative overflow-hidden bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                      {file.preview ? (
                        <img 
                          src={file.preview} 
                          alt={file.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-surface-400 dark:text-surface-500 p-6">
                          {React.createElement(getFileIcon(file.type), { className: "h-16 w-16 mx-auto" })}
                        </div>
                      )}
                      
                      {uploadProgress[file.id] > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                          <div 
                            className="bg-primary h-1 rounded-full" 
                            style={{ width: `${uploadProgress[file.id]}%` }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm truncate" title={file.name}>
                          {file.name}
                        </h4>
                        <button
                          className="text-red-500 hover:text-red-700 p-1"
                          onClick={() => deleteFile(file.id)}
                          disabled={isUploading}
                          aria-label="Delete file"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between text-xs text-surface-500 dark:text-surface-400">
                        <span>{getFileTypeLabel(file.type)}</span>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-surface-200 dark:divide-surface-700">
                {filteredFiles.map(file => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center py-3 px-4 hover:bg-surface-50 dark:hover:bg-surface-700/30"
                  >
                    <div className="h-10 w-10 mr-3 flex-shrink-0 bg-surface-100 dark:bg-surface-800 rounded flex items-center justify-center">
                      {file.preview ? (
                        <img 
                          src={file.preview} 
                          alt={file.name} 
                          className="h-full w-full object-cover rounded"
                        />
                      ) : (
                        React.createElement(getFileIcon(file.type), { className: "h-5 w-5 text-surface-500" })
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate" title={file.name}>
                        {file.name}
                      </h4>
                      <div className="flex text-xs text-surface-500 dark:text-surface-400 mt-1">
                        <span className="mr-3">{getFileTypeLabel(file.type)}</span>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex items-center">
                      {uploadProgress[file.id] > 0 && (
                        <div className="w-24 mr-4">
                          <div className="h-1.5 w-full bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full" 
                              style={{ width: `${uploadProgress[file.id]}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <button
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        onClick={() => deleteFile(file.id)}
                        disabled={isUploading}
                        aria-label="Delete file"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Storage usage */}
      {files.length > 0 && (
        <div className="mt-8 bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card">
          <h3 className="font-medium mb-2 flex items-center">
            <DatabaseIcon className="h-5 w-5 mr-2 text-primary" />
            <span>Storage Usage</span>
          </h3>
          
          <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min((files.length / 20) * 100, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-surface-500 dark:text-surface-400">
            <span>
              {formatFileSize(files.reduce((total, file) => total + file.size, 0))} used
            </span>
            <span>2 GB free</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainFeature;