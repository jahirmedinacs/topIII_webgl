function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   
   return splitStr.join(' ');
}

function strDate(dateValue) {
	var output = "";
	output += dateValue.getDate() + " de ";
	
	var locale = "es-mx",
      month = dateValue.toLocaleString(locale, { month: "long" });
    output += month + " del ";

	output += dateValue.getFullYear();
	
	return output;
}

function JSONtoTableSchedule(tableObj, url) {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       var schedule_data = JSON.parse(xhttp.responseText);
	       
	       var output = "";
	       for(var ii = 0; ii < schedule_data.length; ii++){
	       		var tempOutput = "<tr>";

	       		var tempDate = new Date(schedule_data[ii].date);
	       		var currentDate = new Date();

	       		if (tempDate > currentDate){
	       			tempOutput +=  "<td><i class=\"small grey-text text-darken-3 material-icons\">alarm</i></td>";
	       		}
	       		else{
	       			tempOutput +=  "<td><i class=\"small green-text material-icons\">alarm_on</i></td>";
	       		}

	       		var tempTopic = titleCase(schedule_data[ii].topic)
	       		var tempTeacher = titleCase(schedule_data[ii].teacher)
	       		tempOutput += "<td>" + tempTopic + "</td>";
				tempOutput += "<td>" + tempTeacher + "</td>";
				tempOutput += "<td>" + strDate(tempDate) + "</td>";

	       		tempOutput += "</tr>";

	       		
	       		output += tempOutput;
			}
			
			tableObj.innerHTML = output;
	    }
	};
	xhttp.open("GET", url, true);
	xhttp.send();
} 