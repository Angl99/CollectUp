import React, { useRef, useState, useEffect } from 'react';

export default function BarcodeScanner({ onBarcodeDetected }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (isScanning) {
      setupCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isScanning]);

  useEffect(() => {
    const detectBarcode = async () => {
      if (!videoRef.current || !canvasRef.current || !isScanning) return;

      const barcodeDetector = new BarcodeDetector();
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const detectFrame = async () => {
        if (!isScanning) return;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        try {
          const barcodes = await barcodeDetector.detect(canvas);
          if (barcodes.length > 0) {
            onBarcodeDetected(barcodes[0].rawValue);
            setIsScanning(false);
          }
        } catch (error) {
          console.error('Barcode detection error:', error);
        }
        requestAnimationFrame(detectFrame);
      };

      requestAnimationFrame(detectFrame);
    };

    if ('BarcodeDetector' in window && isScanning) {
      detectBarcode();
    } else if (!('BarcodeDetector' in window)) {
      console.error('Barcode Detector is not supported in this browser');
    }
  }, [isScanning, onBarcodeDetected]);

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  return (
    <div>
      <button 
        onClick={toggleScanning}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
      {isScanning && (
        <>
          <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
          <canvas ref={canvasRef} width="300" height="200" />
        </>
      )}
    </div>
  );
}
