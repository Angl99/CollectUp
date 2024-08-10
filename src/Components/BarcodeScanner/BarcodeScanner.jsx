import React, { useRef, useState, useEffect } from 'react';
import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';

export default function BarcodeScanner({ setScannedBarcode, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isBarcodeDetectorSupported, setIsBarcodeDetectorSupported] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isCameraActive, setIsCameraActive] = useState(true);

  useEffect(() => {
    if (!('BarcodeDetector' in window)) {
      window.BarcodeDetector = BarcodeDetectorPolyfill;
    }

    const setupCamera = async () => {
      if (!isCameraActive) return;

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

    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      stopCamera();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isCameraActive]);

  useEffect(() => {
    if (!isCameraActive) return;

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
  }, [setScannedBarcode, isCameraActive]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleClose = () => {
    setIsCameraActive(false);
    stopCamera();
    onClose();
    window.location.reload();
  };

  if (!isCameraActive) {
    return null;
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '80vh' }}>
      {isBarcodeDetectorSupported ? (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ 
              display: 'none'
            }} 
          />
          <canvas 
            ref={canvasRef} 
            width={dimensions.width} 
            height={dimensions.height} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <button 
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '10px',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </>
      ) : (
        <p>Barcode Detector is not supported in this browser.</p>
      )}
    </div>
  );
}