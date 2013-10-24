function showCalendar(date,TableId){
    var table=$("#"+TableId);
    var tableBody=table.find("tbody");
    tableBody.find("td>span").html(" ");
    tableBody.find("td").removeClass("today");
    tableBody.find("td").removeClass("sabbath");
    tableBody.find("tr").hide()//css("display","none");
    table.find("thead>tr>.jDate").html(date.getMonthString() + " " + HeDate.gimatria(date.getYear()));
    
    var dateNextMonth=new HeDate(date);
    dateNextMonth.addMonths(1);
    table.find(".next>label").attr("abbr",dateNextMonth.getMonthString());
    table.find(".next>label").html(dateNextMonth.getMonthString()+" &raquo;");
    table.find(".next>label").unbind('click');
    table.find(".next>label").click(function(){showCalendar(dateNextMonth,TableId)});
    
    var datePrevMonth=new HeDate(date);
    datePrevMonth.addMonths(-1);
    table.find(".prev>label").attr("abbr",datePrevMonth.getMonthString());
    table.find(".prev>label").html("&laquo; "+datePrevMonth.getMonthString());
    table.find(".prev>label").unbind('click');
    table.find(".prev>label").click(function(){showCalendar(datePrevMonth,TableId)});
    
	
    date.setDate(1);
    var today=new HeDate(new Date());
    var month=date.getMonth();
    var oDate=date.ConvertToGregorian();
    var oMonths=new Array("ינואר","פבואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר");
    var firstDayO=new Date(oDate);
    
    
    for (var i=0;month==date.getMonth();i++){
        var tableRow=tableBody.find("tr:eq("+i+")");
        tableRow.show();//css("display","inline-block");
        for (var j=date.getDay()-1;j<7 && month==date.getMonth();j++){
            var tableCell=tableRow.find("td:eq("+j+")");
            tableCell.find(".jDate").html(HeDate.gimatria(date.getDate()));
            tableCell.find(".oDate").html(oDate.getDate());
            showEvent(date,tableCell);
            if (date.compar(today)) tableCell.addClass("today");
            if (j==6) tableCell.addClass("sabbath");
            date.setDate(date.getDate()+1);
            oDate.setDate(oDate.getDate()+1);
        }
    }

    oDate.setDate(oDate.getDate()-1);
    if (firstDayO.getMonth()==oDate.getMonth())
        table.find("thead>tr>.oDate").html(oMonths[oDate.getMonth()] + " " + oDate.getFullYear());
    else if (firstDayO.getFullYear()==oDate.getFullYear())
        table.find("thead>tr>.oDate").html(oMonths[firstDayO.getMonth()] + " - " + oMonths[oDate.getMonth()] + " " + oDate.getFullYear());
    else
        table.find("thead>tr>.oDate").html(oMonths[firstDayO.getMonth()] + " " + firstDayO.getFullYear() + " - " + oMonths[oDate.getMonth()] + " " + oDate.getFullYear());
}

