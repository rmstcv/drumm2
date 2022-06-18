### App components:

1. __App.js__ - renders components Menu and Sequencer

    - State:

      * _bpm_ - the tempo 
      * _numberOfPads_ - number of pads 
      * _play_ - flag to indicate the press of the play button from the Menu
      * _solo_ - an array of sound names that are soloed (gets the value from the Sequencer with the addSolo and removeSolo functions and sets the state value).

   - Variables:

      * _name_ - array of names - array of soundset group names
      * _timer_ - timer for fast switching tempo value
      * _soloAll_ - array with names of sounds. Used to add or remove sound plays solo

   - Methods:

      * _play_ / _stop_ - sets flag "play" (gets value from Menu)
      * _incBpm_ / _decBpm_ - sets "bpm" (gets value from Menu component )
      * _stopSetBpm_ - stops changing the value of tempo (get value from Menu )
      * _addSolo_ / _removeSolo_ - gets name of sound plays solo from Sequencer

2. __Menu.js__ - returns buttons with switch events handlers _play_, _stop_ and _bpm_

    - Functions:

      * _checkPlay_ / _checkStop_ - checks _play_ in state through props from App and adds / removes classes

3. __Sequencer.js__ - returns: _pads_ on page from state _pads_, buttons _mute_ and _solo_, Sound component.

    - State:

      * _pads_ - array of pads
      * _activePad_, _mute_, _solo_ - flags

   - Methods:

      * _createPatterns_ - creates an array of pads
      * _selectPattern_ - handler function. Takes element of - array _pads_ and toggles it using the imported function _selector_.
      * _isSelected_ - changes pad class
      * _addActivePad_ - sets the pad is active or not (gets from Sound)
      * _soloTrack_ - (handler function) sets state _solo_ and sends it to the App with functions _removeSolo_ or _addSolo_
      * _muteTrack_ - (handler function) toggles state _mute_
      * _muteChangeClass_ / _soloChangeClass_ - changes classes of buttons _mute_ and _solo_

4. __Sound.js__ - returns selector of sounds

    - State:

      * _currentSound_ - the name of selected sound

   - Variables:

      * _i_ - counter, id of the current pad being checked for activity
      * _timer_ - checks the compliance of the current time and the planned time of transition to the next pad using bpm
      * _startTime_ - time of the start playing, start count

   - Methods:

      * _addAudioCtx_ - creates Audio Context and playing _currentSound_
      * _play_ - looping planned time checking of transition to the next pad and call   _addAudioCtx_ if pad is active (passes the parameter _i_ to the function  _addActivePad_ in Sequencer component. This is needed to update the pad class in Sound component, if pad with id = _i_ is active - function _selected_ adds to pad class "_.active_" class)
      * _soundChange_ - changes selected sound
   - Secondary functions:
      * _secToBpm_ - gets _bpm_ and convert it to msec
      * _selector_ - gets array of pads and id current pad. Marks the pad with id = _id_ as _selected_

4. __Lib.js__ - the library with imported sounds

      * names in array of soundset group names in App.js (state _name_) MUST MATCH with names in variable _soundBase_
      * function _audio_ returns names of sounds for use in selectors of sounds in Sound component (_currentSound_)

The application was created using the REACT framework.