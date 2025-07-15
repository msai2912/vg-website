import React, { useState, useEffect } from "react";
import { offlineStorage } from "../utils/offlineStorage";

const SyncStatusIndicator = () => {
  const [status, setStatus] = useState({
    isOnline: navigator.onLine,
    pendingSync: 0,
    unsyncedItems: 0,
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const updateStatus = async () => {
      const syncStatus = await offlineStorage.getSyncStatus();
      setStatus(syncStatus);
    };

    updateStatus();

    const handleNetworkChange = () => {
      updateStatus();
    };

    offlineStorage.addListener(handleNetworkChange);

    const interval = setInterval(updateStatus, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSyncNow = async () => {
    if (status.isOnline) {
      await offlineStorage.syncWhenOnline();
      const newStatus = await offlineStorage.getSyncStatus();
      setStatus(newStatus);
    }
  };

  const getStatusColor = () => {
    if (!status.isOnline) return "bg-red-500";
    if (status.unsyncedItems > 0) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusText = () => {
    if (!status.isOnline) return "Offline";
    if (status.unsyncedItems > 0) return "Syncing...";
    return "Online";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="bg-white shadow-lg rounded-lg border border-gray-200 p-3 cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
          <span className="text-sm font-medium text-gray-700">
            {getStatusText()}
          </span>
          {status.unsyncedItems > 0 && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {status.unsyncedItems}
            </span>
          )}
        </div>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
            <div className="text-xs text-gray-600">
              <div>
                Network: {status.isOnline ? "Connected" : "Disconnected"}
              </div>
              <div>Pending sync: {status.pendingSync} items</div>
              <div>Unsynced data: {status.unsyncedItems} items</div>
            </div>

            {status.isOnline && status.unsyncedItems > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSyncNow();
                }}
                className="w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600 mb-1"
              >
                Sync Now
              </button>
            )}

            {/* Debug buttons */}
            <div className="flex space-x-1 mt-1">
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (
                    confirm(
                      "Clear all local data? This will remove offline students, records, and assessments."
                    )
                  ) {
                    const result = await offlineStorage.clearDatabase();
                    if (result.success) {
                      alert("Local data cleared successfully");
                      const newStatus = await offlineStorage.getSyncStatus();
                      setStatus(newStatus);
                    }
                  }
                }}
                className="flex-1 bg-yellow-500 text-white text-xs py-1 px-1 rounded hover:bg-yellow-600"
              >
                Clear Data
              </button>

              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (
                    confirm(
                      "Reset local database? This will delete and recreate the entire database."
                    )
                  ) {
                    const result = await offlineStorage.clearDatabase();
                    if (result.success) {
                      alert("Local database reset successfully");
                      const newStatus = await offlineStorage.getSyncStatus();
                      setStatus(newStatus);
                    }
                  }
                }}
                className="flex-1 bg-red-500 text-white text-xs py-1 px-1 rounded hover:bg-red-600"
              >
                Reset DB
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncStatusIndicator;
