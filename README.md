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

### Constructors

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

### Methods

#### getYear();
return the year (integer)

#### getMonth()
return the month (integer) (1-13)
*6 is Adar-A and 7 is Adar (or Adar-B in leap year)

#### getDate()
return the Date (0-30)

#### getDay()
return the Date (0-7)

#### getTime()
Returns the number of days since  א' תשרי א'

#### getMonthLength()
Return the number of days in the month 

#### getYearLength()
Return the number of days in the year

#### getMonthString()
Return the string of month name.

#### toString()


#### setDate(day)
#### addMonths(monthNumber)
#### setYear(year)
#### setTime(year)

#### ConvertToGregorian()
return Date object.

### Help function

#### HeDate.gimatria(num)
#### HeDate.regimatria(str)










## License
 
Copyright (c) 2004-2014 (ה'תשס"ד -ה'תשע"ה) daniel levanon (daniellevanon@gmail.com)

HeDate may be freely distributed under the MIT license. (see LICENSE.md file)
 