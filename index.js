//import fetch from 'node-fetch';

const myKey = '5ded514b41bae667a4ec4dd5d6039dcc45f08a84';
const dateInput = document.getElementById("date-input");
const countryInput = document.getElementById("country-input");
const container = document.getElementById("container");
const submitBtn = document.getElementById("submit-btn");
const yesWrapper = document.getElementById("yes-wrapper");
const noWrapper = document.getElementById("no-wrapper");
const searchWrapper = document.getElementById("search-wrapper");
const holidayBox = document.getElementById("holiday-box")



const findHoliday = async() => {
	//the replace method solves the false date issue - otherwise you get one day before
	const holiDate = new Date((dateInput.value).replace(/-/g, '\/'));
	const selectedCountry = "ar" //countryInput.value;
	const selectedYear = holiDate.getFullYear();
	const selectedMonth = holiDate.getMonth() + 1;
	const selectedDate = holiDate.getDate();
	const myKey2 = `https://calendarific.com/api/v2/holidays?api_key=${myKey}&country=${selectedCountry}&year=${selectedYear}&month=${selectedMonth}&date=${selectedDate}`;
	console.log(`my key2 ${myKey2}  holiDate ${holiDate} selectedCountry ${selectedCountry} selectedYear ${selectedYear} selectedMonth ${selectedMonth} selectedDate ${selectedDate} `);
	try {
		let calendarResponse = await fetch(myKey2)
		const calendar = await calendarResponse.json()
		const isHoliday = (calendar.response.holidays);
		if (isHoliday.length > 0) {
			console.log(isHoliday)
			isHoliday.forEach(element => {
				console.log(element.name)
				console.log(element.description)
				console.log(element.type[0])
				let boxContent = `<h3>${element.name}</h3><p> Description:${element.description}</p>`
				holidayBox.innerHTML += boxContent
			});
			searchWrapper.classList.add("hide-page");
			noWrapper.classList.add("hide-page");
			yesWrapper.classList.remove("hide-page");
		} else {
			searchWrapper.classList.add("hide-page");
			yesWrapper.classList.add("hide-page");
			noWrapper.classList.remove("hide-page");
		}
	}catch(error){
		console.log(error)
	}
	

}

const goBack = () => {
	yesWrapper.classList.add("hide-page");
	noWrapper.classList.add("hide-page");
	searchWrapper.classList.remove("hide-page");
}
