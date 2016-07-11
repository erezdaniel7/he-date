# heDate.js

The HeDate JS object lets you work with jewish dates (years, months, days) just like Date object do with the Gregorian dates.

HeDate site http://he-date.info/site.html (Hebrew)

## Quick Examples

```javascript
var s=(new HeDate()).toString();
//now s is "יום שישי, ז' חשון ה'תשע"ה"
 ```
## Demo

http://he-date.info/public/demo.html
 

## Documentation

* [`Constructors`](#Constructors)

### Methods
* [`getYear()`](#getYear)
* [`getMonth()`](#getMonth)
* [`getDate()`](#getDate)
* [`getDay()`](#getDay)
* [`getTime()`](#getTime)
* [`getMonthLength()`](#getMonthLength)
* [`getYearLength()`](#getYearLength)
* [`getMonthString()`](#getMonthString)
* [`toString()`](#toString)
* [`setDate()`](#setDate)
* [`addMonths()`](#addMonths)
* [`setMonth()`](#setMonths)
* [`setYear()`](#setYear)
* [`setTime()`](#setTime)
* [`ConvertToGregorian()`](#ConvertToGregorian)

### function
* [`HeDate.gimatria(num)`](#HeDate.gimatria(num))
* [`HeDate.regimatria(str)`](#HeDate.regimatria(str))

<a name="Constructors" />
## Constructors

```javascript
HeDate() empty constructor- set today date.
HeDate(date) convert constructor- convert date from Date clsaa.
HeDate(time) init constructor- time- days since א' תשרי א'
HeDate(y,m,d) init constructor2- get year, month,days.
HeDate(heDate) copy constructor- deep copy of the object.

//example 
var d1=new HeDate(); // today.
var d2=new HeDate(new Date(1405448527131)) // י"ז תמוז ה'תשע"ד
var d3=new HeDate(2108358); // כ' אדר ה'תשע"ג
var d4=new HeDate(5773,7,20); // כ' אדר ה'תשע"ג
var d5=new HeDate(d3); // כ' אדר ה'תשע"ג

```

## Methods

<a name="getYear" />
### getYear();
return the year (integer)
```javascript
var d=new HeDate(2108971);
var x=d.getYear();
//now x is 5775
 ```

<a name="getMonth" />
### getMonth()
return the month (integer) (1-13).

* 6 is Adar-A and 7 is Adar (or Adar-B in leap year).

```javascript
var d=new HeDate(2108971);
var x=d.getMonth();
//now x is 2
 ```

<a name="getDate" />
### getDate()
return the Date (1-30)

```javascript
var d=new HeDate(2108971);
var x=d.getDate();
//now x is 12
 ```

<a name="getDay" />
### getDay()
return the day of the week (1-7)

```javascript
var d=new HeDate(2108971);
var x=d.getDay();
//now x is 4
 ```

<a name="getTime" />
### getTime()
Returns the number of days since  א' תשרי א'
```javascript
var d=new HeDate(2108971);
var x=d.getTime();
//now x is 2108971
 ```

<a name="getMonthLength" />
### getMonthLength()
Return the number of days in the month 

```javascript
var d=new HeDate(2108971);
var x=d.getMonthLength();
//now x is 29
 ```

<a name="getYearLength" />
### getYearLength()
Return the number of days in the year

```javascript
var d=new HeDate(2108971);
var x=d.getYearLength();
//now x is 354
 ```

<a name="getMonthString" />
### getMonthString()
Return the string of month name.

```javascript
var d=new HeDate(2108971);
var x=d.getMonthString();
//now x is "חשון"
 ```

<a name="toString" />
### toString()

```javascript
var d=new HeDate(2108971);
var x=d.toString();
//now x is "יום רביעי, י"ב חשון ה'תשע"ה"
 ```

<a name="setDate" />
### setDate(day)
```javascript
var d=new HeDate(2108971);
d.setDate(18); //"יום שלישי, י"ח חשון ה'תשע"ה"
d.setDate(d.getDate()+100); //"יום חמישי, ל' שבט ה'תשע"ה"
 ```

<a name="addMonths" />
### addMonths(monthNumber)
```javascript
var d=new HeDate(2108971);
d.addMonths(1); //"יום חמישי, י"ב כסלו ה'תשע"ה"
d.addMonths(5); //"יום שישי, י"ב אייר ה'תשע"ה" 
 ```

<a name="setMonth" />
### setMonth(month)
```javascript
var d=new HeDate(2108971);
d.setMonth(1); //"יום שני, י"ב תשרי ה'תשע"ה"
d.setMonth(5); //"יום ראשון, י"ב שבט ה'תשע"ה"
 ```

<a name="setYear" />
### setYear(year)
```javascript
var d=new HeDate(2108971);
d.setYear(5770); //"יום שישי, י"ב חשון ה'תש"ע"
d.setYear(d.getYear()+100); //"יום רביעי, י"ב חשון ה'תת"ע"
 ```

<a name="setTime" />
### setTime(year)
```javascript
var d=new HeDate();
d.setTime(2108960); //"שבת, א' חשון ה'תשע"ה"
 ```

<a name="ConvertToGregorian" />
### ConvertToGregorian()
return Date object.
```javascript
var d=new HeDate(2109000);
d.ConvertToGregorian(); //"Thu Dec 04 2014 00:00:00"
 ```

## function

<a name="HeDate.gimatria(num)" />
### HeDate.gimatria(num)

```javascript
HeDate.gimatria(5700); // "ה'ת"ש"
 ```

<a name="HeDate.regimatria(str)" />
### HeDate.regimatria(str)
```javascript
var s="ה'ת\"ש"
HeDate.regimatria(s); // 5700
var s="אבג"
HeDate.regimatria(s); // 1005
var s="התש"
HeDate.regimatria(s); // 5700
 ```


## License
 
Copyright (c) 2004-2014 (ה'תשס"ד -ה'תשע"ה) daniel levanon (daniellevanon@gmail.com)

HeDate may be freely distributed under the MIT license. (see LICENSE.md file)
 