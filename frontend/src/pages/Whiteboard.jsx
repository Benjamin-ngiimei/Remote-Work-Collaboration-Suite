
import React, { useRef, useEffect } from "react";
import "./Whiteboard.css";
import { Excalidraw } from "@excalidraw/excalidraw";




export default function Whiteboard() {
  // Responsive fullscreen Excalidraw with custom options
  const excalidrawRef = useRef(null);

  // Example: initial elements and theme
  const initialData = {
    elements: [
      {
        type: "rectangle",
        version: 141,
        versionNonce: 361174001,
        isDeleted: false,
        id: "rect1",
        fillStyle: "hachure",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        angle: 0,
        x: 100,
        y: 100,
        width: 200,
        height: 100,
        seed: 1,
        groupIds: [],
        strokeColor: "#3730a3",
        backgroundColor: "#a5b4fc",
        boundElements: [],
        updated: 1,
      },
    ],
    appState: {
      theme: "light",
      viewBackgroundColor: "#f8fafc",
      currentItemStrokeColor: "#3730a3",
      currentItemBackgroundColor: "#a5b4fc",
      showZoomButtons: true,
      showThemeBtn: true,
      gridSize: 20,
      // Hide Excalidraw footer
      showFooter: false,
      // Hide Excalidraw main toolbar (set to false to hide, true to show)
      toolbarVisible: true,
    },
  };

  // Make Excalidraw canvas always fit its parent
  useEffect(() => {
    function handleResize() {
      if (excalidrawRef.current) {
        excalidrawRef.current.refresh();
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="whiteboard-container">
      <h2 className="whiteboard-title">Team Whiteboard</h2>
      <div className="whiteboard-board" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Toolbar placeholder */}
        <div className="whiteboard-toolbar">
          <button className="whiteboard-tool-button">Pen</button>
          <button className="whiteboard-tool-button">Eraser</button>
          <button className="whiteboard-tool-button">Shapes</button>
          <button className="whiteboard-tool-button">Undo</button>
        </div>
        <div
          className="whiteboard-canvas"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            border: "2px solid #a5b4fc",
            borderRadius: "0.75rem",
            width: "100%",
            minHeight: "350px",
            maxWidth: "800px",
            aspectRatio: "16/9",
            margin: "0 auto",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div style={{ width: "100%", height: "60vh", minHeight: 350 }}>
            {/* <Excalidraw
              ref={excalidrawRef}
              initialData={initialData}
              viewModeEnabled={false}
              zenModeEnabled={false}
              gridModeEnabled={true}
              theme="light"
              UIOptions={{
                canvasActions: {
                  loadScene: true,
                  
                  export: true,
                  changeViewBackgroundColor: true,
                  clearCanvas: true,
                  toggleTheme: true,
                  saveAsImage: true
                }
              }}
            /> */}
          </div>
        </div>
      </div>
      <div className="whiteboard-footer">Collaborate in real time with your team!</div>
    </div>
  );
}
