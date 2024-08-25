from flask import Flask, request
import yt_dlp

app = Flask(__name__)

@app.route('/download', methods=['GET'])
def download_youtube_video():
    video_url = request.args.get('url')
    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',
        'outtmpl': '/media/downloads/videos/%(title)s.%(ext)s',
        'noplaylist': 'true',
        'writesubtitles': 'true',
        'subtitleslangs': 'en',
        'merge_output_format': 'mkv',
        'writethumbnail': 'true',
        'postprocessors': [{
            # Embed metadata in video using ffmpeg.
            'key': 'FFmpegMetadata',
            'add_metadata': True,
            },
            {
            # Embed thumbnail in file
            'key': 'EmbedThumbnail',
            'already_have_thumbnail': False,
            }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])
    return "Script triggered successfully!"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