function showEvent(date,tableCell){
    switch (date.getMonth()){
        case 1://תשרי
            if (date.getDate()==1 || date.getDate()==2) {tableCell.find(".event").html("ראש השנה"); tableCell.addClass("sabbath");}
            else if (date.getDate() == 3 && date.getDay() != 7) tableCell.find(".event").html("צום גדליה");
            else if (date.getDate() == 4 && date.getDay() == 1) tableCell.find(".event").html("צום גדליה (נדחה)");
            else if (date.getDate()==9) tableCell.find(".event").html("ערב יום כיפור");
            else if (date.getDate()==10) {tableCell.find(".event").html("יום כיפור"); tableCell.addClass("sabbath");}
            else if (date.getDate()==14) tableCell.find(".event").html("ערב סוכות");
            else if (date.getDate()==15) {tableCell.find(".event").html("סוכות"); tableCell.addClass("sabbath");}
            else if (date.getDate()==16) tableCell.find(".event").html("א' חוה\"מ");
            else if (date.getDate()==17) tableCell.find(".event").html("ב' חוה\"מ");
            else if (date.getDate()==18) tableCell.find(".event").html("ג' חוה\"מ");
            else if (date.getDate()==19) tableCell.find(".event").html("ד' חוה\"מ");
            else if (date.getDate()==20) tableCell.find(".event").html("ה' חוה\"מ");
            else if (date.getDate()==21) tableCell.find(".event").html("הושענא רבה");
            else if (date.getDate()==22) {tableCell.find(".event").html("שמיני עצרת ושמחת תורה"); tableCell.addClass("sabbath");}
            break;
        case 2: //חשון
            if (date.getYear()>5757 && ((date.getDate()==12 && date.getDay()!=6) || (date.getDate()==11 && date.getDay()==5))) tableCell.find(".event").html("יום הזיכרון ליצחק רבין");
            break;
        case 3: //כסלו
            if (date.getDate()==24) tableCell.find(".event").html("ערב חנוכה");
            else if (date.getDate()==25) tableCell.find(".event").html("א' חנוכה");
            else if (date.getDate()==26) tableCell.find(".event").html("ב' חנוכה");
            else if (date.getDate()==27) tableCell.find(".event").html("ג' חנוכה");
            else if (date.getDate()==28) tableCell.find(".event").html("ד' חנוכה");
            else if (date.getDate()==29) tableCell.find(".event").html("ה' חנוכה");
            else if (date.getDate()==30) tableCell.find(".event").html("ו' חנוכה");
            break;
        case 4: //טבת
            if (date.getDate()<=3){
                var i=0
                if (HeDate.getyeartype(date.getYear())==-1) i=1;
                if (date.getDate()==(0+i)) tableCell.find(".event").html("ו' חנוכה");
                else if (date.getDate()==(1+i)) tableCell.find(".event").html("ז' חנוכה");
                else if (date.getDate()==(2+i)) tableCell.find(".event").html("זאת חנוכה");
            }
            else if (date.getDate()==10) tableCell.find(".event").html("צום עשרה בטבת");
            break;
        case 5: //שבט
            if (date.getDate()==15) tableCell.find(".event").html("ראש השנה לאילנות");
            break;
        case 6: //אדר א
            if (date.getDate()==14) tableCell.find(".event").html("פורים קטן");
            else if (date.getDate()==15) tableCell.find(".event").html("שושן פורים קטן");
            break;
        case 7: //אדר
            if ((date.getDate()==11 && date.getDay()==5) ||(date.getDate()==13 && date.getDay()!=7)) tableCell.find(".event").html("תענית אסתר");
            else if (date.getDate()==14) tableCell.find(".event").html("פורים");
            else if (date.getDate()==15) tableCell.find(".event").html("שושן פורים");
            break;
        case 8: //ניסן
            if (date.getDate()==14) tableCell.find(".event").html("ערב פסח");
            else if (date.getDate()==15) {tableCell.find(".event").html("פסח"); tableCell.addClass("sabbath");}
            else if (date.getDate()==16) tableCell.find(".event").html("א' חוה\"מ");
            else if (date.getDate()==17) tableCell.find(".event").html("ב' חוה\"מ");
            else if (date.getDate()==18) tableCell.find(".event").html("ג' חוה\"מ");
            else if (date.getDate()==19) tableCell.find(".event").html("ד' חוה\"מ");
            else if (date.getDate()==20) tableCell.find(".event").html("ה' חוה\"מ");
            else if (date.getDate()==21) {tableCell.find(".event").html("שביעי של פסח"); tableCell.addClass("sabbath");}
            if (date.getYear()>=5711){
                if (date.getDate()==26 && date.getDay()==5) tableCell.find(".event").html("יום הזיכרון לשאוה ולגבורה (מוקדם)");
                else if (date.getDate()==28 && date.getDay()==2 && date.getYear()>=5757) tableCell.find(".event").html("יום הזיכרון לשאוה ולגבורה (נדחה)");
                else if (date.getDate()==27 && date.getDay()!=6 && (date.getDay()!=1 | date.getYear()<5757)) tableCell.find(".event").html("יום הזיכרון לשאוה ולגבורה");
            }
            break;                                    
        case 9://אייר
            if (date.getYear()>=5708 && date.getDate()<=6){
                if (date.getDate()==5 &&date.getDay()==4) tableCell.find(".event").html("יום העצמאות");
                if (date.getYear()<5714)
                    {if (date.getDate()==6 &&date.getDay()==1) tableCell.find(".event").html("יום העצמאות (נדחה)");}
                else
                    {if (date.getDate()==3 &&date.getDay()==5) tableCell.find(".event").html("יום העצמאות (הוקדם)");} 
                if (date.getDate()==4 &&date.getDay()==5) tableCell.find(".event").html("יום העצמאות (הוקדם)");
                if (date.getYear()<5764)
                    {if (date.getDate()==5 &&date.getDay()==2) tableCell.find(".event").html("יום העצמאות");}
                else
                    {if (date.getDate()==6 &&date.getDay()==3) tableCell.find(".event").html("יום העצמאות (נדחה)");} 
                if (date.getDate()==4 &&date.getDay()==3) tableCell.find(".event").html("יום הזיכרון לחללי מערכות ישראל");
                if (date.getYear()<5714)
                    {if (date.getDate()==4 &&date.getDay()==5) tableCell.find(".event").html("יום הזיכרון לחללי מערכות ישראל (הוקדם)");}
                else
                    {if (date.getDate()==2 &&date.getDay()==4) tableCell.find(".event").html("יום הזיכרון לחללי מערכות ישראל (הוקדם)");} 
                if (date.getDate()==3 &&date.getDay()==4) tableCell.find(".event").html("יום הזיכרון לחללי מערכות ישראל (הוקדם)");
                if (date.getYear()<5764)
                    {if (date.getDate()==4 &&date.getDay()==1) tableCell.find(".event").html("יום הזיכרון לחללי מערכות ישראל");}
                else
                    {if (date.getDate()==5 &&date.getDay()==2) tableCell.find(".event").html("יום הזיכרון לחללי מערכות ישראל (נדחה)");} 
            }
            else if (date.getDate()==14) tableCell.find(".event").html("פסח שני");
            else if (date.getDate()==18) tableCell.find(".event").html("ל\"ג בעומר");
            else if (date.getDate()==28) tableCell.find(".event").html("יום ירושלים");
                
            break;
        case 10://סיון
            if (date.getDate()==5) tableCell.find(".event").html("ערב שבועות");
            else if (date.getDate()==6) {tableCell.find(".event").html("שבועות"); tableCell.addClass("sabbath");}
            break;
        case 11://תמוז
            if (date.getDate() == 17 && date.getDay() != 7) tableCell.find(".event").html("צום י\"ז בתמוז");
            else if (date.getDate() == 18 && date.getDay() == 1) tableCell.find(".event").html("צום י\"ז בתמוז (נדחה)");
            break;
        case 12://אב
            if (date.getDate() == 9 && date.getDay() != 7) tableCell.find(".event").html("צום ט\' באב");
            if (date.getDate() == 10 && date.getDay() == 1) tableCell.find(".event").html("צום ט\' באב (נדחה)");
            else if (date.getDate()==15) tableCell.find(".event").html("ט\"ו באב");
            break;
        case 13://אלול
            if (date.getDate()==29) tableCell.find(".event").html("ערב ראש השנה");
            break;
    }
    
    //tableCell.find(".event").html("gdf");
    //tableCell.addClass("sabbath");
}

