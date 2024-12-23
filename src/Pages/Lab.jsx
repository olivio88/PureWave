import './lab.css';
import React, { useRef, useState } from 'react';
import icon_upload from '../assets/upload.png';

function Lab() {
    const fileInputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const [notificationSuccess, setNotificationSuccess] = useState(null);
    const [notificationFailed, setNotificationFailed] = useState(null);

    // Trigger input file saat tombol atau gambar ditekan
    const handleLogoClick = () => {
        fileInputRef.current.click();
    };

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        validateFile(file);
    };

    // Drag over event handler
    const handleDragOver = (e) => {
        e.preventDefault(); // Mencegah perilaku default browser
    };

    // Drop event handler
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        validateFile(file);
    };

    // Validasi file
    const validateFile = (file) => {
        if (file && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
            setUploadedFile(file);
            setNotificationSuccess("Uploaded successfully!");
            setTimeout(() => setNotificationSuccess(null), 2500); // Sembunyikan notifikasi setelah 2.5 detik
            console.log("File uploaded:", file.name);
        } else {
            setUploadedFile(null);
            setNotificationFailed("Invalid file format. Only .mp3 and .wav are supported.");
            setTimeout(() => setNotificationFailed(null), 2500);
        }
    };

    return (
        <div className="lab-page container-fluid flex-col">
            <h1 className="title firacode">LABORATORY</h1>

            {/* Area Upload */}
            <div 
                className="posts container-fluid" 
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
            >
                {/* Input File Tersembunyi */}
                <input
                    type="file"
                    accept=".mp3, .wav"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                {/* Gambar sebagai tombol upload */}
                <div className="upload-logo icon" onClick={handleLogoClick}>
                    <img src={icon_upload} alt="Upload Icon" />
                </div>

                <span className="upload-text tulisan">Choose a file or drag it here</span>
                <span className="upload-format tulisan">Supported formats: .mp3, .wav</span>

                {/* Tombol Upload */}
                <button className="upload-button" onClick={handleLogoClick}>
                    Upload Audio
                </button>

                {/* Pesan File yang Diunggah */}
                {uploadedFile && (
                    <p className="uploaded-file-name">Uploaded: {uploadedFile.name}</p>
                )}

                {notificationSuccess && (
                    <div className="notificationSuccess">
                        {notificationSuccess}
                    </div>
                )}

                {notificationFailed && (
                    <div className="notificationFailed">
                        {notificationFailed}
                    </div>
                )}
            </div>

            <p className='copyright center-content cambria'>copyrights©2024 Reserved by PureWave</p>
        </div>
    );
}

export default Lab;
