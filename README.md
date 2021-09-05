DRUMM2 is a step-sequencer for quick create music from samples in the style of "electronics", closer to "techno".
Application created using REACT.

Components:

1. App.js

renders components Menu and Sequencer

state:

- the tempo ("bpm")
- number of pads ("numberOfPads")
- flag ("play") for indicate then the play button (from Menu component) pressed
- array of the names of sounds that are played solo (gets value from Sequencer component with function addSolo and removeSolo and sets the state value).

variables:

- array ("name") of names - array of soundset group names
- timer ("timer") for fast switching tempo value
- array with names of sounds ("soloAll"). Used to add or remove sound plays solo

methods:

- "play" and "stop" - sets flag "play" (gets value from Menu component )
- "incBpm" and "decBpm" - sets "bpm" (gets value from Menu component )
- stopSetBpm - stops changing the value of tempo (get value from Menu component )
- "addSolo" and "removeSolo" - gets name of sound plays solo from Sequencer component

2. Menu.js

returns buttons with switch events handlers "play", "stop" and "bpm"

functions:

- "checkPlay" and "checkStop" - checks state "play" through props from App component and adds or removes classes

3. Sequencer.js

returns "pads" on page from state "pads", buttons "mute" and "solo", Sound component.

state:

- array of pads ("pads")
- flags "activePad", "mute", "solo"

methods:

- "createPatterns" - creates an array of pads
- "selectPattern" - handler function. Takes element of - array "pads", toggles it using the imported function "selector".
- "isSelected" - changes pad class
- "addActivePad" - sets the pad is active or not (gets from Sound component)
- "soloTrack" - handler function. Sets state "solo" and will send it up to App component through functions"removeSolo" or "addSolo"
- "muteTrack" - handler function. Toggles state "mute"
- "muteChangeClass" and "soloChangeClass" - changes classes of buttons "mute" and "solo"

4. Sound.js

returns selector of sounds

state:

- current sound ("currentSound") - the name of selected sound

variables:

- "i" - counter, id of the current pad being checked for activity
- "timer" - timer - checks the compliance of the current time and the planned time of transition to the next pad using bpm
- "startTime" - time of the start playing, start count

methods:

- "addAudioCtx" - creates Audio Context and playing "currentSound"
- "play" - looping planned time checking of transition to the next pad and call "addAudioCtx" if pad is active (passes the parameter "i" to the function "addActivePad" in Sequencer component. This is needed to update the pad class in Sound component, if pad with id = "i" is active - function "selected" adds to pad class ".active" class)
- "soundChange" - changes selected sound

5. Secondary functions:

- "secToBpm" - gets "bpm" and convert it to msec
- "selector" - gets array of pads and id current pad. Marks the pad with id = "id" as "selected"

6. Lib.js

the library with imported sounds

- names in array of soundset group names in App.js (state "name") MUST MATCH with names in variable "soundBase"
- function "audio" returns names of sounds for use in selectors of sounds in Sound component ("currentSound")
