var student = /** @class */ (function () {
    function student(name, score, email) {
        this.name = name;
        this.score = score;
        this.email = email;
    }
    return student;
}());
var student1 = new student("ram", 95, "ram@gmail.com");
var student2 = new student("shivam Jaiswal", 99, "xwq@gmail.com");
var student3 = new student("Krishn Yadav", 90, "knhaiya@gmail.com");
var student4 = new student("modi", 99, "namo@bjp.com");
var totalCheckBox = 0;
var countCheckedBox = 0;
var list = [];
list.push(student1);
list.push(student2);
list.push(student3);
list.push(student4);
$(document).ready(function () {
    for (var i = 0; i < list.length; i++) {
        totalCheckBox++;
        var newRow = "<tr>";
        newRow += " <td><input type='checkbox' /></td>";
        newRow += "<td>" + list[i].name + "</td>";
        newRow += "<td>" + list[i].score + "</td>";
        newRow += "<td>" + list[i].email + "</td>";
        newRow += "</tr>";
        $("#myTableBody").append(newRow);
    }
    $("#myTableBody input[type='checkbox']").on('change', function () {
        if ($(this).prop('checked')) {
            countCheckedBox++;
        }
        else {
            countCheckedBox--;
            $('#checkAllBoxes').prop('checked', false);
        }
        $('#checkAllBoxes').prop('checked', (countCheckedBox == totalCheckBox));
    });
});
function search(callerId, tableId) {
    var inputValue = $('#' + callerId).val();
    if (inputValue) {
        var searchExp_1 = new RegExp(inputValue, "ig");
        $('#' + tableId + " tr td:not(:nth-child(4n-3))").each(function () {
            var content = $(this).text();
            var matches = content.match(searchExp_1);
            $(this).html(content.replace(searchExp_1, function (match) {
                return "<span class='highlight'>" + match + "</span>";
            }));
            //   console.log($(this).children()[0].className);
        });
    }
    else {
        $(".highlight").removeClass("highlight");
    }
    /*  $("#" + tableId + " tr").map(function () {
         if ($(this).text().toLowerCase().indexOf(inputValue) > -1) {
             $(this).css('background-color', 'cyan');
         }
         else {
             $(this).css('background-color', 'transparent');
         }
     }); for row highlight */
}
function checkAllBoxes(callerId, tableId) {
    $('#' + tableId + " tr").map(function () {
        $(this).children()[0].firstChild.checked = ($('#' + callerId).is(':checked'));
        ($('#' + callerId).is(':checked')) ? countCheckedBox = totalCheckBox : countCheckedBox = 0;
    });
}
function calculate(tableId, avgId, maxId) {
    var sum = 0;
    var max = 0;
    var count = 0;
    $('#' + tableId + " tr").map(function () {
        if ($(this).children()[0].firstChild.checked) {
            var curr = Number($(this).children()[2].textContent);
            sum = sum + curr;
            count++;
            if (max < curr) {
                max = curr;
            }
        }
    });



    var avg = (count) ? sum / count : sum;
    $('#' + avgId).text(avg);
    $('#' + maxId).text(max);
}
