ydl_opts = {
            'download_archive': 'data/archive.txt', 'paths': { 'home': '/downloads/test', 'temp': '/data' },
            'outtmpl': '%(uploader)s - %(title)s.%(ext)s',
            'merge_output_format': 'mkv',
            'noplaylist': 'true', 'writesubtitles': 'true',
            'subtitleslangs': 'en', 'merge_output_format': 'mkv',
            'writethumbnail': 'true',
            # Required to embed thumbnail
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
