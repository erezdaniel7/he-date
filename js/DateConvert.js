function initializSelectMonth() {
    var o = document.getElementById("SelectMonth");
    var val = o.value;
    o.options[12] = null;
    if (!(val > 0)) val = 1;
    var i = 0;
    o.options[i++] = new Option("תשרי", 1);
    o.options[i++] = new Option("חשון", 2);
    o.options[i++] = new Option("כסלו", 3);
    o.options[i++] = new Option("טבת", 4);
    o.options[i++] = new Option("שבט", 5);
    if (HeDate.IsLeapYear(HeDate.regimatria($("#SelectYear").val()))) {
        //שנה מעוברת
        o.options[i++] = new Option("אדר א'", 6);
        o.options[i++] = new Option("אדר ב'", 7);
    }
    else {
        o.options[i++] = new Option("אדר", 7);
        if (val == 6) val = 7;
    }
    o.options[i++] = new Option("ניסן", 8);
    o.options[i++] = new Option("אייר", 9);
    o.options[i++] = new Option("סיון", 10);
    o.options[i++] = new Option("תמוז", 11);
    o.options[i++] = new Option("אב", 12);
    o.options[i++] = new Option("אלול", 13);

    o.value = val;
}
function initializSelectDate() {
	var o = $("#SelectDate");
    var val = o.val();
    if (!(val > 0)) val = 1;
	var year=$("#SelectOYear").val();
	var month=$("#SelectOMonth").val();
	var numOfDay=(new HeDate(parseInt(HeDate.regimatria($("#SelectYear").val())),parseInt($("#SelectMonth").val()),1)).getMonthLength();
	if (o.find("option").size()==numOfDay)
		return;
	o.find("option").remove();
	for (var i=1;i<=numOfDay;i++)
		document.getElementById(o.attr('id')).options[i-1]= new Option(HeDate.gimatria(i), i);
		//o.append("<option value='"+i+"'>"+HeDate.gimatria(i)+"</option>"); //don't work on ie-6
	if (numOfDay<val) val=numOfDay;
    o.val(val);
}
function yearChange() {
    var str = $("#SelectYear").val();
    var num = parseInt(str);

    if (isNaN(num)) num = HeDate.regimatria(str);
    if (num == 0) num = today.getYear();
    str = HeDate.gimatria(num);
    $("#SelectYear").val(str);
	initializSelectMonth();
	initializSelectDate();
	convertToOver();
}
function monthChange() {
	initializSelectDate();
	convertToOver();
}
function dateChange() {
	convertToOver();
}

function initializSelectOMonth() {
    var o = document.getElementById("SelectOMonth");
    var val = o.value;
    if (!(val > 0)) val = 1;
    var i = 0;
    o.options[i++] = new Option("ינואר", 1);
    o.options[i++] = new Option("פברואר", 2);
    o.options[i++] = new Option("מרץ", 3);
    o.options[i++] = new Option("אפריל", 4);
    o.options[i++] = new Option("מאי", 5);
    o.options[i++] = new Option("יוני", 6);
    o.options[i++] = new Option("יולי", 7);
    o.options[i++] = new Option("אוגוסט", 8);
    o.options[i++] = new Option("ספטמבר", 9);
    o.options[i++] = new Option("אוקטובר", 10);
    o.options[i++] = new Option("נובמבר", 11);
    o.options[i++] = new Option("דצמבר", 12);
    o.value = val;
}
function initializSelectODate() {
    var o = $("#SelectODate");
    var val = o.val();
    if (!(val > 0)) val = 1;
	var year=$("#SelectOYear").val();
	var month=$("#SelectOMonth").val();
	var numOfDay=31;
	if(month==2)
		numOfDay=29;
	if(month==4 | month==6 | month==9 | month==11)
		numOfDay=30;
	else if(month==2)
		if (year%4==0 && (year%100!=0 | year%400==0)) numOfDay=29;
		else numOfDay=28;
	if (o.find("option").size()==numOfDay)
		return;
	o.find("option").remove();
	for (var i=1;i<=numOfDay;i++)
		document.getElementById(o.attr('id')).options[i-1]= new Option(i, i);
		//o.append('<option value="'+i+'">'+i+'</option>'); //don't work on ie-6
	if (numOfDay<val) val=numOfDay;
    o.val(val);
}
function oyearChange() {
    var str = $("#SelectOYear").val();
    var num = parseInt(str);

    if (isNaN(num)) $("#SelectOYear").val(new Date().getFullYear());
	initializSelectODate();
	convertToHe();
}
function omonthChange() {
	initializSelectODate();
	convertToHe();
}
function odateChange() {
	convertToHe();
}

var days = ['יום ראשון','יום שני','יום שלישי','יום רביעי','יום חמישי','יום שישי','שבת'];
function convertToOver(){
	oDate=(new HeDate(parseInt(HeDate.regimatria($("#SelectYear").val())),parseInt($("#SelectMonth").val()),parseInt($("#SelectDate").val()))).ConvertToGregorian();
	$("#SelectOYear").val(oDate.getFullYear());
	$("#SelectOMonth").val(oDate.getMonth()+1);
    initializSelectODate();
    $("#SelectODate").val(oDate.getDate());
	$(".showDay").html(days[oDate.getDay()]);
}
function convertToHe(){
	mydate=new HeDate(new Date($("#SelectOYear").val(),$("#SelectOMonth").val()-1,$("#SelectODate").val()));
    $("#SelectYear").val(HeDate.gimatria(mydate.getYear()));
    initializSelectMonth();
    $("#SelectMonth").val(mydate.getMonth());
    initializSelectDate();
    $("#SelectDate").val(mydate.getDate());
	$(".showDay").html(days[oDate.getDay()]);
}

var today = new HeDate(new Date());

$(document).ready(function () {
    $("#SelectYear").val(HeDate.gimatria(today.getYear()));
    initializSelectMonth();
    $("#SelectMonth").val(today.getMonth());
    initializSelectDate();
    $("#SelectDate").val(today.getDate());
	initializSelectOMonth();
	convertToOver();
});