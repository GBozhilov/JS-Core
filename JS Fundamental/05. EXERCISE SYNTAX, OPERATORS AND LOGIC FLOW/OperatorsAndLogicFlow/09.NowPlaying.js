function printSong(arr) {
    let song = {
        trackName: arr[0],
        artist: arr[1],
        duration: arr[2]
    };

    console.log(`Now Playing: ${song.artist} - ${song.trackName} [${song.duration}]`);
}

printSong(['Number One', 'Nelly', '4:09']);