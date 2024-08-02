import React, { useRef, useState, useEffect } from 'react';
import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';

export default function BarcodeScanner({ setScannedBarcode }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isBarcodeDetectorSupported, setIsBarcodeDetectorSupported] = useState(true);

  useEffect(() => {
    // If browswer is not supported, use polyfill 
    if (!('BarcodeDetector' in window)) {
      window.BarcodeDetector = BarcodeDetectorPolyfill;
    }

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

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const detectBarcode = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const barcodeDetector = new window.BarcodeDetector({});
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      let isCancelled = false;

      const detectFrame = async () => {
        if (isCancelled) return;

        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        try {
          const barcodes = await barcodeDetector.detect(canvas);
          if (barcodes.length > 0) {
            setScannedBarcode(barcodes[0].rawValue);
          }
        } catch (error) {
          console.error('Barcode detection error:', error);
        }
        requestAnimationFrame(detectFrame);
      };

      requestAnimationFrame(detectFrame);

      return () => {
        isCancelled = true;
      };
    };

    if ('BarcodeDetector' in window) {
      detectBarcode();
    } else {
      setIsBarcodeDetectorSupported(false);
      console.error('Barcode Detector is not supported in this browser');
    }
  }, [setScannedBarcode]);

  return (
    <div>
      {isBarcodeDetectorSupported ? (
        <>
          <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
          <canvas ref={canvasRef} width="300" height="200" />
        </>
      ) : (
        <p>Barcode Detector is not supported in this browser.</p>
      )}
    </div>
  );
};