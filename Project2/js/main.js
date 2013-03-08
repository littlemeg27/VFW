//Brenna Pavlinchak
//VFW
//Project 2
//11/4/2012


	
window.addEventListener("DOMContentLoaded", function()
{

	//getElementById Function
	function $(x)
	{
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	var chooseBreed = ["--Choose Breed--","Cairn Terrier Breed", "Golden Retriever", "Standard Poodle", "Greyhound", "Great Dane", "Miniature Poodle", "West 						Highland Terrier", "Jack Russell Terrier", "GoldenDoodle", "Other"];
		
		//create select field element with options
	function makeDogs()
	{
		var formTag = document.getElementsByTagName("Form"),
			selectLi = $('dogBreed'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		
		for (var i = 0, j=chooseBreed.length; i<j; i++)
		{
			
			var makeOption = document.createElement('option');
			var optText = chooseBreed[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}

	function toggleControls(n)
	{
		switch(n)
		{
			case "on":
				$('dogForm').style.display = "none";
				$('clearData').style.display = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('dogForm').style.display = "block";
				$('clearData').style.display = "inline";
				$('displayData').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;		

		}
	}

	function storeData()
	{
		var id			= Math.floor(Math.random()*1000001);
		console.log("storeData fired");
		//Gather all form field values & store in an object.
		//Object properties contain array with the form label & input value.
		//getRadio();
		//getCheckbox();
		var item				= {};
			item.fName			=["First Name:", $('fName').value];
			item.lName			=["lName", $('lName').value];
			item.pNumber		=["Phone Number:", $('pNumber').value];
			item.email			=["Email", $('email').value];
			item.dogName		=["Dog's Name:", $('dogName').value];
			item.dogBreed		=["Dog Breed:", $('groups').value];			
			item.date			=["Appointment Date:", $('date').value];
			item.comments		=["Comments:", $('comments').value];
			
		//Save data inot local storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Dog Saved!");
	}

	function getData()
	{
		toggleControls("on");
		if(localStorage.length === 0)
		{
			alert("There are no dogs saved!");
		}
			var makeDiv = document.createElement('div');
			
			makeDiv.setAttribute("id", "items");
			
			var makeList = document.createElement('ul');
			
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			$('items').style.display = "block";
			
		for(var i=0, len=localStorage.length; i<len; i++)
		{
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			//Convert string from local storage value back to object using JSON.parse

			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj)
			{
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;

			}

		}
	}

	function deleteData()
	{
		if(localStorage.length === 0)
		{
			alert("There are no dogs clear!");

		}
		else
		{
			localStorage.clear();
			alert("All Dogs Have Been Deleted!");
			window.location.reload();
			return false;
		}
	}
		//Variable Defaults
		//sexValue;
	//trimValue = "No";					

		makeDogs();

		//Set Link & Submit Click Events	

	var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	
	var clearData = $('clearData');
	clearData.addEventListener ("click", deleteData);
	
	var checkIn = $('checkIn');
	checkIn.addEventListener ("click", storeData);



});