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
* [`getYear`](#getYear)
* [`getMonth`](#getMonth)
* [`getDate`](#getDate)
* [`getDay`](#getDay)
* [`getTime`](#getTime)
* [`getMonthLength`](#getMonthLength)
* [`getYearLength`](#getYearLength)
* [`getMonthString`](#getMonthString)
* [`toString`](#toString)

* [`setDate`](#setDate)
* [`addMonths`](#addMonths)
* [`setYear`](#setYear)
* [`setTime`](#setTime)

* [`ConvertToGregorian`](#ConvertToGregorian)

### Help function
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

<a name="Constructors" />
### getYear();
return the year (integer)

<a name="Constructors" />
### getMonth()
return the month (integer) (1-13)
*6 is Adar-A and 7 is Adar (or Adar-B in leap year)

<a name="Constructors" />
### getDate()
return the Date (0-30)

<a name="Constructors" />
### getDay()
return the Date (0-7)

<a name="Constructors" />
### getTime()
Returns the number of days since  א' תשרי א'

<a name="Constructors" />
### getMonthLength()
Return the number of days in the month 

<a name="Constructors" />
### getYearLength()
Return the number of days in the year

<a name="Constructors" />
### getMonthString()
Return the string of month name.

<a name="Constructors" />
### toString()


<a name="Constructors" />
### setDate(day)

<a name="Constructors" />
### addMonths(monthNumber)

<a name="Constructors" />
### setYear(year)

<a name="Constructors" />
### setTime(year)

<a name="Constructors" />
### ConvertToGregorian()
return Date object.

## Help function

<a name="Constructors" />
### HeDate.gimatria(num)

<a name="Constructors" />
### HeDate.regimatria(str)



## License
 
Copyright (c) 2004-2014 (ה'תשס"ד -ה'תשע"ה) daniel levanon (daniellevanon@gmail.com)

HeDate may be freely distributed under the MIT license. (see LICENSE.md file)
 