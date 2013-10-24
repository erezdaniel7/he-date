<!--//<%
/*  private version of HeDate
    using this version required approve from Daniel Levanon (daniellevanon@gmail.com)
    for publish version: http://he-date.info
*/
function HeDate(p1,p2,p3){
    this.year=0;
    this.month=0;
    this.date=0;
    if (typeof(p1) == "number" && typeof(p2) == "number" && typeof(p3) == "number"){
    	this.setYear(p1);
    	this.setMonth(p2);
    	this.setDate(p3);
    }
    else if (typeof(p1) == "number" && typeof(p2) == "undefined" && typeof(p3) == "undefined")
    	this.setTime(p1);
    else if ((typeof(p1) == "object") && (p1.constructor == HeDate) && typeof(p2) == "undefined" && typeof(p3) == "undefined"){
    	this.setYear(p1.getYear());
    	this.setMonth(p1.getMonth());
    	this.setDate(p1.getDate());
    }
    else if ((typeof(p1) == "object") && (p1.constructor == Date) && typeof(p2) == "undefined" && typeof(p3) == "undefined"){    
    	var GregDate=new Date(p1);
    	GregDate.setHours(0);
    	GregDate.setMinutes(0);
    	GregDate.setSeconds(0);
    	GregDate.setMilliseconds(0);
    	var gregRoshHshana=HeDate.getGregorianDateOfRoshHashanah(GregDate.getFullYear()+3761);
    	var days=GregDate.getTime()-gregRoshHshana.getTime();
    	days=days/86400000;
    	days=Math.round(days);
    	this.year=GregDate.getFullYear()+3761;
    	this.month=1;
    	this.setDate(days+1);
    }
}

HeDate.Time=function(days,hours,parts){
    this.days=days;
    this.hours=hours;
    this.parts=parts;
}

HeDate.prototype.getYear=function(){return this.year;}
HeDate.prototype.getMonth=function(){return this.month;}
HeDate.prototype.getDate=function(){return this.date;}
HeDate.prototype.getDay=function(){return HeDate.mod7(this.getTime());}
HeDate.prototype.getTime=function(){
    var ans=HeDate.getDayOfRoshHshan(this.year);
    var month=this.month;
    for(this.month=1 ; this.month<month ; this.month++)
        ans+=this.getMonthLength();
    ans+=this.date-1;
    return ans;
}

HeDate.intDiv=function(a,b){
    var a=a/b;
    var b=Math.round(a);
    if (a>0 & b>a) b--;
    else if (a<0 & a>b) b++;
    return b;
}

HeDate.getNumOfMonthUntilNow=function(year,month){
    var numOfMonth=HeDate.intDiv(year-1,19)*7;
    if ((year-1)%19>=17) numOfMonth+=6;
    else if((year-1)%19>=14) numOfMonth+=5;
    else if((year-1)%19>=11) numOfMonth+=4;
    else if((year-1)%19>=8) numOfMonth+=3;
    else if((year-1)%19>=6) numOfMonth+=2;
    else if((year-1)%19>=3) numOfMonth++;  
    numOfMonth+=(year-1)*12;
    numOfMonth+=month;
    if (month>=6 & !HeDate.IsLeapYear(year)) numOfMonth--;
    return numOfMonth;
}

HeDate.getTimeOfMoladRoshHshann=function(year){
    var numOfMonth= HeDate.getNumOfMonthUntilNow(year,0);
    
    myTime=new HeDate.Time(numOfMonth*29,numOfMonth*12,numOfMonth*793);
    //add the first molad.
    myTime.days+=2;
    myTime.hours+=5;
    myTime.parts+=204;
    
    myTime.hours+=HeDate.intDiv(myTime.parts,1080);
    myTime.parts=myTime.parts%1080;
    myTime.days+=HeDate.intDiv(myTime.hours,24);
    myTime.hours=myTime.hours%24;
    
    return myTime;
}

HeDate.IsLeapYear=function(year){
	year=year%19;
	return (year==3 || year==6 || year==8 || year==11 || year==14 || year==17 || year==0)
}

HeDate.mod7=function(day){
    var ans=day%7;
    if (ans==0) ans=7;
    return ans;
}

