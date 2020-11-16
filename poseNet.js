let camera;
let poseNet;
let poses = [];

function setup(){
    createCanvas(640, 480);
    camera = createCapture(VIDEO);
    camera.size(width, height);

    poseNet.on('pose', function(results){
        poses = results;
    });
}

function draw(){
    Image(video, 0, 0, width, height);
    drawKeypoints();
    drawSkeleton();
}

function drawKeypoints(){
    for (let i = 0; i < poses.length; i++){
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++){
            let keypoint = pose.keypoints[j];
            if (keypoint.score > 0.3){
                fill (255, 255, 0);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}

function drawSkeleton(){
    for (let i = 0; i < poses.length; i++){
        let skeleton = poses[i].skeleton;
        for (let j = 0; j < skeleton.length; j++){
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255, 255, 0);
            line(partA.position.s, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}