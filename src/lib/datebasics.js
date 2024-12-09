new Date(2024, 8, 0) //  2024/8/31
new Date(2024, 8 - 1, 1) //  2024/8/01

/**
 * Usage of _:
_ is often used as a convention while first parameter isn't going to be used.
 this parameter is intentionally ignored.
 */
Array(5).fill(null).map((_, i) => i + 1); // [1, 2, 3, 4, 5]


//getDate(): The getDate() method returns the day of the month (1-31) for the given date,  
new Array(new Date(2024, 8 - 1, 12).getDate()) //return (1->12)