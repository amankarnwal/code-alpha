$(document).ready(function () {
    let music_list = [
      {
        img: "images/img1.png",
        name: "Aar Naank Par Nanak",
        artist: "Diljit Dosanjh",
        music: "music/music1.mp3",
      },
      {
        img: "images/img2.png",
        name: "Aasique Mudna Jave",
        artist: "Akhil",
        music: "music/music2.mp3",
      },
    ];
    let curr_track = new Audio();
    let track_index = 0;
    let isPlaying = false;
    let isRandom = false;
    let updateTimer;
    loadTrack(track_index);
    function loadTrack(track_index) {
      clearInterval(updateTimer);
      reset();
      curr_track.src = music_list[track_index].music;
      curr_track.load();
      $(".track-art").css(
        "background-image",
        "url(" + music_list[track_index].img + ")"
      );
      $(".track-name").text(music_list[track_index].name);
      $(".track-artist").text(music_list[track_index].artist);
      $(".now-playing").text(
        "Playing music " + (track_index + 1) + " of " + music_list.length
      );
      updateTimer = setInterval(setUpdate, 1000);
      curr_track.addEventListener("ended", nextTrack);
      random_bg_color();
    }
    function random_bg_color() {
      let hex = [
        "0","1","2","3","4","5","6","7","8","9","a","b","c","d","e",
      ];
      let a = "";
      function populate(a) {
        for (let i = 0; i < 6; i++) {
          let x = Math.round(Math.random() * 14);
          let y = hex[x];
          a += y;
        }
        return a;
      }
      let Color1 = populate("#");
      let Color2 = populate("#");
      var angle = "to right";
      let gradient =
        "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
      $("body").css("background", gradient);
    }
    function reset() {
      $(".current-time").text("00:00");
      $(".total-duration").text("00:00");
      $(".seek_slider").val(0);
    }
    function randomTrack() {
      isRandom ? pauseRandom() : playRandom();
    }
    function playRandom() {
      isRandom = true;
      $(".randomIcon").addClass("randomActive");
    }
    function pauseRandom() {
      isRandom = false;
      $(".randomIcon").removeClass("randomActive");
    }
    function repeatTrack() {
      let current_index = track_index;
      loadTrack(current_index);
      playTrack();
    }
    function playpauseTrack() {
      isPlaying ? pauseTrack() : playTrack();
    }
    function playTrack() {
      curr_track.play();
      isPlaying = true;
      $(".track-art").addClass("rotate");
      $("#wave").addClass("loader");
      $(".playpause-track").html('<i class="fa fa-pause-circle fa-5x"></i>');
    }
    function pauseTrack() {
      curr_track.pause();
      isPlaying = false;
      $(".track-art").removeClass("rotate");
      $("#wave").removeClass("loader");
      $(".playpause-track").html('<i class="fa fa-play-circle fa-5x"></i>');
    }
    function nextTrack() {
      if (track_index < music_list.length - 1 && !isRandom) {
        track_index += 1;
      } else if (track_index < music_list.length - 1 && isRandom) {
        let random_index = Math.floor(Math.random() * music_list.length);
        track_index = random_index;
      } else {
        track_index = 0;
      }
      loadTrack(track_index);
      playTrack();
    }
    function prevTrack() {
      if (track_index > 0) {
        track_index -= 1;
      } else {
        track_index = music_list.length - 1;
      }
      loadTrack(track_index);
      playTrack();
    }
    function seekTo() {
      let seekto = curr_track.duration * ($(".seek_slider").val() / 100);
      curr_track.currentTime = seekto;
    }
    function setVolume() {
      curr_track.volume = $(".volume_slider").val() / 100;
    }
    function setUpdate() {
      let seekPosition = 0;
      if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        $(".seek_slider").val(seekPosition);
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(
          curr_track.currentTime - currentMinutes * 60
        );
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(
          curr_track.duration - durationMinutes * 60
        );
        if (currentSeconds < 10) {
          currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
          durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
          currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
          durationMinutes = "0" + durationMinutes;
        }
        $(".current-time").text(currentMinutes + ":" + currentSeconds);
        $(".total-duration").text(durationMinutes + ":" + durationSeconds);
      }
    }
    // Event listeners
    $(".playpause-track").on("click", playpauseTrack);
    $(".next-track").on("click", nextTrack);
    $(".prev-track").on("click", prevTrack);
    $(".seek_slider").on("change", seekTo);
    $(".volume_slider").on("change", setVolume);
    $(".fa-random").on("click", randomTrack);
  });