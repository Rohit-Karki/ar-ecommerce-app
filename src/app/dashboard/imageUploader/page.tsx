"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  AlertCircle,
  ImageIcon,
  Upload,
  X,
  CuboidIcon as Cube,
} from "lucide-react";
import Image from "next/image";

const handleImageUpload = async (file) => {
  try {
    // Step 1: Upload image to Firebase and get URL
    const imageUrl = await uploadImage(file);

    // Step 2: Send URL to the server
    const serverResponse = await sendImageURL(imageUrl);

    return serverResponse;
  } catch (error) {
    console.error("Error handling image upload:", error);
    throw error;
  } 

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminUploadPhotos() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const onModelDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setModelFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const {
    getRootProps: getModelRootProps,
    getInputProps: getModelInputProps,
    isDragActive: isModelDragActive,
  } = useDropzone({
    onDrop: onModelDrop,
    accept: { ".glb": [], ".gltf": [] },
    multiple: false,
  });

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(uploadedFiles.filter((file) => file !== fileToRemove));
  };

  const removeModelFile = () => {
    setModelFile(null);
  };

  const handleUpload = async () => {
    if (
      uploadedFiles.length === 0 ||
      !productName ||
      !productDescription ||
      !price ||
      !modelFile
    ) {
      toast({
        title: "Error",
        description:
          "Please fill in all fields, upload at least one image, and upload a 3D model.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // In a real application, you would upload the files to a storage service
    // and get back URLs. Here, we'll just use the file names as placeholders.
    const imageUrls = uploadedFiles.map((file) => file.name);
    const modelUrl = modelFile.name;

    const productData = {
      name: productName,
      description: productDescription,
      price: parseFloat(price),
      images: imageUrls,
      model: modelUrl,
      // Add other fields as necessary
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to upload product");
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: "Product uploaded successfully!",
      });

      // Clear the form
      setUploadedFiles([]);
      setModelFile(null);
      setProductName("");
      setProductDescription("");
      setPrice("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Product</h1>

      <Alert variant="info" className="mb-8 border-blue-900/50 bg-blue-900/10">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Upload high-quality images and a 3D model of your product for the best
          AR experience.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Tabs defaultValue="images">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="images">Product Images</TabsTrigger>
              <TabsTrigger value="model">3D Model</TabsTrigger>
            </TabsList>
            <TabsContent value="images">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg mb-2">Drag & drop product images here</p>
                <p className="text-sm text-gray-400">
                  or click to select files
                </p>
              </div>
            </TabsContent>
            <TabsContent value="model">
              <div
                {...getModelRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isModelDragActive
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <input {...getModelInputProps()} />
                <Cube className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg mb-2">Drag & drop 3D model here</p>
                <p className="text-sm text-gray-400">
                  or click to select file (GLB or GLTF)
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              className="mt-1 bg-gray-800 text-white border-gray-700"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="productDescription">Product Description</Label>
            <textarea
              id="productDescription"
              className="mt-1 w-full h-32 px-3 py-2 text-white bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              className="mt-1 bg-gray-800 text-white border-gray-700"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <Button
            className="mt-6 w-full"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Product"}
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
          <ScrollArea className="h-[calc(100vh-20rem)] rounded-md border border-gray-800">
            {uploadedFiles.length > 0 || modelFile ? (
              <div className="p-4 space-y-4">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-16 w-16 relative rounded overflow-hidden">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded file ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {modelFile && (
                  <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-16 w-16 flex items-center justify-center bg-gray-700 rounded">
                        <Cube className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{modelFile.name}</p>
                        <p className="text-sm text-gray-400">
                          {(modelFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removeModelFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ImageIcon className="h-16 w-16 mb-4" />
                <p>No files uploaded yet</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