HeDate.DayOfRoshHshan=new Array(); 
HeDate.getDayOfRoshHshan=function(year){
    if (HeDate.DayOfRoshHshan[year]>0) return HeDate.DayOfRoshHshan[year];
    myTime=HeDate.getTimeOfMoladRoshHshann(year);
    if (myTime.hours>=18) myTime.days++;
    else if (HeDate.mod7(myTime.days)==3 && ((myTime.hours==9 && myTime.parts>=204) | myTime.hours>9) && !HeDate.IsLeapYear(year))
        myTime.days++;
    else if (HeDate.mod7(myTime.days)==2 && ((myTime.hours==15 && myTime.parts>=589) | myTime.hours>15) && HeDate.IsLeapYear(year-1))
        myTime.days++;
    
    if (HeDate.mod7(myTime.days)==1 | HeDate.mod7(myTime.days)==4 | HeDate.mod7(myTime.days)==6) myTime.days++;
    
    HeDate.DayOfRoshHshan[year]=myTime.days;
    return myTime.days;
}

//כסדרה=0
//חסרה=-1
//מלאה=1
HeDate.getyeartype=function(year){
    day=HeDate.getDayOfRoshHshan(year) + 354 + 30*HeDate.IsLeapYear(year);
    return HeDate.getDayOfRoshHshan(year+1)-day;
}

HeDate.getSeptemberDatOfRoshHashanah=function(year){
    //a-Number of datys from september 1739-september in the calculate year.
    var a=HeDate.intDiv(year-3761,4)-HeDate.intDiv(year-3761,100)+HeDate.intDiv(year-3761,400);
    a-=HeDate.intDiv(1739,4)-HeDate.intDiv(1739,100)+HeDate.intDiv(1739,400);
    a+=(year-3761-1739)*365;
    //b-Number of days from Rosh Hashanah 5500-Rosh Hashanah in the calculate year.
    var b=HeDate.getDayOfRoshHshan(year)-HeDate.getDayOfRoshHshan(5500);
    return b-a+33;
}

HeDate.getGregorianDateOfRoshHashanah=function(year){
    var myDate=new Date(year-3761,8,HeDate.getSeptemberDatOfRoshHashanah(year),0,0,0,0);
    return myDate;
}

HeDate.prototype.getMonthLength=function(){
    if (this.month==1 || this.month==5|| this.month==8 || this.month==10 || this.month==12) return 30;
    if (this.month==6) return 30*HeDate.IsLeapYear(this.year)
    if (this.month!=2 && this.month!=3) return 29;
    var yearTaype=HeDate.getyeartype(this.year);
    if (yearTaype==1) return 30;
    if (yearTaype==-1) return 29;
    if (this.month==2) return 29;
    return 30;
}

HeDate.prototype.getYearLength=function(){
    var ans=354;
    ans+=30*HeDate.IsLeapYear(this.year);
    ans+=HeDate.getyeartype(this.year);
    return ans;
}

HeDate.prototype.setDate=function(day){
    this.date=1;
    if (Math.abs(day)>400)
        this.setTime(this.getTime()-this.date+day);
    else if (day>0)
    {
        monthLenngth=this.getMonthLength();
        if (day<=monthLenngth) this.date=day;
        else {
            this.addMonths(1);
            this.setDate(day-monthLenngth);
        }        
    }
    else if (day<=0){
        this.addMonths(-1);
        this.setDate(this.getMonthLength()+day);
    }
}

HeDate.prototype.addMonths=function(month){
    var numOfMonth=HeDate.getNumOfMonthUntilNow(this.year,this.month);
    numOfMonth+=month;
    this.year=1+HeDate.intDiv(numOfMonth,235)*19;
    numOfMonth=numOfMonth%235;
    if (numOfMonth==0){
        this.month=13;
        this.year--;
    }
    else {
        while(numOfMonth>(12+1*HeDate.IsLeapYear(this.year))){
            numOfMonth-=(12+1*HeDate.IsLeapYear(this.year));
            this.year++;
        }
        this.month=numOfMonth;
        if (this.month>=6 & !HeDate.IsLeapYear(this.year)) this.month++;
    }
    if (this.getDate()==30 && this.getMonthLength()==29){
        this.date=1;
        this.addMonths(1); 
    }
}

HeDate.prototype.setMonth=function(month){
    if(month>13){
        this.month=13;
        this.addMonths(month-13);
    }
    else if (month==6 & !HeDate.IsLeapYear(this.year)) this.month=7;
    else this.month=month;
}

HeDate.prototype.setYear=function(year){
    this.year=year;
    if (HeDate.IsLeapYear(year) && this.month==6) this.month++;
}

