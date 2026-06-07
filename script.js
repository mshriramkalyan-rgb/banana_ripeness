let model;

async function loadModel() {
    model = await tf.loadLayersModel('model/model.json');
    console.log("Model Loaded");
}

loadModel();

document.getElementById("imageUpload")
.addEventListener("change", function(event){

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function(e){
        document.getElementById("preview").src =
            e.target.result;
    };

    reader.readAsDataURL(file);
});

async function predictFruit() {
alert("Predict");
    const image =
      document.getElementById("preview");

    let tensor = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([224,224])
        .toFloat()
        .expandDims();

    const prediction =
       await model.predict(tensor).data();

    const labels =
       ["Ripe","Unripe"];

    const index =
       prediction.indexOf(Math.max(...prediction));

    document.getElementById("result")
      .innerText =
      "Result: " + labels[index];
}