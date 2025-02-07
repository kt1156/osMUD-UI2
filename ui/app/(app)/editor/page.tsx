"use client";

import MudInfo from "@/components/MudInfo";
import Navbar from "@/components/Navbar/Navbar";
import PolicyList from "@/components/PolicyList";
import ScreenLoading from "@/components/ScreenLoading";
import { MudContext } from "@/contexts/MudContext";
import MudParser from "@/services/MudParser";
import MudStore from "@/services/MudStore";
import DeviceService from "@/services/api/DeviceService";
import { ApiError } from "@/services/api/NetworkService";
import { MudFile, DefaultMudInfo } from "@/types/Mud";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const { refetch } = useQuery<any, ApiError>(
    "getDevice",
    () => {
      const urlMacAddress = searchParams.get("mac");
      if (urlMacAddress != null)
        return DeviceService.GetDeviceMudFile(urlMacAddress);
      else
        throw {
          status: 404,
          message: "no mac provided",
        } as ApiError;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      onSettled: (data, error) => {
        if (error == null) {
          setMud(MudParser.parse(data));
          setRawMud(data);
          setEditedMud(MudParser.parse(data));
        }
        setLoading(false);
        setRefreshing(false);
      },
    }
  );
  
  const [mud, setMud] = useState<MudFile>({ ...DefaultMudInfo });
  const [rawMud, setRawMud] = useState<any>({});
  const [editedMud, setEditedMud] = useState<MudFile>({ ...DefaultMudInfo });
  const [blockedPolicies, setBlockedPolicies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const refreshMud = () => {
    setRefreshing(true);
    setBlockedPolicies([]);
    setMud({ ...DefaultMudInfo });
    setRawMud({});
    setTimeout(() => {
      refetch();
    }, 10000); // TODO: Create an endpoint to check if its updated instead of just waiting 10 seconds
  };

  const loadMud = () => {
    setLoading(true);
    let loadedMud = MudStore.LoadJson();
    if (loadedMud == null) {
      setLoading(false);
      setMud({ ...DefaultMudInfo });
      return;
    }

    let newMud = MudParser.parse(loadedMud);
    setMud(newMud);
    setRawMud(loadedMud);
    setBlockedPolicies([]);
    setEditedMud(newMud);
    setLoading(false);
  };

  const removeBlockedPolicy = (policy: string) => {
    setBlockedPolicies(blockedPolicies.filter((v) => v !== policy));
  };

  const addBlockedPolicy = (policy: string) => {
    setBlockedPolicies([...blockedPolicies, policy]);
  };

  const updateMudField = (field: keyof MudFile, value: any) => {
    setEditedMud((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateAceField = (aclIndex: number, aceIndex: number, field: string, value: any) => {
    setEditedMud((prev) => {
      const newAcls = [...prev.acls]; 
      const newAces = [...newAcls[aclIndex].aces.ace]; 
      const newAce = { ...newAces[aceIndex] }; 
  
      const fieldParts = field.split(".");
      let obj: any = newAce;
      for (let i = 0; i < fieldParts.length - 1; i++) {
        obj = obj[fieldParts[i]] ||= {};
      }
      obj[fieldParts[fieldParts.length - 1]] = value;
  
      newAces[aceIndex] = newAce;
      newAcls[aclIndex].aces.ace = newAces;
  
      return {
        ...prev,
        acls: newAcls,
      };
    });
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditedMud({ ...mud });
  };

  const saveChanges = async () => {
    setLoading(true);
    try {
      await DeviceService.UpdateDeviceMudFile(editedMud);

      setMud(editedMud);
      setEditMode(false);
      alert("MUD file updated successfully!");
    } catch (error) {
      console.error("Error updating MUD file:", error);
      alert("Failed to update MUD file");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ScreenLoading />;
  }

  return (
    <MudContext.Provider 
      value={{ blockedPolicies, 
      addBlockedPolicy, 
      removeBlockedPolicy, 
      mud, 
      rawMud, 
      refresh: refreshMud, 
      refreshing, 
      load: loadMud }}>
      <div className="flex flex-col gap-y-4">
        <Navbar />

        {refreshing ? (
          <div className="my-14 flex flex-col place-items-center justify-center text-primary-content">
            <span className="loading loading-ring loading-lg"></span>
            <p className="font-semibold mt-6">Applying MUD Policy...</p>
          </div>
        ) : (
          <section className="px-6 flex flex-col gap-y-8">
            <MudInfo />

            {/* Edit MUD File */}
            {mud && mud.mudUrl && !editMode && (
              <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit MUD File
              </button>
            )}

            {editMode ? (
              <div className="p-6 border rounded-lg shadow">
                <h2 className="text-xl font-semibold">Edit MUD Configuration</h2>

                {/* MUD metadata */}
                <label className="block font-medium mt-4">MUD URL (Read-Only)</label>
                <input
                  type="text"
                  className="border p-2 w-full bg-gray-200"
                  value={editedMud.mudUrl}
                  readOnly
                />

                <label className="block font-medium mt-2">System Info</label>
                <input
                  type="text"
                  className="border p-2 w-full"
                  value={editedMud.systemInfo}
                  onChange={(e) => updateMudField("systemInfo", e.target.value)}
                />

                {/* Policy Editing Section */}
                <h2 className="text-lg font-semibold mt-6">Edit Policies</h2>

                {/* From Device Policy Edit Section */}
                {editedMud.acls.map((acl, aclIndex) => (
                  <div key={aclIndex} className="mt-4 p-4 border rounded">
                    <h3 className="font-medium">Policy: {acl.name}</h3>

                    {acl.aces.ace.map((ace, aceIndex) => (
                      <div key={aceIndex} className="mt-2">
                        <label className="block font-medium">Rule Name</label>
                        <input
                          type="text"
                          className="border p-2 w-full"
                          value={ace.name}
                          onChange={(e) =>
                            updateAceField(aclIndex, aceIndex, "name", e.target.value)
                          }
                        />

                        {/* Non-editable Source and Destination Ports */}
                        <label className="block font-medium mt-4">Source Port (Read-Only)</label>
                        <input
                          type="text"
                          className="border p-2 w-full bg-gray-200"
                          value={ace.matches.tcp?.sourcePort?.port || "N/A"}
                          disabled
                        />

                        <label className="block font-medium mt-2">Destination Port (Read-Only)</label>
                        <input
                          type="text"
                          className="border p-2 w-full bg-gray-200"
                          value={ace.matches.tcp?.destinationPort?.port || "N/A"}
                          disabled
                        />

                        <label className="block font-medium mt-2">Forwarding</label>
                        <select
                          className="border p-2 w-full"
                          value={ace.actions.forwarding}
                          onChange={(e) =>
                            updateAceField(
                              aclIndex,
                              aceIndex,
                              "actions.forwarding",
                              e.target.value
                            )
                          }
                        >
                          <option value="accept">Accept</option>
                          <option value="deny">Deny</option>
                        </select>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Save and Cancel */}
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={cancelEditing}
                    className="bg-[#ff5c64] text-white px-4 py-2 rounded"
                  >
                    Cancel Editing
                  </button>

                  <button
                    onClick={saveChanges}
                    className="bg-[#08945c] text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <PolicyList />
            )}
          </section>
        )}
      </div>
    </MudContext.Provider>
  );
}
