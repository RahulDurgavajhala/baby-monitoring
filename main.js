var img = ""
var status = ""
objects = []
alarm = ""
function preload(){
    //img = loadVideo("car.mp4") 
    alarm = loadSound("alarm.wav")
}
function setup(){
    canvas = createCanvas(640 , 420)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(640 , 420)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd" , modalLoaded)
    document.getElementById("status").innerHTML = "status : detecting objects"
    
}
function draw(){
    image(video, 0 ,0 ,640 , 420 )
    if(status !=""){
        objectDetector.detect(video , gotResults)
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object is detected"
            fill("red")
            percent = Math.floor(objects[i].confidence*100)
            name = objects[i].label
            text(name+percent+"%" , objects[i].x , objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
            if(name == "person"){
                document.getElementById("babym").innerHTML = "Baby is found"
                alarm.stop()
            }
            else{
                alarm.play()
            }
        }
    }
}
function modalLoaded(){
    console.log("modal is loaded")
    status = true ; 

}
function gotResults(error , results){
    if (error) {
console.log(error)        
    } else {
        console.log(results)
        objects = results
    }
}