let home = document.getElementById('home')
let list = document.getElementById('list')
let lyric = document.getElementById('lyric')

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector("#art");
let track_title = document.querySelector(".title");
let track_artist = document.querySelector(".artist");
let track_album = document.querySelector(".album");
let track_genre = document.querySelector(".genre");
let track_year = document.querySelector(".year");
let myList = document.getElementById('myList')
let myLyric = document.getElementById('myLyric')

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let curr_track = document.getElementById('source');
let icon_full = document.getElementById('iconFull')
let icon_type = document.getElementById('btnType')

// Specify globally used values
let track_index = 0;
let track_play = 1;
let isPlaying = false;
let updateTimer;
let volume_default = 0.2;
let btnMenuState = false
let btnLyricState = false
let fullState = false
let typePlay = true

        // curr_track.volume = 0.2;

function btnMenu() {
    if (btnMenuState == false) {
        btnMenuState = true
        list.style.display = 'inline'
        home.style.display = 'none'
        lyric.style.display = 'none'
    } else {
        btnMenuState = false
        list.style.display = 'none'
        lyric.style.display = 'none'
        home.style.display = 'inline'
    }
}

function btnLyric() {
    readTags();
    if (btnLyricState == false) {
        btnLyricState = true
        list.style.display = 'none'
        home.style.display = 'none'
        lyric.style.display = 'inline'
    } 
}

function btnHome() {
    if (btnLyricState == true) {
        btnLyricState = false
        list.style.display = 'none'
        home.style.display = 'inline'
        lyric.style.display = 'none'
    } 
}


// =========================


