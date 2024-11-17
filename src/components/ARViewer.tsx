"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

// Declare the model-viewer element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string;
        "ios-src"?: string;
        poster?: string;
        alt: string;
        ar?: boolean;
        "ar-modes"?: string;
        "camera-controls"?: boolean;
        "environment-image"?: string;
        "shadow-intensity"?: string;
        "auto-rotate"?: boolean;
        "rotation-per-second"?: string;
      };
    }
  }
}

interface ARViewerProps {
  modelSrc: string;
  iosSrc?: string;
  poster?: string;
  alt: string;
}

export default function ARViewer({
  modelSrc,
  iosSrc,
  poster,
  alt,
}: ARViewerProps) {
  const modelViewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load the model-viewer script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.addEventListener("load", () => {
        console.log("Model loaded successfully");
      });

      modelViewer.addEventListener("error", (error) => {
        console.error("Error loading model:", error);
      });
    }
  }, []);

  return (
    <div className="ar-viewer-container w-full h-[400px] relative">
      <model-viewer
        ref={modelViewerRef}
        src={modelSrc}
        ios-src={iosSrc}
        poster={poster}
        alt={alt}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        environment-image="neutral"
        shadow-intensity="1"
        auto-rotate
        rotation-per-second="30deg"
        className="w-full h-full"
      >
        <Button
          slot="ar-button"
          className="ar-button absolute bottom-4 right-4"
        >
          View in your space
        </Button>
      </model-viewer>
    </div>
  );
}
