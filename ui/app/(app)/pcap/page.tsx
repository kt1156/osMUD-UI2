"use client";

import { useEffect, useState } from "react";
import OverviewNavbar from "@/components/Navbar/OverviewNavbar";
import { useRouter } from "next/navigation";

export default function Pcappage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("visualiser");

  useEffect(() => {
    if (activeTab === "devices") {
      router.push("/overview");
    }
  }, [activeTab, router]);

  const [pcap1, setPcap1] = useState<File | null>(null);
  const [pcap2, setPcap2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [graphs, setGraphs] = useState<{
    transportGraph1: string;
    appGraph1: string;
    mixedGraph1: string;
    transportGraph2: string;
    appGraph2: string;
    mixedGraph2: string;
    latencyGraph1: string;
    latencyGraph2: string;
    bandwidthGraph1: string;
    bandwidthGraph2: string;
  } | null>(null);

  const [selectedGraph, setSelectedGraph] = useState<string | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileSetter: (file: File) => void
  ) => {
    if (event.target.files?.[0]) {
      fileSetter(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!pcap1 || !pcap2) {
      alert("Please upload two PCAP files.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("pcap1", pcap1);
    formData.append("pcap2", pcap2);

    try {
      const response = await fetch("http://127.0.0.1:5001/api/processPcap", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setGraphs(data);
      } else {
        alert("Error processing PCAP files.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload files.");
    } finally {
      setLoading(false);
    }
  };

  const handleGraphSelection = (graphType: string) => {
    setSelectedGraph(graphType);
  };

  return (
    <>
      <OverviewNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col items-center p-6">
        <h1 className="text-2xl font-semibold mb-4">Upload Two PCAP Files</h1>

        {/* File Upload Inputs */}
        <label className="block font-medium">
          Before MUD:
          <input
            type="file"
            accept=".pcap"
            onChange={(e) => handleFileChange(e, setPcap1)}
            className="mb-4 p-2"
          />
        </label>

        <label className="block font-medium">
          After MUD:
          <input
            type="file"
            accept=".pcap"
            onChange={(e) => handleFileChange(e, setPcap2)}
            className="mb-4 p-2"
          />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Upload & Process"}
        </button>

        {/* Show Graphs After Processing */}
        {graphs && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Generated Graphs</h2>

            {/* Graph Selection Buttons */}
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => handleGraphSelection("application")}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Application Layers
              </button>
              <button
                onClick={() => handleGraphSelection("transport")}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Transport Layers
              </button>
              <button
                onClick={() => handleGraphSelection("combined")}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Combined Layers
              </button>
              <button
                onClick={() => handleGraphSelection("bandwidth")}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Bandwidth
              </button>
              <button
                onClick={() => handleGraphSelection("latency")}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Latency
              </button>
            </div>

            {/* Descriptions Before Graphs */}
            {selectedGraph && graphs && (
              <div className="flex justify-center mb-4">
                {selectedGraph === "application" && (
                  <div className="w-full px-4 text-center">
                    <p>
                      Application Layer: This shows the types of services or applications your device is using (e.g., web browsing, streaming, or DNS request). 
                      <br />This lets you see which services are using the most traffic - helping you notice if there is unexpected activity.
                      <br />
                      Before MUD vs After MUD generated graphs:
                    </p>
                  </div>
                )}
                {selectedGraph === "transport" && (
                  <div className="w-full px-4 text-center">
                    <p>
                      Transport Layer: This shows how your device's data is being sent (e.g., TCP, UDP, etc.). 
                      <br />It gives insight into whether the traffic is stable, secure, and if the device is behaving as expected.
                      <br />
                      Before MUD vs After MUD generated graphs:
                    </p>
                  </div>
                )}
                {selectedGraph === "combined" && (
                  <div className="w-full px-4 text-center">
                    <p>
                      Combined Layers: This graph combines both the application and transport layers to give a comprehensive view of the network traffic before and after MUD enforcement. 
                      <br />This can help you identify overall trends in network behaviour.
                      <br />
                      Before MUD vs After MUD generated graphs:
                    </p>
                  </div>
                )}
                {selectedGraph === "bandwidth" && (
                  <div className="w-full px-4 text-center">
                    <p>
                      Bandwidth: More data can travel after MUD is enforced. 
                      <br/>This graph shows the impact of MUD enforcement on available bandwidth, helping you see if the restrictions have led to an increase in the throughput.
                      <br />
                      Before MUD vs After MUD generated graphs:
                    </p>
                  </div>
                )}
                {selectedGraph === "latency" && (
                  <div className="w-full px-4 text-center">
                    <p>
                      Latency: The time taken for data to travel. 
                      <br/>This graph highlights the latency differences before and after MUD enforcement, helping you understand the impact of MUD on communication delay.
                      <br />
                      Before MUD vs After MUD generated graphs:
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Display Selected Graphs */}
            {selectedGraph && graphs && (
              <div className="flex justify-center">
                {selectedGraph === "application" && (
                  <div className="flex space-x-4">
                    <img
                      src={`data:image/png;base64,${graphs.appGraph1}`}
                      alt="Application Graph 1"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                    <img
                      src={`data:image/png;base64,${graphs.appGraph2}`}
                      alt="Application Graph 2"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                  </div>
                )}
                {selectedGraph === "transport" && (
                  <div className="flex space-x-4">
                    <img
                      src={`data:image/png;base64,${graphs.transportGraph1}`}
                      alt="Transport Graph 1"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                    <img
                      src={`data:image/png;base64,${graphs.transportGraph2}`}
                      alt="Transport Graph 2"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                  </div>
                )}
                {selectedGraph === "combined" && (
                  <div className="flex space-x-4">
                    <img
                      src={`data:image/png;base64,${graphs.mixedGraph1}`}
                      alt="Combined Graph 1"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                    <img
                      src={`data:image/png;base64,${graphs.mixedGraph2}`}
                      alt="Combined Graph 2"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                  </div>
                )}
                {selectedGraph === "bandwidth" && (
                  <div className="flex space-x-4">
                    <img
                      src={`data:image/png;base64,${graphs.bandwidthGraph1}`}
                      alt="Bandwidth Graph 1"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                    <img
                      src={`data:image/png;base64,${graphs.bandwidthGraph2}`}
                      alt="Bandwidth Graph 2"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                  </div>
                )}
                {selectedGraph === "latency" && (
                  <div className="flex space-x-4">
                    <img
                      src={`data:image/png;base64,${graphs.latencyGraph1}`}
                      alt="Latency Graph 1"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                    <img
                      src={`data:image/png;base64,${graphs.latencyGraph2}`}
                      alt="Latency Graph 2"
                      className="border rounded-lg shadow-md"
                      style={{ width: "600px", height: "400px" }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
