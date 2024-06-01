document.addEventListener('DOMContentLoaded', function () {
    const mainVideo = document.getElementById('main_video');
    const videoSource = document.getElementById('videoSource');

    const videos = ['./VIDEO/video (1).mp4', './VIDEO/video (2).mp4', './VIDEO/video (3).mp4', './VIDEO/video (4).mp4', './VIDEO/video (5).mp4'];
    let index = 0;

    mainVideo.addEventListener('ended', function () {
        // 다음 비디오 인덱스를 계산
        index = (index + 1) % videos.length;

        // 비디오 소스 변경
        videoSource.src = videos[index];

        // 비디오 로드 및 재생
        mainVideo.load();
        mainVideo.play();
    });
});