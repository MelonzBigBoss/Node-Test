var field = document.getElementById('field');
var robot = document.getElementById('robot');

var scale = field.width/field.naturalWidth;
document.getElementById("robot").style.left = (513 - document.getElementById('robot').width/2) * (scale) ;
document.getElementById("robot").style.top = (1477 - document.getElementById('robot').height/2) * (scale) ;

function handleJsonData(data) {
    pixelPoseX = data["pose"]["X"] * 1406/8.29564; //m to p
    pixelPoseY = data["pose"]["Y"] * 1406/8.29564; //m to p
    PoseRotation = data["pose"]["R"] + 90;

    document.getElementById("robot").style.left = (513 - document.getElementById('robot').width/2 + pixelPoseX) * (scale) ;
    document.getElementById("robot").style.top = (1477 - document.getElementById('robot').height/2 + pixelPoseY) * (scale) ;
    document.getElementById("robot").style.transform = 'rotate(' + PoseRotation + 'deg)';
}

//'translate(513px, 1477px)'