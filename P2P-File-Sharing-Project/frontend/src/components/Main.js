import React, { useState, useEffect } from "react";
import { CloudUploadIcon, DownloadIcon, DeviceMobileIcon } from "@heroicons/react/outline";

function Main({ setTheme, isDarkTheme }) {
  const [file, setFile] = useState(null);
  const [targetIp, setTargetIp] = useState("");
  const [targetPort, setTargetPort] = useState("");
  const [isSender, setIsSender] = useState(true);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  const [deviceIp, setDeviceIp] = useState("Open Terminal and Type ipconfig");
  const PORT = 9000;

  const toggleTheme = () => setTheme(!isDarkTheme);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleIpChange = (e) => setTargetIp(e.target.value);
  const handlePortChange = (e) => setTargetPort(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !targetIp || !targetPort) {
      alert("Please provide all inputs.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetIp", targetIp);
    formData.append("targetPort", targetPort);

    try {
      const response = await fetch("http://localhost:8000/uploadAndShare", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message || "File sent successfully.");
    } catch (error) {
      console.error("Error uploading and sharing file:", error);
    }
  };

  const fetchReceivedFiles = async () => {
    try {
      const response = await fetch("http://localhost:8000/received-files");
      const files = await response.json();
      setReceivedFiles(files);

      if (files.length > fileCount) {
        alert("New file received!");
        setFileCount(files.length);
      }
    } catch (error) {
      console.error("Error fetching received files:", error);
    }
  };

  useEffect(() => {
    fetchReceivedFiles();
    const interval = setInterval(fetchReceivedFiles, 5000);
    return () => clearInterval(interval);
  }, [fileCount]);

  return (
    <div
      className={`App min-h-screen flex items-center justify-center transition-all duration-500 ${
        isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`App-header w-full max-w-2xl p-8 rounded-lg shadow-lg transition-all ${
          isDarkTheme ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
         
          
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsSender(true)}
            className={`py-2 px-4 mr-2 rounded-lg transition ${
              isSender
                ? "bg-indigo-500 text-white"
                : "bg-indigo-200 text-gray-800"
            }`}
          >
            <CloudUploadIcon className="w-5 h-5 inline-block mr-1" />
            Sending
          </button>
          <button
            onClick={() => setIsSender(false)}
            className={`py-2 px-4 rounded-lg transition ${
              !isSender
                ? "bg-indigo-500 text-white"
                : "bg-indigo-200 text-gray-800"
            }`}
          >
            <DownloadIcon className="w-5 h-5 inline-block mr-1" />
            Receiving
          </button>
        </div>

        {isSender ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4"
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-lg text-green-700 file:bg-green-300 hover:file:bg-green-400 file:mr-4 file:py-3 file:px-5 file:rounded-lg file:border-0 file:font-semibold"
              required
            />
            <input
              type="text"
              placeholder="Target IP"
              value={targetIp}
              onChange={handleIpChange}
              className="w-full px-5 py-3 bg-blue-100 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Target Port"
              value={targetPort}
              onChange={handlePortChange}
              className="w-full px-5 py-3 bg-purple-100 rounded-lg text-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 rounded-lg font-semibold text-lg text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-400"
            >
              Upload and Send
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-lg flex items-center">
              <DeviceMobileIcon className="w-5 h-5 mr-2" />
              Device IP: {deviceIp}
            </p>
            <p className="text-lg mt-1">Port: {PORT}</p>
            <h3 className="text-lg mt-4 font-semibold">Received Files:</h3>
            <ul className="mt-2">
              {receivedFiles.length === 0 ? (
                <li className="text-gray-500">No files received yet.</li>
              ) : (
                receivedFiles.map((filename, index) => (
                  <li
                    key={index}
                    className="text-gray-900 p-2 rounded-lg bg-gray-200 shadow-sm mb-1"
                  >
                    {filename}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
