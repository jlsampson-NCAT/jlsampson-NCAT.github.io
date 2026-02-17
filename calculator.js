document.addEventListener("DOMContentLoaded", function(){
    var tableHeader = "<table><tr><th>Operand 1</th><th>Operator</th><th>Operand 2</th><th>Result</th></tr>";
    document.getElementById("table-container").innerHTML = tableHeader + "</table>";
    promptUser(tableHeader, [], 0);
}); 

function promptUser(tableHTML, savedResults, savedResultsTotal){
    var x = prompt("Operand 1:");
    var y = prompt("Operand 2:");   
    var operator = prompt("Operator:");
    if (x == null || y == null || operator == null){//user hit cancel
        summarize(savedResults, savedResultsTotal);
        return;
    }
    let result;
    if (isNaN(x) || isNaN(y)){
        if (isNaN(x)) x = "Error: Operand was not a number";
        if (isNaN(y)) y = "Error: Operand was not a number";
        result = "Result cannot be calculated";
    }
    else {
        x = parseFloat(x);
        y = parseFloat(y);
        if (operator == "+") result = x + y;
        else if (operator == "-") result = x - y;
        else if (operator == "*") result = x * y;
        else if (operator == "/") result = x / y;
        else if (operator == "%") result = x % y;
        else result = "Improper operator";
        if (!isNaN(result)){
            savedResults.push(result);
            savedResultsTotal += result;
        }
    }
    tableHTML += "<tr><td>" + x + "</td><td>" + operator + "</td><td>" + y + "</td><td>" + result + "</td></tr>";
    document.getElementById("table-container").innerHTML = tableHTML + "</table>";
    setTimeout(function(){
        promptUser(tableHTML, savedResults, savedResultsTotal);
    }, 50)
}

function summarize(savedResults, savedResultsTotal){
    if (savedResults.length > 0){
        var max = Math.max(...savedResults);
        var min = Math.min(...savedResults);
        var average = savedResultsTotal / savedResults.length;
        var finalTableHTML = "<table><tr><th>Max</th><th>Min</th><th>Average</th><th>Total</th></tr>";
        finalTableHTML += "<tr><td>" + max + "</td><td>" + min + "</td><td>" + average + "</td><td>" + savedResultsTotal + "</td></tr>";
        finalTableHTML += "</table>";
        document.getElementById("summary-container").innerHTML = finalTableHTML;
    }
}