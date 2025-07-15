import React, { useState, useEffect } from "react";

const TamilNaduTreeMap = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTree, setSelectedTree] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    district: "",
  });
  const [stats, setStats] = useState(null);

  const tamilNaduBounds = {
    north: 13.5,
    south: 8.0,
    east: 80.3,
    west: 76.2,
  };

  const majorCities = [
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
    { name: "Madurai", lat: 9.9252, lng: 78.1198 },
    { name: "Salem", lat: 11.664, lng: 78.146 },
    { name: "Tiruchirappalli", lat: 10.7905, lng: 78.7047 },
  ];

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (filters.status) queryParams.append("status", filters.status);
        if (filters.district) queryParams.append("district", filters.district);

        const response = await fetch(
          `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/trees/map/data?${queryParams}`
        );
        const data = await response.json();
        setTrees(data);
      } catch (error) {
        console.error("Error fetching trees:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/trees/stats/summary"
        );
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const loadData = async () => {
      await fetchTrees();
      await fetchStats();
    };

    loadData();
  }, [filters]);

  const updateTreeStatus = async (treeId, newStatus, healthStatus, notes) => {
    try {
      const response = await fetch(
        `http://ec2-13-229-224-44.ap-southeast-1.compute.amazonaws.com:3000/api/trees/${treeId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
            healthStatus: healthStatus,
            notes: notes,
            lastInspection: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        setFilters((prev) => ({ ...prev }));
        setSelectedTree(null);
        alert("Tree status updated successfully!");
      } else {
        alert("Error updating tree status");
      }
    } catch (error) {
      console.error("Error updating tree:", error);
      alert("Error updating tree status");
    }
  };

  const latLngToSVG = (lat, lng) => {
    const x =
      ((lng - tamilNaduBounds.west) /
        (tamilNaduBounds.east - tamilNaduBounds.west)) *
      800;
    const y =
      ((tamilNaduBounds.north - lat) /
        (tamilNaduBounds.north - tamilNaduBounds.south)) *
      600;
    return { x, y };
  };

  const getTreeColor = (tree) => {
    if (tree.status === "planted") return "#8B4513";
    if (tree.status === "growing") return "#228B22";
    if (tree.status === "mature") return "#006400";
    if (tree.status === "dead") return "#8B0000";
    return "#696969";
  };

  const getTreeSize = (tree) => {
    if (tree.status === "planted") return 4;
    if (tree.status === "growing") return 6;
    if (tree.status === "mature") return 8;
    return 4;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center">
            🌳 Tamil Nadu Tree Plantation Map
          </h2>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total Trees</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.byStatus.planted || 0}
                </div>
                <div className="text-sm text-gray-600">Planted</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.byStatus.growing || 0}
                </div>
                <div className="text-sm text-gray-600">Growing</div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {stats.byStatus.mature || 0}
                </div>
                <div className="text-sm text-gray-600">Mature</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.recentlyPlanted}
                </div>
                <div className="text-sm text-gray-600">Recent (30 days)</div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Status</option>
              <option value="planted">Planted</option>
              <option value="growing">Growing</option>
              <option value="mature">Mature</option>
              <option value="dead">Dead</option>
            </select>

            <select
              value={filters.district}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, district: e.target.value }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Districts</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
              <option value="Salem">Salem</option>
              <option value="Tiruchirappalli">Tiruchirappalli</option>
              <option value="Tirunelveli">Tirunelveli</option>
              <option value="Vellore">Vellore</option>
              <option value="Erode">Erode</option>
              <option value="Dindigul">Dindigul</option>
              <option value="Thanjavur">Thanjavur</option>
              <option value="Kanchipuram">Kanchipuram</option>
              <option value="Cuddalore">Cuddalore</option>
              <option value="Thoothukudi">Thoothukudi</option>
              <option value="Nagapattinam">Nagapattinam</option>
              <option value="Villupuram">Villupuram</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-lg text-gray-600">Loading trees...</div>
                </div>
              ) : (
                <div className="w-full overflow-auto">
                  <svg
                    width="800"
                    height="600"
                    viewBox="0 0 800 600"
                    className="w-full h-auto border border-gray-200 rounded-lg"
                  >
                    {/* Tamil Nadu outline (simplified) */}
                    <path
                      d="M 50 100 L 750 100 L 750 150 L 700 200 L 750 250 L 750 300 L 700 350 L 650 400 L 600 450 L 500 500 L 400 550 L 300 500 L 200 450 L 150 400 L 100 350 L 50 300 L 100 250 L 150 200 L 100 150 Z"
                      fill="#e8f5e8"
                      stroke="#4a5568"
                      strokeWidth="2"
                    />

                    {/* Major cities */}
                    {majorCities.map((city, index) => {
                      const { x, y } = latLngToSVG(city.lat, city.lng);
                      return (
                        <g key={index}>
                          <circle cx={x} cy={y} r="3" fill="#2d3748" />
                          <text
                            x={x + 5}
                            y={y - 5}
                            fontSize="10"
                            fill="#2d3748"
                            fontWeight="bold"
                          >
                            {city.name}
                          </text>
                        </g>
                      );
                    })}

                    {/* Trees */}
                    {trees.map((tree) => {
                      const { x, y } = latLngToSVG(
                        parseFloat(tree.latitude),
                        parseFloat(tree.longitude)
                      );
                      return (
                        <circle
                          key={tree.id}
                          cx={x}
                          cy={y}
                          r={getTreeSize(tree)}
                          fill={getTreeColor(tree)}
                          stroke="#fff"
                          strokeWidth="1"
                          className="cursor-pointer hover:stroke-2 transition-all"
                          onClick={() => setSelectedTree(tree)}
                        >
                          <title>{`${tree.treeType} - ${tree.location} (${tree.status})`}</title>
                        </circle>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Tree Status Legend
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#8B4513" }}
                  ></div>
                  <span className="text-sm text-gray-700">Planted</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#228B22" }}
                  ></div>
                  <span className="text-sm text-gray-700">Growing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#006400" }}
                  ></div>
                  <span className="text-sm text-gray-700">Mature</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#8B0000" }}
                  ></div>
                  <span className="text-sm text-gray-700">Dead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tree Details Modal */}
      {selectedTree && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTree(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                🌳 {selectedTree.treeType}
              </h3>
              <button
                onClick={() => setSelectedTree(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-3 mb-6">
                <p className="text-sm">
                  <strong className="text-gray-700">Location:</strong>{" "}
                  <span className="text-gray-600">{selectedTree.location}</span>
                </p>
                <p className="text-sm">
                  <strong className="text-gray-700">Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedTree.status === "planted"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedTree.status === "growing"
                        ? "bg-green-100 text-green-800"
                        : selectedTree.status === "mature"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedTree.status === "dead"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedTree.status}
                  </span>
                </p>
                <p className="text-sm">
                  <strong className="text-gray-700">Health:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedTree.healthStatus === "healthy"
                        ? "bg-green-100 text-green-800"
                        : selectedTree.healthStatus === "diseased"
                        ? "bg-red-100 text-red-800"
                        : selectedTree.healthStatus === "pest_affected"
                        ? "bg-orange-100 text-orange-800"
                        : selectedTree.healthStatus === "drought_stressed"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedTree.healthStatus}
                  </span>
                </p>
                <p className="text-sm">
                  <strong className="text-gray-700">Planted by:</strong>{" "}
                  <span className="text-gray-600">
                    {selectedTree.plantedBy}
                  </span>
                </p>
                <p className="text-sm">
                  <strong className="text-gray-700">Planted on:</strong>{" "}
                  <span className="text-gray-600">
                    {new Date(selectedTree.plantedDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm">
                  <strong className="text-gray-700">Coordinates:</strong>{" "}
                  <span className="text-gray-600">
                    {selectedTree.latitude}, {selectedTree.longitude}
                  </span>
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-medium mb-4 text-gray-900">
                  Update Tree Status
                </h4>
                <UpdateTreeForm
                  tree={selectedTree}
                  onUpdate={updateTreeStatus}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UpdateTreeForm = ({ tree, onUpdate }) => {
  const [status, setStatus] = useState(tree.status);
  const [healthStatus, setHealthStatus] = useState(tree.healthStatus);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(tree.id, status, healthStatus, notes);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status:
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="planted">Planted</option>
          <option value="growing">Growing</option>
          <option value="mature">Mature</option>
          <option value="dead">Dead</option>
          <option value="removed">Removed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Health Status:
        </label>
        <select
          value={healthStatus}
          onChange={(e) => setHealthStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="healthy">Healthy</option>
          <option value="diseased">Diseased</option>
          <option value="pest_affected">Pest Affected</option>
          <option value="drought_stressed">Drought Stressed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Inspection Notes:
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about the tree's current condition..."
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Update Status
      </button>
    </form>
  );
};

export default TamilNaduTreeMap;
