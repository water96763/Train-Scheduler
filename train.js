  // Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBrlE1E5ECBegR6kmNlfHGoYch4i4H3tjo",
    authDomain: "train-schedule-ab7d3.firebaseapp.com",
    databaseURL: "https://train-schedule-ab7d3.firebaseio.com",
    projectId: "train-schedule-ab7d3",
    storageBucket: "",
    messagingSenderId: "779379134572",
    appId: "1:779379134572:web:70f6a9899796b018"
};
        //Initialize Firebase
  firebase.initializeApp(firebaseConfig);
        //set variable for database
  let database = firebase.database();
        //On click to capture train data
$("#addTrainButton").on("click", function(event) {
        //default prevention
      event.preventDefault();
        //take input from form and trim
      let trainName = $("#name").val().trim();
      let destination = $("#destination").val().trim();
      // let firstTrain = moment($("#firstTime").val().trim(), "HH:mm").format("X"); 
      let firstTrain = $("#firstTime").val().trim();
      let frequency = $("#frequency").val().trim();
        //new "object" to be pushed into database
      let newTrain = {
          name: trainName,
          destin: destination,
          first: firstTrain,
          freq: frequency,
      };
        //push new train data to database
      database.ref().push(newTrain);
        //clear out fields from form
      $("#name").val("");
      $("#destination").val("");
      $("#firstTime").val(""); 
      $("#frequency").val("");
});
        //database 'child' management  
database.ref().on("child_added", function(childSnapshot) {
                          //make sure child exists- no child left behind
                          console.log(childSnapshot.val());
        //set child variables for each child
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().destin;
      var firstTrain = childSnapshot.val().first;
      var frequency = childSnapshot.val().freq;
                           //dbl check child info exists
                          console.log(trainName);
                          console.log(destination);
                          console.log(firstTrain);
                          console.log(frequency);
        //convert first train info into moment.js info for manipulation (subtraction)
      let convertedFirstTrain = moment(firstTrain, "hh:mm").subtract(1, "years");
                          console.log(convertedFirstTrain);
        //moment.js info, setting moment
      let currentTime = moment().format();
                           console.log("Time now = " + moment(currentTime).format("HH:mm"));
        //get the time difference between the two times
      let timeDiff = moment().diff(moment(convertedFirstTrain), "minutes");
                        console.log("Diff in time =" + timeDiff);
        //divide amount of time passed by frequency of train, obtain remainder
      let remainder = timeDiff % frequency;
                        console.log(remainder);
        //get remainder to get min remaining till next train, minus from frequency to get time till next train
      let minToNext = frequency - remainder;
        //format next train to hhmmA to display correctly
      let nextTrain = moment().add(minToNext, "minutes").format ("hh:mm A")
        //append table with all fields of child
      $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minToNext + "</td></tr>");
  });
   