function loadTrack(track_index) {
        clearInterval(updateTimer);
        resetValues();
        curr_track.src = 'https://aku-rapopo.github.io/mp3/'+track_list[track_index].path;
        curr_track.load();
        now_playing.textContent =
            (track_index + 1) + " OF " + track_list.length;
        updateTimer = setInterval(seekUpdate, 1000);
        curr_track.addEventListener("ended", nextTrack);
    }
    
    function random_bg_color() {
        // Get a random number between 64 to 256
        // (for getting lighter colors)
        let red = Math.floor(Math.random() * 256) + 64;
        let green = Math.floor(Math.random() * 256) + 64;
        let blue = Math.floor(Math.random() * 256) + 64;
        
        // Construct a color with the given values
        let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
        
        // Set the background to the new color
        document.body.style.background = bgColor;
    }
    
    function resetValues() {
        curr_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        seek_slider.value = 0;
    }

    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
    }
    
    function playTrack() {
        random_bg_color();
        now_playing.textContent = track_play + " OF " + track_list.length;
        curr_track.play();
        isPlaying = true;
        readTags();
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
        document.getElementById("art").classList.add('spinning')
    }
    
    function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
        document.getElementById("art").classList.remove('spinning')
    }
    
    function nextTrack() {
        track_play = track_index + 1
        if (typePlay == true) {
            if (parseInt(track_play) == track_list.length) {
                track_play = 1
                track_index = 0
            } else {
                track_index++
                track_play = track_index + 1
            }
        } else {
            randomPlay()
        }

        // console.log('track_index :'+track_index)
        // console.log('track_play :'+track_play)
        
        curr_track.src = 'https://aku-rapopo.github.io/mp3/'+track_list[track_index].path
        playTrack()

            
        
    }
    
    function prevTrack() {
        if (typePlay == true) {
            if (parseInt(track_index) == 0) {
                track_play = track_list.length
                track_index = track_play - 1
            } else {
                track_index--
                track_play = track_index + 1
            }
        } else {
            randomPlay()
        }

                // console.log('track_index :'+track_index)
        // console.log('track_play :'+track_play)
        
        curr_track.src = 'https://aku-rapopo.github.io/mp3/'+track_list[track_index].path
        playTrack()
    }

    function seekTo() {
        seekto = curr_track.duration * (seek_slider.value / 100);
        curr_track.currentTime = seekto;
        }
        
        function setVolume() {
        curr_track.volume = volume_slider.value / 100;

        }
        
    function seekUpdate() {
        let seekPosition = 0;
            
        // Check if the current track duration is a legible number
        if (!isNaN(curr_track.duration)) {
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;
        
            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        
            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
            // Display the updated duration
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    function randomPlay() {
        track_index = Math.floor(Math.random() * track_list.length);
        track_play = track_index + 1
    }



    function readTags() {

            track_title.textContent = track_list[track_index].title;
            track_artist.textContent = track_list[track_index].artist+ ' ~ ';
            track_album.textContent = track_list[track_index].album;
            track_genre.textContent = track_list[track_index].genre+ ' - ';
            track_year.textContent = track_list[track_index].year;
            document.title = track_list[track_index].artist+" ~ "+track_list[track_index].title;
            if (track_list[track_index].lyric !== '') {
                myLyric.textContent = track_list[track_index].lyric
            } else {
                myLyric.textContent = 'Lyric not found!'
            }

            if (track_list[track_index].image !== '') {
                // myLyric.textContent = track_list[track_index].lyric
                art.src = './assets/img/thumbs/'+track_list[track_index].image
            } 
        // let file = document.getElementById('source').src;

        // new jsmediatags.Reader(file)
        // .setTagsToRead(["title", "artist", "album", 'year', "genre", "picture", "lyrics"])
        // .read({
        //     onSuccess: function(tag) {
        //         // debugging
        //     console.log(tag);

        //     track_title.textContent = tag.tags.title;
        //     track_artist.textContent = tag.tags.artist+ ' ~ ';
        //     track_album.textContent = tag.tags.album;
        //     track_genre.textContent = tag.tags.genre+ ' - ';
        //     track_year.textContent = tag.tags.year;

            
        //     if (tag.tags.picture) {
        //         const { data, format } = tag.tags.picture;
        //         let base64String = _arrayBufferToBase64(data);
        //         let art = document.getElementById('art')
        //         art.src = `data:${data.format};base64,${base64String}`;
        //     }

        //     if (tag.tags.lyrics) {
        //         myLyric.textContent = tag.tags.lyrics.lyrics
        //     } else {
        //         myLyric.textContent = 'Lyric not found!'
        //     }

        //     },
        //     onError: function(error) {
        //     console.log(':(', error.type, error.info);
        //     }
        // });
    }

    function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    function volume(set) {
        let setVol = set/100;
        curr_track.volume = setVol;
        document.getElementById('inputVolume').value = set
    }

    function play(set) {
        var data = parseInt(set.getAttribute("data-id"))+1
        track_index = parseInt(set.getAttribute("data-id"))
        track_play = data
        curr_track.src = 'https://aku-rapopo.github.io/mp3/'+track_list[track_index].path
        playTrack()
        list.style.display ='none'
        home.style.display ='inline'
    }
        
    function full() {
        // alert('ok')
        if (fullState == false) {
            // alert('ok')
            fullState = true
            document.body.requestFullscreen()
            document.getElementById('iconFull').style.rotate = '135deg'
        } else  if (fullState == true)  {
            fullState = false
            document.exitFullscreen();
            document.getElementById('iconFull').style.rotate = '-45deg'
        }
    }

    function btnType() {
            if (typePlay == true) {
                typePlay = false
                icon_type.innerHTML = '<i class="fa-solid fa-shuffle"></i>'
                // alert('random')
            } else {
                typePlay = true
                // alert('all')
                icon_type.innerHTML = '<i  class="fa-solid fa-rotate-right"></i>'
            }
            console.log('status type play : '+typePlay)
        }

    // read once on reload
    document.getElementById('iconFull').style.rotate = '-45deg'
    icon_type.innerHTML = '<i  class="fa-solid fa-rotate-right"></i>'
    loadTrack(track_index);