
function soundPlay(type) {
    if (type == "click")
        soundEffect.src = soundClick;
    else if (type == "pre_bg")
        soundBackground.src = soundPreBg;
    else if (type == "attack_bg")
        soundBackground.src = soundAttackBg;
    soundEffect.play();
}
