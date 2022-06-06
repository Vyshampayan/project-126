leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;
song1="";
song2="";

function preload(){
    song1 = loadSound("wolves.mp3");
    song2 = loadSound("stars.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded)

    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results)
    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+leftWristX+"left wrist y"+leftWristY);
    
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = "+rightWristX+"right wrist y"+rightWristY);
    }
    }

function draw(){
    image(video,0,0,500,400);
}