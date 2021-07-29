import kick01 from '../assets/drums/kick/E808_BD[long]-03.mp3';
import kick02 from '../assets/drums/kick/E808_BD[long]-05.mp3';

import snare01 from '../assets/drums/snare/E808_RS-01.mp3';
import snare02 from '../assets/drums/snare/E808_RS-04.mp3';

import hihat01 from '../assets/drums/hihat/E808_CH-01.mp3';
import hihat02 from '../assets/drums/hihat/E808_CH-06.mp3';

import hit01 from '../assets/drums/hit/E808_CB-13.mp3';
import hit02 from '../assets/Arp03(75BPM).wav';


function audio () {

    const audioFiles = {

        kick: 
        [
            {name: "kick01", sound: kick01}, 
            {name: "kick02", sound: kick02}
        ],

        snare: 
        [
            {name: "snare01", sound: snare01}, 
            {name: "snare02", sound: snare02}
        ],

        hihat: 
        [
            {name: "hihat01", sound: hihat01}, 
            {name: "hihat02", sound: hihat02}
        ],

        drumhit: 
        [
            {name: "hit01", sound: hit01}, 
            {name: "hit02", sound: hit02}
        ],

    };

    return audioFiles;
}

export default audio();