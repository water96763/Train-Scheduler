var firebaseConfig = {
    apiKey: "AIzaSyD_VGtjv7kDNL7tHP4mXxUcQTqCUitvi-s",
    authDomain: "rps-database-c3986.firebaseapp.com",
    databaseURL: "https://rps-database-c3986.firebaseio.com",
    projectId: "rps-database-c3986",
    storageBucket: "",
    messagingSenderId: "72398744962",
    appId: "1:72398744962:web:e655a0cd5d8ad5c4"
  };
  
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();

  $("#addTrainButton").on("click", function(event) {
      event.preventDefault();

      let trainName = $("#name").val().trim();
      let destination = $("#destination").val().trim();
      let firstTrain = moment($("#firstTime").val().trim(), "HH:mm").format("X"); 
      let frequency = $("#frequency").val().trim();
  });
  
  let newTrain = {
      name = trainName,
      destination = destination,
      first = firstTrain,
      frequency = frequency,
  };

  database.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  alert ("added");

  $("#name").val().trim("");
  $("#destination").val("");
  $("#firstTime").val(""); 
  $("#frequency").val("");

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    let m = moment("HH:mm");
    console.log(m);

    let convertedFirstTrain = moment(firstTrain, "HH:mm");
    console.log(convertedFirstTrain);

    let timeDiff = moment().diff(moment(convertedFirstTrain), "minutes");
    console.log(timeDiff);

    let remainder = timeDiff % frequency;
    console log(remainder);

    let minToNext = frequency - remainder;

    let 
    
   

