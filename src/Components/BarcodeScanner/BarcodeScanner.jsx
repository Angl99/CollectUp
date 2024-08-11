import React, { useRef, useState, useEffect } from 'react';
import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';

export default function BarcodeScanner({ setScannedBarcode, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isBarcodeDetectorSupported, setIsBarcodeDetectorSupported] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (!('BarcodeDetector' in window)) {
      window.BarcodeDetector = BarcodeDetectorPolyfill;
    }

    let stream = null;

    const setupCamera = async () => {
      if (!isCameraActive) return;

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsVideoReady(true);
          };
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
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      window.removeEventListener('resize', updateDimensions);
    };
  }, [isCameraActive]);

  useEffect(() => {
    if (!isCameraActive || !isVideoReady) return;

    const detectBarcode = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const barcodeDetector = new window.BarcodeDetector();
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      let animationFrameId;

      const detectFrame = async () => {
        if (!isCameraActive || !videoRef.current) return;

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        try {
          const barcodes = await barcodeDetector.detect(canvas);
          if (barcodes.length > 0) {
            const scannedCode = barcodes[0].rawValue;
            const sanitizedCode = scannedCode.replace(/-/g, '');
            
            if (/^\d+$/.test(sanitizedCode) && (sanitizedCode.length === 12 || sanitizedCode.length === 13)) {
              let barcodeType;
              if (sanitizedCode.length === 13) {
                barcodeType = sanitizedCode.startsWith('0') ? "UPC-A (GTIN-12)" : "EAN-13 (ISBN/ GTIN-13)";
              } else {
                barcodeType = "UPC-A (GTIN-12)";
              }
              setScannedBarcode({ code: sanitizedCode, type: barcodeType });
            }
          }
        } catch (error) {
          console.error('Barcode detection error:', error);
        }

        animationFrameId = requestAnimationFrame(detectFrame);
      };

      detectFrame();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    };

    if ('BarcodeDetector' in window) {
      detectBarcode();
    } else {
      setIsBarcodeDetectorSupported(false);
      console.error('Barcode Detector is not supported in this browser');
    }
  }, [setScannedBarcode, isCameraActive, isVideoReady]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsVideoReady(false);
  };

  const handleClose = () => {
    setIsCameraActive(false);
    stopCamera();
    onClose();
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