function initializHeSmallCalendar(date,id){
    ans="<table class=\"HeSmallcalendar\">";
	ans+="<thead><tr><th colspan=\"7\" class=\"jDate\"></th></tr>";
	ans+="<thead><tr><th abbr=\"ראשון\" scope=\"col\" title=\"\ראשון\">א</th><th abbr=\"שני\" scope=\"col\" title=\"שני\">ב</th><th abbr=\"שלישי\" scope=\"col\" title=\"שלישי\">ג</th>	<th abbr=\"רביעי\" scope=\"col\" title=\"רביעי\">ד</th>	<th abbr=\"חמישי\" scope=\"col\" title=\"חמישי\">ה</th>	<th abbr=\"שישי\" scope=\"col\" title=\"שישי\">ו</th><th abbr=\"שבת\" scope=\"col\" title=\"שבת\">ש</th></tr></thead>";
	ans+="<tfoot><tr><td colspan=\"3\" class=\"prev\"><label title=\"החודש הקודם\"></label></td><td class=\"pad\">&nbsp;</td><td colspan=\"3\" class=\"next\"><label title=\"החודש הבא\">&raquo;</label></td></tr></tfoot>";
	ans+="<tbody>";
	for (var i=0;i<6;i++){
	    ans+="<tr>"
	    for (var j=0;j<7;j++)
	        ans+="<td><span class=\"jDate\"></span></td>";
	    ans+="</tr>"    
    }
    ans+="</tbody></table>";
    $("#"+id).html(ans);
    showCalendar(date,id);
}

function initializHeBigCalendar(date,id){
    ans="<table class=\"HeBigcalendar\">";
	ans+="<thead><tr><th colspan=\"3\" class=\"jDate\"></th><th class=\"pad\">&nbsp;</th><th colspan=\"3\" class=\"oDate\"></th></tr>";
	ans+="<tr><th abbr=\"ראשון\" scope=\"col\" title=\"\ראשון\">ראשון</th><th abbr=\"שני\" scope=\"col\" title=\"שני\">שני</th><th abbr=\"שלישי\" scope=\"col\" title=\"שלישי\">שלישי</th>	<th abbr=\"רביעי\" scope=\"col\" title=\"רביעי\">רביעי</th>	<th abbr=\"חמישי\" scope=\"col\" title=\"חמישי\">חמישי</th>	<th abbr=\"שישי\" scope=\"col\" title=\"שישי\">שישי</th><th abbr=\"שבת\" scope=\"col\" title=\"שבת\">שבת</th></tr></thead>";
	ans+="<tfoot><tr><td colspan=\"3\" class=\"prev\"><label title=\"החודש הקודם\"></label></td><td class=\"pad\">&nbsp;</td><td colspan=\"3\" class=\"next\"><label title=\"החודש הבא\">&raquo;</label></td></tr></tfoot>";
	ans+="<tbody>";
	for (var i=0;i<6;i++){
	    ans+="<tr>"
	    for (var j=0;j<7;j++)
	        ans+="<td><span class=\"jDate\"></span><span class=\"oDate\"></span><span class=\"event\"></span></td>";
	    ans+="</tr>"    
    }
    ans+="</tbody></table>";
    $("#"+id).html(ans);
    showCalendar(date,id);
}