import { useRef, useState } from "react";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState("");
  const [scannerPort, setScannerPort] = useState(null);
  console.log(scannerPort);
  const connectToScanner = async () => {
    try {
      const port = await navigator.serial.requestPort();
      console.log(port);
      await port.open({ baudRate: 9600 }); // Adjust baud rate based on your scanner's specifications
      setScannerPort(port);
      port.addEventListener("input", handleScannerInput);
    } catch (error) {
      console.error("Error connecting to QR scanner:", error);
    }
  };

  const disconnectScanner = async () => {
    if (scannerPort) {
      await scannerPort.close();
      setScannerPort(null);
    }
  };

  const handleScannerInput = (event) => {
    const scannerData = new TextDecoder().decode(event.data);
    setScannedData(scannerData);
  };


  const inputRef = useRef(null);
  const [barcode, setBarcode] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleBarcodeScan = (event) => {
    setBarcode(event.target.value);
  };

  const startScanning = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsActive(true);
    }
  };

  const stopScanning = () => {
    if (inputRef.current) {
      inputRef.current.blur();
      setIsActive(false);
    }
  };
  return (
    <div>
      <h4>QR Code Scanner</h4>
      <p>Scanned Data: {scannedData}</p>
      <button
        onClick={connectToScanner}
        style={{
          marginBottom: "20px",
        }}
      >
        Start Scanning
      </button>
      <button onClick={disconnectScanner}>Stop Scanning</button>

      <div>
        <h1>Barcode Scanner</h1>
        <input type="text" ref={inputRef} onChange={handleBarcodeScan} value={barcode} style={{ position: "absolute", opacity: 0, pointerEvents: "none" }} />
        <p>Scanned Barcode: {barcode}</p>
        <button onClick={startScanning} disabled={isActive}>
          Start Scanning
        </button>
        <button onClick={stopScanning} disabled={!isActive}>
          Stop Scanning
        </button>
      </div>
    </div>
  );
};

export default QRScanner;
