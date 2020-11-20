class student {
    name: string;
    score: number;
    email: string;
    constructor(name: string, score: number, email: string) {
        this.name = name;
        this.score = score;
        this.email = email;
    }
}
let student1 = new student("ram", 95, "ram@gmail.com")
let student2 = new student("shivam Jaiswal", 99, "xwq@gmail.com");
let student3 = new student("Krishn Yadav", 90, "knhaiya@gmail.com");
let student4 = new student("modi", 99, "namo@bjp.com");
let totalCheckBox = 0;
let countCheckedBox = 0;
let list: student[] = [];
list.push(student1);
list.push(student2);
list.push(student3);
list.push(student4);
$(document).ready( ()=> {
    for (let i = 0; i < list.length; i++) {
        totalCheckBox++;
        let newRow = "<tr>";
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
            $('#checkAllBoxes').prop('checked', false)
        }

        if (countCheckedBox == totalCheckBox) {
            $('#checkAllBoxes').prop('checked', true);
        }

    });
})
function search(callerId: string, tableId: string) {
    let inputValue: string = $('#' + callerId).val() as string;
    if (inputValue) {
        let searchExp = new RegExp(inputValue, "ig");
        $('#' + tableId + " tr td:not(:nth-child(4n-3))").each(function () {
            let content: string = $(this).text();
            let matches: string[] = content.match(searchExp);
            $(this).html(content.replace(searchExp, function (match) {
                return "<span class='highlight'>" + match + "</span>"
            }));
            //   console.log($(this).children()[0].className);
        })
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
function checkAllBoxes(callerId: string, tableId: string) {
    $('#' + tableId + " tr").map(function() {
        ($(this).children()[0].firstChild as HTMLInputElement).checked = ($('#' + callerId).is(':checked'));
        ($('#' + callerId).is(':checked')) ? countCheckedBox = totalCheckBox : countCheckedBox = 0;
    })
}
function calculate(tableId: string, avgId: string, maxId: string) {
    let sum: number = 0;
    let max: number = 0;
    let count: number = 0;
    $('#' + tableId + " tr").map(function () {
        if (($(this).children()[0].firstChild as HTMLInputElement).checked) {
            let curr = Number($(this).children()[2].textContent);
            sum = sum + curr;
            count++;
            if (max < curr) {
                max = curr;
            }
        }
    })
    let avg: number = (count) ? sum / count : sum;
    $('#' + avgId).text(avg);
    $('#' + maxId).text(max);
}