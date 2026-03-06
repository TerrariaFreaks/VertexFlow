function Sidebar({ graph, algorithm, selectedAlgorithm, setSelectedAlgorithm }) {
  const {
    mode,
    setMode,
    nextStep,
    speed,
    setSpeed,
    finalDistance,
    visitedCount,
    executionTime,
  } = algorithm;

  const { isDirected, setIsDirected, isWeighted, setIsWeighted } = graph;

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-white border-r px-6 py-8 overflow-y-auto">
      
      {/* Title */}
      <h2 className="text-xl font-semibold mb-8 text-gray-800">
        Controls
      </h2>

      {/* Graph Type Section */}
      <div className="space-y-4 mb-8">
        <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={isDirected}
            onChange={(e) => setIsDirected(e.target.checked)}
            className="h-4 w-4"
          />
          Directed Graph
        </label>

        <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={isWeighted}
            onChange={(e) => setIsWeighted(e.target.checked)}
            className="h-4 w-4"
          />
          Weighted Graph
        </label>
      </div>

      {/* Algorithm Selection */}
      <div className="mb-8">
        <label className="block mb-3 text-sm font-semibold text-gray-800">
          Select Algorithm
        </label>

        <select
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedAlgorithm}
          onChange={(e) => {
            const newAlgo = e.target.value;
            setSelectedAlgorithm(newAlgo);
            algorithm.setSelectionMode(null);
            algorithm.setFinalPath([]);
            algorithm.setFinalMst([]);
            algorithm.setFinalDistance(null);
            graph.setSelectedNode(null);
          }}
        >
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
          <option value="DIJKSTRA">Dijkstra</option>
          <option value="ASTAR">A*</option>
          <option value="PRIM">Prim</option>
          <option value="KRUSKAL">Kruskal</option>
        </select>
      </div>

      {/* Animation Mode */}
      <div className="mb-8">
        <label className="block mb-3 text-sm font-semibold text-gray-800">
          Animation Mode
        </label>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="auto">Auto</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Animation Speed */}
      <div className="mb-8">
        <label className="block mb-3 text-sm font-semibold text-gray-800">
          Animation Speed
        </label>

        <input
          type="range"
          min="200"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Manual Button */}
      {mode === "manual" && (
        <div className="mb-8">
          <button
            onClick={nextStep}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
          >
            Next Step
          </button>
        </div>
      )}

      {/* Result Sections */}
      {finalDistance !== null && selectedAlgorithm === "DIJKSTRA" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
          <p className="font-semibold text-green-700">
            Shortest Distance: {finalDistance}
          </p>
        </div>
      )}

      {finalDistance !== null &&
        (selectedAlgorithm === "PRIM" || selectedAlgorithm === "KRUSKAL") && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
            <p className="font-semibold text-green-700">
              Total MST Cost: {finalDistance}
            </p>
          </div>
        )}

      {typeof executionTime === "number" && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-1">
          <p>Nodes Visited: {visitedCount}</p>
          <p>Execution Time: {executionTime.toFixed(3)} ms</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;