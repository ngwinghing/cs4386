function setHalfVolume(value) {
    soundBackground.volume = value;
}

function soundPlay(type) {
    if (type == "click") {
        soundEffect.src = soundClick;
        soundEffect.play();
    }
    else if (type == "pre_bg") {
        soundBackground.src = soundPreBg;
    }
    else if (type == "attack_bg") {
        setHalfVolume(0.2);
        soundBackground.src = soundAttackBg;
    }
    else if (type == "crashing") {
        soundEffect.src = soundCrashing;
        soundEffect.play();
    }
    else if (type == "falling_sewage") {
        soundEffect.src = soundFallingSewage;
        soundEffect.play();
    }
    else if (type == "glue_stuck") {
        soundEffect.src = soundGlue_stuck;
        soundEffect.play();
    }
}
