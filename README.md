## Easily download youtube videos on your server

This setup is composed of two parts:

 - A script running in your browser, with something like Greasemonkey or Tampermonkey

 - A systemd service running on your server, which servers an endpoint via a Flask application


The Tampermonkey script adds a "download" button on youtube videos thumbnails. Clicking on the button sends a GET request to your server.

The GET request triggers a Python script, which dowloads the video via the yt_dlp Python module.

That's it.
