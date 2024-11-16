'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AlertCircle, ImageIcon, Upload, X } from 'lucide-react'
import Image from 'next/image'

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function AdminUploadPhotos() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prevFiles => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: true
  })

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Upload Product Photos</h1>

      <Alert variant="info" className="mb-8 border-blue-900/50 bg-blue-900/10">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Upload high-quality images of your products for the best AR experience.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg mb-2">Drag & drop product images here</p>
            <p className="text-sm text-gray-400">or click to select files</p>
          </div>

          <div className="mt-8">
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" className="mt-1 bg-gray-800 text-white border-gray-700" placeholder="Enter product name" />
          </div>

          <div className="mt-4">
            <Label htmlFor="productDescription">Product Description</Label>
            <textarea
              id="productDescription"
              className="mt-1 w-full h-32 px-3 py-2 text-white bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <Button className="mt-6 w-full">
            <Upload className="mr-2 h-4 w-4" /> Upload Photos
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
          <ScrollArea className="h-[calc(100vh-20rem)] rounded-md border border-gray-800">
            {uploadedFiles.length > 0 ? (
              <div className="p-4 space-y-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
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
                        <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(file)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
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
  )
}