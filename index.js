//import fetch from 'node-fetch';

const myKey = '5ded514b41bae667a4ec4dd5d6039dcc45f08a84';
const dateInput = document.getElementById("date-input");
const countryInput = document.getElementById("country-input");
const container = document.getElementById("container");
const submitBtn = document.getElementById("submit-btn");
const yesWrapper = document.getElementById("yes-wrapper");
const noWrapper = document.getElementById("no-wrapper");
const searchWrapper = document.getElementById("search-wrapper");

const findHoliday = ()=> {
	const holiDate = new Date(dateInput.value);
	const selectedCountry = countryInput.value;
	const selectedYear = holiDate.getFullYear();
	const selectedMonth = holiDate.getMonth() + 1;
	const selectedDate = holiDate.getDate();
	const myKey2 = `https://calendarific.com/api/v2/holidays?api_key=${myKey}&country=${selectedCountry}&year=${selectedYear}&month=${selectedMonth}&date=${selectedDate}`;
	console.log(`my key2 ${myKey2}  holiDate ${holiDate} selectedCountry ${selectedCountry} selectedYear ${selectedYear} selectedMonth ${selectedMonth} selectedDate ${selectedDate} `)
	if(false){
		searchWrapper.classList.add("hide-page")
		noWrapper.classList.add("hide-page")
		yesWrapper.classList.remove("hide-page")
	}else{
		yesWrapper.classList.add("hide-page");
		searchWrapper.classList.toggle("hide-page")
		noWrapper.classList.remove("hide-page")
	}


}

const goBack = () => {
	yesWrapper.classList.add("hide-page");
	noWrapper.classList.add("hide-page")
	searchWrapper.classList.toggle("hide-page")
}


// fetch(myKey2)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));