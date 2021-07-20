import kick01 from '../assets/E808_BD[long]-03.mp3';
import kick02 from '../assets/E808_BD[short]-01.mp3';


function audio () {

    const audioFiles = {
        kick: {
            kick01: kick01,
            kick02: kick02,
        }
    };

    return audioFiles;
}

export default audio();