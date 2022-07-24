leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;
song1="";
song2="";
leftWristScore=0;
rightWristScore=0;
song1Status="";
song2Status="";

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
function modelLoaded(){
    console.log("Pose net has initialized");
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results)

        leftWristScore= results[0].pose.keypoints[9].score;
        console.log("left wrist score = "+leftWristScore)
    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+leftWristX+"left wrist y"+leftWristY);

        rightWristScore= results[0].pose.keypoints[10].score;
        console.log("right wrist score = "+rightWristScore)
    
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = "+rightWristX+"right wrist y"+rightWristY);
    }
    }

function draw(){
    image(video,0,0,500,400);

    fill("red");
    stroke("red");
    song1Status =song1.isPlaying();
    song2Status =song2.isPlaying();

    if(leftWristScore >0.1){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1Status == false){
            song1.play();
            document.getElementById("song_name").innerHTML="Playing = Wolves"
        }
        
    }

    if(rightWristScore >0.1){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song2Status == false){
            song2.play();
            document.getElementById("song_name").innerHTML="Playing = Stars"
        }
        
    }
}