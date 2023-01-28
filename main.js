Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture" src="'+data_uri+'"/>';
    });

}

console.log('m15 version:' , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WPWaMIscK/model.json',modelLoaded);

function modelLoaded()
{
console.log('Model Loaded!😊😊😊');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
     console.error(error);
    } else {
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       document.getElementById("result_emotion_name2").innerHTML = results[1].label;
   prediction_1 = results[0].label;
   prediction_2 = results[1].label;
   speak();
   if(results[0].label == "Happy")
    {
        document.getElementById("update_emoji").innerHTML = "&#128522";
    }
    if(results[0].label == "Sad")
    {
        document.getElementById("update_emoji").innerHTML = "&#128532";
    }
    if(results[0].label == "Angry")
    {
        document.getElementById("update_emoji").innerHTML = "&#128548";
    }

    if(results[1].label == "Happy")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128522";
    }
    if(results[1].label == "Sad")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128532";
    }
    if(results[1].label == "Angry")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128548";
    }
}
}

function speak()
{
    var synth = window.speechSynthesis;
    speak1= "The first prediction is "+ prediction_1;
    speak2= "And the second prediction is "+prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);
}