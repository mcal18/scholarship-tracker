import {
    FiDownload,
    FiUpload,
    FiTrash2
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useRef } from "react";

function DataSettings({
    scholarships,
    setScholarships
}) {
    const fileInput = useRef(null);

    const handleExport = () => {
        const dataStr = JSON.stringify(
            scholarships,
            null,
            2
        );

        const blob = new Blob(
            [dataStr],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "scholartrack-backup.json";

        link.click();
        toast.success("Backup downloaded!")

        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const importedScholarships = JSON.parse(e.target.result);

                if(!Array.isArray(importedScholarships)) {
                    toast.error("Invalid backup file.");
                    return;
                }
                
                const confirmed = window.confirm(
                    "Importing will replace your current scholarships. Continue?"
                );

                if (!confirmed) return;

                setScholarships(importedScholarships);

                toast.success("Scholarships imported successfully!");
                event.target.value = "";
            } catch {
                toast.error("Unable to read the file.")
            }
        };
        reader.readAsText(file);
    };

    const openFilePicker = () => {
        fileInput.current.click();
    };

    const handleClearData = () => {
        const confirmed = window.confirm(
            "Delete every scholarship?"
        );

        if (!confirmed) return;

        setScholarships([]);
    }

    return (
        <div className="dashboard-card">
            <h2>Data Management</h2>
            <p className="settings-description">
                Export your scholarship data as a backup or permanently remove all saved scholarships from this device.
            </p>
            <div className="settings-actions">
                <button className="settings-btn" onClick={handleExport}>
                    <FiDownload />
                    Export Scholarships
                </button>

                <button className="settings-btn" onClick={openFilePicker}>
                    <FiUpload />
                    Import Scholarships
                </button>

                <input type="file" accept=".json" ref={fileInput} onChange={handleImport} hidden/>

                <button className="settings-btn danger" onClick={handleClearData}>
                    <FiTrash2 />
                    Clear All Data
                </button>
            </div>
        </div>
    );
}

export default DataSettings;