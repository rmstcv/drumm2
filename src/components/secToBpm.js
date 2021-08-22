function secToBpm (bpm) {
        let mSec = ((60*1000)/bpm)/4;
        return mSec;
    }

export default secToBpm;