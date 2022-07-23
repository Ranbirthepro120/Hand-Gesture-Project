Webcam.set ({
    width:350,
    height:300,
    image_format: "png",
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"' />";
    });
}

console.log("ml5 Version :", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7vpSeePba/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + prediction_1;
    speak_data_2 = "The Second Prediction is " +prediction_2;
    var utterThis = new SpeechSythesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[0].label;
        speak();
        if (results[0].label == "best")
        {
            document.getElementById("result_gesture_name").innerHTML = "&#128077;";
        }
        if(results[0].label == "amazing")
        {
            document.getElementById("result_gesture_name").innerHTML = "&#128076;";
        }
        if(result[0].label == "victory")
        {
            document.getElementById("result_gesture_name").innerHTML = "&#9996;";
        }
        if(result[1].label == "best")
        {
            document.getElementById("result_gesture_name2").innerHTML = "&#128077;";
        }
        if(result[1].label == "amazing")
        {
            document.getElementById("result_gesture_name2").innerHTML = "&#128076;";
        }
        if(result[1].label == "victory")
        {
            document.getElementById("result_gesture_name2").innerHTML = "&#9996;";
        }
    }
}