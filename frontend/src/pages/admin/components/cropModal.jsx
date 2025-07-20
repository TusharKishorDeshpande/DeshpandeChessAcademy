import React, { useState, useRef, useEffect } from "react";
import { X, RotateCw, Move, ZoomIn, ZoomOut } from "lucide-react";

// Theme colors
const theme = {
  modal: "bg-gray-800",
  primaryText: "text-gray-100",
  secondaryText: "text-gray-400",
  accentBg: "bg-yellow-500",
  accentHoverBg: "hover:bg-yellow-600",
  borderColor: "border-gray-700",
};

function CropModal({ isOpen, onClose, onCrop, image, aspectRatio = 4 / 3 }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [resizing, setResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [resizeCorner, setResizeCorner] = useState("");
  const [cursorStyle, setCursorStyle] = useState("move"); // Default cursor style

  // Use the provided aspect ratio
  const ASPECT_RATIO = aspectRatio;

  useEffect(() => {
    if (isOpen && image) {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setImageLoaded(true);
        initializeCropArea(img);
      };
      img.src = URL.createObjectURL(image);
    }
  }, [isOpen, image]);

  useEffect(() => {
    if (imageLoaded && canvasRef.current) {
      drawCanvas();
    }
  }, [imageLoaded, cropArea, scale, rotation]);

  // Update the canvas dimensions to match the 4:3 aspect ratio
  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      // Set canvas width based on container size, but maintain 4:3 ratio
      const containerWidth = canvas.parentElement.clientWidth;
      // Make the canvas smaller - adjust size based on aspect ratio
      const maxWidth = Math.min(containerWidth, ASPECT_RATIO > 1 ? 500 : 400);

      canvas.width = maxWidth;
      canvas.height = maxWidth / ASPECT_RATIO; // Use dynamic aspect ratio

      if (imageLoaded) {
        drawCanvas();
      }
    }
  }, [isOpen, imageLoaded]);

  const initializeCropArea = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate how the image will be drawn
    const imgAspect = img.width / img.height;
    const canvasAspect = canvasWidth / canvasHeight;

    let imageDrawWidth, imageDrawHeight, imageOffsetX, imageOffsetY;

    if (imgAspect > canvasAspect) {
      // Image is wider than canvas
      imageDrawWidth = canvasWidth;
      imageDrawHeight = canvasWidth / imgAspect;
      imageOffsetX = 0;
      imageOffsetY = (canvasHeight - imageDrawHeight) / 2;
    } else {
      // Image is taller than canvas
      imageDrawHeight = canvasHeight;
      imageDrawWidth = canvasHeight * imgAspect;
      imageOffsetX = (canvasWidth - imageDrawWidth) / 2;
      imageOffsetY = 0;
    }

    // Calculate initial crop area maintaining the specified aspect ratio within the image bounds
    const maxCropWidth = imageDrawWidth * 0.8;
    const maxCropHeight = imageDrawHeight * 0.8;

    let cropWidth, cropHeight;

    // Choose the smaller dimension to ensure crop area fits within image
    if (maxCropWidth / ASPECT_RATIO <= maxCropHeight) {
      cropWidth = maxCropWidth;
      cropHeight = cropWidth / ASPECT_RATIO;
    } else {
      cropHeight = maxCropHeight;
      cropWidth = cropHeight * ASPECT_RATIO;
    }

    setCropArea({
      x: imageOffsetX + (imageDrawWidth - cropWidth) / 2,
      y: imageOffsetY + (imageDrawHeight - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight,
    });
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    if (!canvas || !ctx || !img) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate image dimensions to fit canvas while maintaining aspect ratio
    const imgAspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      // Image is wider than canvas
      drawWidth = canvas.width * scale;
      drawHeight = drawWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = canvas.height * scale;
      drawWidth = drawHeight * imgAspect;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    // Save context for rotation
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw image
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Restore context
    ctx.restore();

    // Store image dimensions for cropping calculations
    canvas.imageDrawWidth = drawWidth;
    canvas.imageDrawHeight = drawHeight;
    canvas.imageOffsetX = offsetX;
    canvas.imageOffsetY = offsetY;

    // Draw crop overlay
    drawCropOverlay(ctx);
  };

  const drawCropOverlay = (ctx) => {
    const canvas = canvasRef.current;

    // Create a semi-transparent overlay for the entire canvas
    // Using rgba with very low opacity (0.5) for better visibility of the image
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

    // Draw four separate rectangles around the crop area instead of using clearRect
    // Top rectangle
    ctx.fillRect(0, 0, canvas.width, cropArea.y);
    // Left rectangle
    ctx.fillRect(0, cropArea.y, cropArea.x, cropArea.height);
    // Right rectangle
    ctx.fillRect(
      cropArea.x + cropArea.width,
      cropArea.y,
      canvas.width - (cropArea.x + cropArea.width),
      cropArea.height
    );
    // Bottom rectangle
    ctx.fillRect(
      0,
      cropArea.y + cropArea.height,
      canvas.width,
      canvas.height - (cropArea.y + cropArea.height)
    );

    // Draw crop border
    ctx.strokeStyle = "#eab308";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Draw corner handles
    const handleSize = 12; // Larger handles for easier grabbing
    ctx.fillStyle = "#eab308";

    // Top-left
    ctx.fillRect(
      cropArea.x - handleSize / 2,
      cropArea.y - handleSize / 2,
      handleSize,
      handleSize
    );
    // Top-right
    ctx.fillRect(
      cropArea.x + cropArea.width - handleSize / 2,
      cropArea.y - handleSize / 2,
      handleSize,
      handleSize
    );
    // Bottom-left
    ctx.fillRect(
      cropArea.x - handleSize / 2,
      cropArea.y + cropArea.height - handleSize / 2,
      handleSize,
      handleSize
    );
    // Bottom-right
    ctx.fillRect(
      cropArea.x + cropArea.width - handleSize / 2,
      cropArea.y + cropArea.height - handleSize / 2,
      handleSize,
      handleSize
    );
  };

  const isInResizeHandle = (x, y) => {
    const handleSize = 12; // Match the size used in drawCropOverlay
    const handles = {
      topLeft: {
        x: cropArea.x - handleSize / 2,
        y: cropArea.y - handleSize / 2,
      },
      topRight: {
        x: cropArea.x + cropArea.width - handleSize / 2,
        y: cropArea.y - handleSize / 2,
      },
      bottomLeft: {
        x: cropArea.x - handleSize / 2,
        y: cropArea.y + cropArea.height - handleSize / 2,
      },
      bottomRight: {
        x: cropArea.x + cropArea.width - handleSize / 2,
        y: cropArea.y + cropArea.height - handleSize / 2,
      },
    };

    for (const [corner, handle] of Object.entries(handles)) {
      if (
        x >= handle.x &&
        x <= handle.x + handleSize &&
        y >= handle.y &&
        y <= handle.y + handleSize
      ) {
        return corner;
      }
    }

    return null;
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if we're on a resize handle
    const corner = isInResizeHandle(x, y);
    if (corner) {
      setResizing(true);
      setResizeCorner(corner);
      setResizeStart({ x, y });
      return;
    }

    // Otherwise check if we're in the crop area for dragging
    if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update cursor style based on position
    const corner = isInResizeHandle(x, y);
    if (corner) {
      // Set appropriate resize cursor based on which corner
      if (corner === "topLeft" || corner === "bottomRight") {
        setCursorStyle("nwse-resize");
      } else {
        setCursorStyle("nesw-resize");
      }
    } else if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      setCursorStyle("move");
    } else {
      setCursorStyle("default");
    }

    // Handle resizing
    if (resizing) {
      const deltaX = x - resizeStart.x;
      const deltaY = y - resizeStart.y;
      let newCropArea = { ...cropArea };

      // Calculate new dimensions based on which corner is being dragged
      if (resizeCorner === "topLeft") {
        // Calculate new width and maintain aspect ratio
        const newWidth = Math.max(50, cropArea.width - deltaX);
        const newHeight = newWidth / ASPECT_RATIO;

        newCropArea = {
          x: cropArea.x + (cropArea.width - newWidth),
          y: cropArea.y + (cropArea.height - newHeight),
          width: newWidth,
          height: newHeight,
        };
      } else if (resizeCorner === "topRight") {
        // Calculate new width and maintain aspect ratio
        const newWidth = Math.max(50, cropArea.width + deltaX);
        const newHeight = newWidth / ASPECT_RATIO;

        newCropArea = {
          x: cropArea.x,
          y: cropArea.y + (cropArea.height - newHeight),
          width: newWidth,
          height: newHeight,
        };
      } else if (resizeCorner === "bottomLeft") {
        // Calculate new width and maintain aspect ratio
        const newWidth = Math.max(50, cropArea.width - deltaX);
        const newHeight = newWidth / ASPECT_RATIO;

        newCropArea = {
          x: cropArea.x + (cropArea.width - newWidth),
          y: cropArea.y,
          width: newWidth,
          height: newHeight,
        };
      } else if (resizeCorner === "bottomRight") {
        // Calculate new width and maintain aspect ratio
        const newWidth = Math.max(50, cropArea.width + deltaX);
        const newHeight = newWidth / ASPECT_RATIO;

        newCropArea = {
          x: cropArea.x,
          y: cropArea.y,
          width: newWidth,
          height: newHeight,
        };
      }

      // Ensure crop area stays within canvas bounds (allow full canvas movement)
      if (newCropArea.x < 0) {
        const adjustment = -newCropArea.x;
        newCropArea.x = 0;
        newCropArea.width -= adjustment;
        newCropArea.height = newCropArea.width / ASPECT_RATIO;
      }

      if (newCropArea.y < 0) {
        const adjustment = -newCropArea.y;
        newCropArea.y = 0;
        newCropArea.height -= adjustment;
        newCropArea.width = newCropArea.height * ASPECT_RATIO;
      }

      if (newCropArea.x + newCropArea.width > canvas.width) {
        newCropArea.width = canvas.width - newCropArea.x;
        newCropArea.height = newCropArea.width / ASPECT_RATIO;
      }

      if (newCropArea.y + newCropArea.height > canvas.height) {
        newCropArea.height = canvas.height - newCropArea.y;
        newCropArea.width = newCropArea.height * ASPECT_RATIO;
      }

      setCropArea(newCropArea);
      setResizeStart({ x, y });
      return;
    }

    // Handle dragging
    if (isDragging) {
      const newX = Math.max(
        0,
        Math.min(x - dragStart.x, canvas.width - cropArea.width)
      );
      const newY = Math.max(
        0,
        Math.min(y - dragStart.y, canvas.height - cropArea.height)
      );

      setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(false);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;

    if (!canvas || !img) return;

    // Create a new canvas for the cropped image
    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");

    // Set canvas size to maintain the specified aspect ratio
    const outputWidth = 800; // Fixed width
    const outputHeight = outputWidth / ASPECT_RATIO; // Dynamic height based on aspect ratio

    cropCanvas.width = outputWidth;
    cropCanvas.height = outputHeight;

    // Get the image drawing dimensions from the canvas
    const imageDrawWidth = canvas.imageDrawWidth || canvas.width;
    const imageDrawHeight = canvas.imageDrawHeight || canvas.height;
    const imageOffsetX = canvas.imageOffsetX || 0;
    const imageOffsetY = canvas.imageOffsetY || 0;

    // Calculate the crop area relative to the drawn image
    const cropRelativeX = cropArea.x - imageOffsetX;
    const cropRelativeY = cropArea.y - imageOffsetY;

    // Calculate scale factors from drawn image to original image
    const scaleX = img.width / imageDrawWidth;
    const scaleY = img.height / imageDrawHeight;

    // Calculate source rectangle in original image coordinates
    const sourceX = Math.max(0, cropRelativeX * scaleX);
    const sourceY = Math.max(0, cropRelativeY * scaleY);
    const sourceWidth = Math.min(img.width - sourceX, cropArea.width * scaleX);
    const sourceHeight = Math.min(
      img.height - sourceY,
      cropArea.height * scaleY
    );

    // Ensure we don't go outside image bounds
    if (
      sourceX >= img.width ||
      sourceY >= img.height ||
      sourceWidth <= 0 ||
      sourceHeight <= 0
    ) {
      console.error("Invalid crop area");
      return;
    }

    // Draw the cropped portion
    cropCtx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );

    // Convert to blob and call onCrop
    cropCanvas.toBlob(
      (blob) => {
        const croppedImageUrl = URL.createObjectURL(blob);
        onCrop(croppedImageUrl);
      },
      "image/jpeg",
      0.9
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`${theme.modal} rounded-lg shadow-xl w-full max-w-xl border ${theme.borderColor}`}
      >
        <div
          className={`flex justify-between items-center p-3 border-b ${theme.borderColor}`}
        >
          <h3 className={`text-lg font-semibold ${theme.primaryText}`}>
            Crop Image (
            {ASPECT_RATIO === 4 / 3
              ? "4:3"
              : ASPECT_RATIO === 3 / 4
              ? "3:4"
              : ASPECT_RATIO > 1
              ? `${Math.round(ASPECT_RATIO * 10) / 10}:1`
              : `${Math.round(10 / ASPECT_RATIO) / 10}:1`}{" "}
            Ratio)
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <X size={18} className={theme.secondaryText} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-center mb-3">
            <canvas
              ref={canvasRef}
              width={ASPECT_RATIO > 1 ? 500 : 400}
              height={
                ASPECT_RATIO > 1 ? 500 / ASPECT_RATIO : 400 / ASPECT_RATIO
              } // Dynamic height based on aspect ratio
              className="border border-gray-600"
              style={{ cursor: cursorStyle }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>

          <div className="flex justify-center space-x-3 mb-4">
            <button
              onClick={handleZoomOut}
              className="flex items-center px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
            >
              <ZoomOut size={14} className="mr-1" />
              Zoom Out
            </button>
            <button
              onClick={handleZoomIn}
              className="flex items-center px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
            >
              <ZoomIn size={14} className="mr-1" />
              Zoom In
            </button>
            <button
              onClick={handleRotate}
              className="flex items-center px-2 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
            >
              <RotateCw size={14} className="mr-1" />
              Rotate
            </button>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCrop}
              className={`px-4 py-1 ${theme.accentBg} text-black rounded-md ${theme.accentHoverBg} transition-colors font-semibold text-sm`}
            >
              Crop Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropModal;
