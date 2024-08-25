// ==UserScript==
// @name         YouTube Video Downloader Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a download button in the actions section of YouTube videos to download videos via a local server.
// @author       Your Name
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the download button
    function createDownloadButton(videoUrl) {
        const button = document.createElement('button');
        button.textContent = 'Download';
        button.style.marginLeft = '10px';
        button.style.padding = '5px 10px';
        button.style.backgroundColor = '#ff0000';
        button.style.color = '#ffffff';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.classList.add('download-button');

        button.addEventListener('click', () => {
            window.open(`http://192.168.0.91:5000/download?url=${encodeURIComponent(videoUrl)}`, '_blank');
        });

        return button;
    }

    // Function to add download buttons to the actions section of videos
    function addDownloadButtons() {
        // Get all video containers
        const videoItems = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer');

        videoItems.forEach(item => {
            const videoLink = item.querySelector('a#thumbnail');
            const videoUrl = videoLink ? videoLink.href : null;
            const actionButtons = item.querySelector('#buttons');

            if (videoUrl && actionButtons && !actionButtons.querySelector('.download-button')) {
                const downloadButton = createDownloadButton(videoUrl);
                actionButtons.appendChild(downloadButton);
            }
        });
    }

    // Run the script on page load and on AJAX navigation events
    document.addEventListener('yt-navigate-finish', addDownloadButtons);
    window.addEventListener('load', addDownloadButtons);

    // Also observe DOM changes to handle dynamic content loading
    const observer = new MutationObserver(addDownloadButtons);
    observer.observe(document.body, { childList: true, subtree: true });
})();
