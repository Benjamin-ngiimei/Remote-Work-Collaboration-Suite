import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from '/Users/benjamin/Downloads/Remote-Work-Collaboration-Suite/node_modules/pdfjs-dist/build/pdf';
// Set PDF.js worker source to fix import error
// Use CDN for PDF.js worker in Vite/React
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.js';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import jsPDF from 'jspdf';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import './DocumentEditor.css';


export default function DocumentEditor() {
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const editorRef = useRef(null);
  const ydocRef = useRef(null);
  const ytextRef = useRef(null);
  const providerRef = useRef(null);
  const undoManagerRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const ydoc = new Y.Doc();
      ydocRef.current = ydoc;
      // Connect to a public y-websocket server
      const provider = new WebsocketProvider('wss://demos.yjs.dev/ws', 'my-document-room', ydoc);
      providerRef.current = provider;
      const ytext = ydoc.getText('codemirror');
      ytextRef.current = ytext;
      // Create UndoManager once
      undoManagerRef.current = new Y.UndoManager(ytext);

      // Simple binding for a textarea
      ytext.observe(() => {
        if (editorRef.current) {
          editorRef.current.value = ytext.toString();
        }
      });

      editorRef.current.oninput = () => {
        ydoc.transact(() => {
          ytext.delete(0, ytext.length);
          ytext.insert(0, editorRef.current.value);
        });
      };

      // Set initial value
      editorRef.current.value = ytext.toString();

      return () => {
        provider.disconnect();
        ydoc.destroy();
        undoManagerRef.current = null;
      };
    }
  }, []);

  // Toolbar button handlers
  const handleSave = () => {
    // Example: Save to localStorage
    if (editorRef.current) {
      localStorage.setItem('document-content', editorRef.current.value);
      alert('Document saved locally!');
    }
  };

  const handleUndo = () => {
    if (undoManagerRef.current) {
      undoManagerRef.current.undo();
    }
  };

  const handleRedo = () => {
    if (undoManagerRef.current) {
      undoManagerRef.current.redo();
    }
  };

  const handleShare = () => {
    // Example: Copy share link
    navigator.clipboard.writeText(window.location.href);
    alert('Share link copied to clipboard!');
  };

  const handleExport = async () => {
    if (!editorRef.current) return;
    const content = editorRef.current.value;
    // Ask user for format
    const format = prompt(
      'Export as (enter: txt, md, json, html, csv, docx, pdf):',
      'txt'
    );
    let blob, filename;
    switch (format) {
      case 'md':
        blob = new Blob([content], { type: 'text/markdown' });
        filename = 'document.md';
        break;
      case 'json':
        try {
          const json = JSON.stringify(JSON.parse(content), null, 2);
          blob = new Blob([json], { type: 'application/json' });
          filename = 'document.json';
        } catch {
          alert('Content is not valid JSON.');
          return;
        }
        break;
      case 'html':
        blob = new Blob([
          `<!DOCTYPE html><html><body><pre>${content.replace(/</g, '&lt;')}</pre></body></html>`
        ], { type: 'text/html' });
        filename = 'document.html';
        break;
      case 'csv':
        blob = new Blob([content], { type: 'text/csv' });
        filename = 'document.csv';
        break;
      case 'docx': {
        // Use docx.js to generate a real docx file
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: content.split('\n').map(
                (line) => new Paragraph({ children: [new TextRun(line)] })
              ),
            },
          ],
        });
        const buffer = await Packer.toBlob(doc);
        blob = buffer;
        filename = 'document.docx';
        break;
      }
      case 'pdf': {
        // Use jsPDF to generate a real PDF file
        const doc = new jsPDF();
        const lines = doc.splitTextToSize(content, 180);
        doc.text(lines, 10, 10);
        blob = doc.output('blob');
        filename = 'document.pdf';
        break;
      }
      case 'txt':
      default:
        blob = new Blob([content], { type: 'text/plain' });
        filename = 'document.txt';
    }
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.md,.json,.html,.csv,.docx,.pdf';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext === 'docx') {
        alert('Importing DOCX is not supported in-browser. Please copy and paste the content.');
        return;
      }
      if (ext === 'pdf') {
        // Use pdfjs-dist to extract text from PDF
        const reader = new FileReader();
        reader.onload = async (evt) => {
          const typedarray = new Uint8Array(evt.target.result);
          try {
            const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
            let textContent = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const txt = await page.getTextContent();
              textContent += txt.items.map(item => item.str).join(' ') + '\n';
            }
            if (editorRef.current) {
              editorRef.current.value = textContent;
              if (ytextRef.current) {
                ytextRef.current.delete(0, ytextRef.current.length);
                ytextRef.current.insert(0, textContent);
              }
            }
          } catch (err) {
            alert('Failed to parse PDF: ' + err.message);
          }
        };
        reader.readAsArrayBuffer(file);
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (editorRef.current) {
          let value = evt.target.result;
          if (ext === 'json') {
            try {
              value = JSON.stringify(JSON.parse(value), null, 2);
            } catch {
              alert('Invalid JSON file.');
              return;
            }
          }
          editorRef.current.value = value;
          if (ytextRef.current) {
            ytextRef.current.delete(0, ytextRef.current.length);
            ytextRef.current.insert(0, value);
          }
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(Number(e.target.value));
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleCollaborate = () => {
    alert('Collaboration is always enabled in this editor!');
  };

  return (
    <div className={`document-editor-container${theme === 'dark' ? ' document-editor-dark' : ''}`}>  
      <h1>Real-Time Document Editor</h1>
      <div className="document-editor-toolbar">
        <button className="document-editor-button" onClick={handleSave}>Save</button>
        <button className="document-editor-button" onClick={handleUndo}>Undo</button>
        <button className="document-editor-button" onClick={handleRedo}>Redo</button>
        <button className="document-editor-button" onClick={handleShare}>Share</button>
        <button className="document-editor-button" onClick={handleExport}>Export</button>
        <button className="document-editor-button" onClick={handleImport}>Import</button>
        <button className="document-editor-button" onClick={handleSettings}>Settings</button>
        <button className="document-editor-button" onClick={handleCollaborate}>Collaborate</button>
      </div>
      <div className="document-editor-status">
        <span className="document-editor-status-text">All changes saved</span>
      </div>
      <textarea
        ref={editorRef}
        className="document-editor-textarea"
        placeholder="Start typing..."
        style={{ fontSize: fontSize }}
      ></textarea>

      {showSettings && (
        <div className="document-editor-settings-modal">
          <div className="document-editor-settings-content">
            <h2>Settings</h2>
            <label>
              Font Size:
              <input type="number" min="10" max="48" value={fontSize} onChange={handleFontSizeChange} /> px
            </label>
            <br />
            <label>
              Theme:
              <select value={theme} onChange={handleThemeChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
            <br />
            <button onClick={handleCloseSettings}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}