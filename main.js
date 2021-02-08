$(document).ready (function (){
    var day = moment(); 
    var presentHour = day.hour();
    var hourClass = "past"; 
    function edit (event) {
        console.log(event);
        $(event.currentTarget).attr('contenteditable','true');
    }
    function save() 
    { 
    val = document.myform.text_area.value; 
    mydoc = document.open(); 
    mydoc.write(val); 
    mydoc.execCommand("saveAs",true,"index.html");
    history.go(-1);
    }
    $("#currentDay").text( day.format('MMMM Do YYYY') );
    for (var hour=8; hour <= 24; hour++){
        var time = moment(day).hour(hour);
        var storageID = time.format("YYYYMMDD/HH");
        if (hour === presentHour) {
            hourClass = "present";
        }
        if (hour > presentHour) {
            hourClass = "future";
        }
        console.log(storageID)
        // time=
        var row=$("<div>").addClass("row").data("storageID", storageID);
        var description = localStorage.getItem(storageID.slice(-2));
        row.append($("<div>").addClass("col").addClass("hour").text( time.format ("ha") ));
        row.append($("<textarea>").addClass("col-10").addClass(hourClass).text(description));
        row.append($("<button>").addClass("col").addClass("saveBtn").text ( "Save" ));
        $("#timeBlocks").append( row );
    }
    $(".saveBtn").on("click", function(){
     var time=$(this).parent().data()
     var hour= time.storageID.slice(-2)
     var description=$(this).siblings(".col-10").val()
     localStorage.setItem(hour, description);
    })
});