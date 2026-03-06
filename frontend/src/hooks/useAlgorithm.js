import { useEffect, useState, useRef } from "react";

function useAlgorithm() {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("auto");

  const [selectionMode, setSelectionMode] = useState(null);
  const [sourceNode, setSourceNode] = useState(null);
  const [destinationNode, setDestinationNode] = useState(null);

  const [finalPath, setFinalPath] = useState([]);
  const [finalDistance, setFinalDistance] = useState(null);
  const [finalMst, setFinalMst] = useState([]);

  const [pendingResult, setPendingResult] = useState(null);

  const [visited, setVisited] = useState(new Set());
  const [currentNode, setCurrentNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);

  const [speed, setSpeed] = useState(800);

  const intervalRef = useRef(null);

  const [visitedCount, setVisitedCount] = useState(null)
  const [executionTime, setExecutionTime] = useState(null)

  const start = (newSteps, options = {}) => {
    clearInterval(intervalRef.current);

    setSteps(newSteps);
    setCurrentStepIndex(0);
    setVisited(new Set());
    setCurrentNode(null);
    setActiveEdge(null);

    setFinalPath([]);
    setFinalDistance(null);
    setFinalMst([]);

    if (options.mst) {
      setFinalMst(options.mst);
    }

    if (options.result) {
      setPendingResult(options.result);
    }

    if (options.metrics){
      setVisitedCount(options.metrics.visitedCount)
      setExecutionTime(options.metrics.timeTaken)
    }

    if (mode === "auto") {
      setIsRunning(true);

      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, speed);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);

    setSteps([]);
    setCurrentStepIndex(0);
    setVisited(new Set());
    setCurrentNode(null);
    setActiveEdge(null);
    setVisitedCount(null)
    setExecutionTime(null)

    setIsRunning(false);

    setSelectionMode(null);
    setSourceNode(null);
    setDestinationNode(null);

    setFinalPath([]);
    setFinalDistance(null);
    setFinalMst([]);
    setPendingResult(null);
  };

  useEffect(() => {
    
    if (currentStepIndex >= steps.length && steps.length > 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setCurrentNode(null);
      setActiveEdge(null);

      if (pendingResult) {
        const { previous, destination } = pendingResult;

        const path = [];
        let current = destination;

        while (current !== null) {
          path.unshift(current);
          current = previous[current];
        }

        setFinalPath(path);
        setPendingResult(null);
      }

      return;
    }

    if (steps.length === 0) return;

    const step = steps[currentStepIndex];

    if (!step) return;

    if (step.type === "visit") {
      setVisited((prev) => {
        const updated = new Set(prev);
        updated.add(step.nodeId);
        return updated;
      });

      setCurrentNode(step.nodeId);
      setActiveEdge(null);
    }

    if (step.type === "edge" || step.type === "relax") {
      setActiveEdge({
        from: step.from,
        to: step.to,
      });
    }
  }, [currentStepIndex, steps, pendingResult]);

  return {
    start,
    stop,
    nextStep,
    reset,

    visited,
    currentNode,
    activeEdge,
    isRunning,

    mode,
    setMode,
    speed,
    setSpeed,

    selectionMode,
    setSelectionMode,
    sourceNode,
    setSourceNode,
    destinationNode,
    setDestinationNode,

    finalPath,
    finalDistance,
    setFinalDistance,

    finalMst,

    visitedCount,
    executionTime
  };
}

export default useAlgorithm;