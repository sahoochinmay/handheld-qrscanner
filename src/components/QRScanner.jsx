import { useState } from "react";

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
    </div>
  );
};

export default QRScanner;
