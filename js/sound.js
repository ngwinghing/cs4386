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
}
