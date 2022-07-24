//import fetch from 'node-fetch';

const myKey = '5ded514b41bae667a4ec4dd5d6039dcc45f08a84';
const dateInput = document.getElementById("date-input");
const countryInput = document.getElementById("country-input");
const container = document.getElementById("container");
const submitBtn = document.getElementById("submit-btn");
const yesWrapper = document.getElementById("yes-wrapper");
const noWrapper = document.getElementById("no-wrapper");
const searchWrapper = document.getElementById("search-wrapper");
const holidayBox = document.getElementById("holiday-box");
const titleBox = document.getElementById("title-box");
const titleBox2 = document.getElementById("title-box2");
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let dateEnding = "";
let boxContent = "";


const findHoliday = async() => {
	//the replace method solves the false date issue - otherwise you get one day before the one you selected
	const holiDate = new Date((dateInput.value).replace(/-/g, '\/'));
	const selectedCountry = countryInput.value;
	const selectedYear = holiDate.getFullYear();
	const selectedMonth = holiDate.getMonth() + 1;
	const selectedDate = holiDate.getDate();
	const nameOfMonth = months[selectedMonth - 1];
	const dayName = days[holiDate.getDay()];
	// add the suffix to a date. Eg: 21st, 3rd, 8th
	if (selectedDate === 1 || selectedDate ===  21 || selectedDate ===  31) {
			dateEnding = selectedDate + "st"
		}else if (selectedDate === 2 || selectedDate ===  22){
			dateEnding = selectedDate + "nd"
		}else if(selectedDate === 3 || selectedDate ===  23){
			dateEnding = selectedDate + "rd"
		}else{
			dateEnding = selectedDate + "th"
		}
	const myKey2 = `https://calendarific.com/api/v2/holidays?api_key=${myKey}&country=${selectedCountry}&year=${selectedYear}&month=${selectedMonth}&date=${selectedDate}`;
	try {
		let calendarResponse = await fetch(myKey2)
		const calendar = await calendarResponse.json()
		const isHoliday = (calendar.response.holidays);
		if (isHoliday.length > 0) {

			isHoliday.forEach(element => {
				partialBoxContent = `
				<h3>${element.name}
				</h3>
				<p> Description: ${element.description}
				</p>
				`
				boxContent += partialBoxContent
				holidayBox.innerHTML = boxContent
			});
			titleBox.innerHTML = `
			<h2>
			${dayName}, ${nameOfMonth} ${dateEnding} Is a holiday in ${countryInput.options[countryInput.selectedIndex].text}
			</h2>
			`
			searchWrapper.classList.add("hide-page");
			noWrapper.classList.add("hide-page");
			yesWrapper.classList.remove("hide-page");
		} else {
			titleBox2.innerHTML = `
			<h2>${dayName}, ${nameOfMonth} ${dateEnding} Is 
				<span class="highlight-text">just another day
				</span> 
				in ${countryInput.options[countryInput.selectedIndex].text}
			</h2>
			`
			searchWrapper.classList.add("hide-page");
			yesWrapper.classList.add("hide-page");
			noWrapper.classList.remove("hide-page");
		}
	}catch(error){
		console.log(error)
	}
	

}

const goBack = () => {
	boxContent = "";
	yesWrapper.classList.add("hide-page");
	noWrapper.classList.add("hide-page");
	searchWrapper.classList.remove("hide-page");
}