HeDate.prototype.setTime=function(days){
    this.date=1;
    days++
    this.year=19*HeDate.intDiv(days,6936);
    this.year+=HeDate.intDiv(days%6936,600);
    var calculatDay=HeDate.getDayOfRoshHshan(this.year);
    while (days<=calculatDay){
       this.year--;
       calculatDay=HeDate.getDayOfRoshHshan(this.year);
    }
    while (days>(calculatDay+this.getYearLength())){
        this.year++;
        calculatDay=HeDate.getDayOfRoshHshan(this.year);
    }
    this.month=1;
    while (days>(calculatDay+this.getMonthLength())) {
        calculatDay+=this.getMonthLength()
        this.addMonths(1);
    }
    this.date=days-calculatDay;
}

HeDate.prototype.ConvertToGregorian=function(){
    var ans=HeDate.getGregorianDateOfRoshHashanah(this.year);
    var HERoshHshana=new HeDate(this.year,1,1);
    var days=this.getTime()-HERoshHshana.getTime();
    ans.setDate(days+ans.getDate());
    return ans;
}

HeDate.gimatria = function (num){
	var ans="";
	var temp=num%1000;
	var abc=" אבגדהוזחטיכלמנסעפצקרשת"
	
	if (temp>=100 && temp<=999) 	//מאות
		{var hundreds = (temp-temp%100)/100;
		temp=temp%100;
		while (hundreds >= 4)
			{ans = ans + abc.charAt(22);
			hundreds = hundreds - 4;}
		if (hundreds >> 0)
			ans = ans + abc.charAt(18 + hundreds);}

	if (temp>=10 && temp<=99) 	//עשרות
		{var tens=(temp-temp%10)/10;
		temp=temp%10;
		if ((tens==1) && ((temp==5)||(temp==6))) //ט"ו  ט"ז
			{tens = tens-1;
			temp = temp + 1;}
		ans = ans + abc.charAt(9 + tens);
		}

	if (temp>=1 && temp<=9) 	// יחידות
		ans = ans + abc.charAt(temp);

	if (ans.length>=2)		//הוספת גרש או גרשיים
		ans = ans.substring(0,(ans.length-1)) + '"' + ans.substring(ans.length-1);
	else if (ans.length==1)
		ans =ans + "'";

	if (num>=1000 && num<=9999) //אלפים
		ans = abc.charAt((num-num%1000)/1000) + "'" + ans;

	return ans
}

HeDate.regimatria = function (str){
	var ans=0;
	var temp=str;
	var abc=" אבגדהוזחטיכלמנסעפצקרשת";
	var index;
	while (temp.length>>0){
		index=abc.indexOf(temp.charAt(0));
		if (index>0){
			if (index<=9)
				ans=ans+index;
			else if (index<=18)
				ans=ans+(index-9)*10;
			else
				ans=ans+(index-18)*100;
		}
		temp=temp.substring(1,temp.length);
	}
	index=abc.indexOf(str.charAt(0));
	if (ans>index & index>0 & index<=9 & ans!=15 & ans!=16)
		ans=ans + index*1000 - index;
	return ans;
}

HeDate.prototype.getMonthString = function (){
    var months = ['תשרי','חשון','כסלו','טבת','שבט',"אדר א'",'אדר','ניסן','אייר','סיון','תמוז','אב','אלול']
    var ans=months[this.getMonth()-1];
    if (this.getMonth()==7 & HeDate.IsLeapYear(this.getYear()))
        ans+= " ב'";
    return ans;
}


HeDate.prototype.toString = function (){
    var ans=""
    var days = ['יום ראשון','יום שני','יום שלישי','יום רביעי','יום חמישי','יום שישי','שבת'];
    //var months = ['תשרי','חשון','כסלו','טבת','שבט',"אדר א'",'אדר','ניסן','אייר','סיון','תמוז','אב','אלול']
    ans+=days[this.getDay()-1] + ", ";
    ans+=HeDate.gimatria(this.getDate()) + " ";
    ans+=this.getMonthString()+" ";
    ans+= HeDate.gimatria(this.getYear());
    return ans;
}

HeDate.prototype.compar =function(otheDate){
    return( this.getDate()==otheDate.getDate() && this.getMonth()==otheDate.getMonth() && this.getYear()==otheDate.getYear())
}

//%>-->