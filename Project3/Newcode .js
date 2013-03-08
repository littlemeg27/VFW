//from the reg ex video

	function validateForm()
	{
		var getEmail = document.forms[0]["email"].value;
		var re = /^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/;
			
			if(!(re.exec(getEmail)))
			{
				error = "Please enter a valid email address. \n";
			}
			
			if (error) alert(error);
	}	
	
//From video 3.1
//under first for loop
var linksLi = documents.createElement('li'); //new list item element that we are going to use


//under second for loop, last line
makeSubList.appendChild(linksLi);// and then we are appending this here

//under the second for loop place this function call.
makeItemLinks();//create our edit and delete buttons links for each item in storage

//Goes above the clear local function
//Make Item Links function
//Create the edit and delete links for each stored item when displayed
function makeItemLinks(key,linksLi);
{ 
//add edit single item link
var editLink = document.createElement("a");
editLink.href = "#";
editLink.key = key;
var editText = "Edit Contact"; 
//editLink .addEventListener("click", editItem);
editLink.innerHTML = editText;
linksLi.appendChild(editLink);


//add link break
var breakTag = document.createElement("br");
linksLi.appendChild(breakTag);

//add delete single item link
var deleteLink = document.createElement("a");
deleteLink.href = "#";
deleteLink.key = key;
var deleteText = "Delete Contact";
//deleteLink .addEventListener("click", deleteItem);
deleteLink.innerHTML = deleteText;
linksLi.appendChild(deleteLink);
}


	function editItem()//grabs the data from our item from local storage 
	{
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show the form
		toggleControls("off");
		
		//populate the form fields with current localStorage values
		$('groups').value = item.group[1];
		$('firstName').value = item.firstName[1];
		$('lastName').value = item.lastName[1];
		$('email').value = item.email[1];
		var radios = document.forms[0].sex;
		
		for(var i=0; i<radios.length; i++)
		{
			if(radios[i].value == "Male" && item.sex[1] == "Male")
			{
				radios[i].setAttribute("checked", "checked");
			}
			
			else if(radios[i].value == "Female" && item.sex[1] == "Female") 
			{
				radios[i].setAttribute("checked", "checked");
			}
		}
		
			if (item.favorite[1] == "Yes")
			{
				$("fav").setAttribute("checked", "checked");
			}
			
		$('dogName').value = item.dogName[1];
		$('date').value = item.date[1];
		$('comments').value = item.comments[1];
	


	//Remove the initital listener from the input "save contact" button
	save.removeEventListener("click", validate);
	//Change submit button value to edit button
	$('submit').value = "Edit Contact";
	var editSubmit = $('submit');
	//save the key value estiblished in this function as a property of the editSubmit event
	//so we can use that value when we save the data we edited 
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
	
	}//End function editItem
	
	
	//under 
	//set link and submit events
	var displayLink = $('displayLink');	
	//change 
	save.addEventListerner("click", storeData);
	//to
	save.addEventListerner("click", validate);
	
	
	//have to create a "validate" function
	function validate(e)
	{ 
		//Define the elements we want to check
		var getGroup = $('groups');
		var getfirstName = $('firstName');
		var getlastName = $('lastName');
		var getemail = $('email');
		
		//Reset Error Messages
		errMsg.innerHTML = "";
		getGroup.style.border = "1px solid black";
		getfirstName.style.border = "1px solid black";
		getlastName.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";



		//Get error messages 
		var messageAry = [];
	
		//Group validation
		if(getfirstName.value === "--Choose A Group--")
		{
			var groupError = "Please choose a group.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
	
		//First name validation 
		if(getfirstName.value === "")
		{
			var firstNameError = "Please enter a first name";
			getfirstName.style.border = "1px solid red";
			messageAry.push(firstNameError);
		}
	
		//Last name validation 
		if(getlastName.value === "")
		{
			var lastNameError = "Please enter a last name";
			getlastName.style.border = "1px solid red";
			messageAry.push(lastNameError);
		}
	
		//Email Validation 
		var re = /^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/;
		
		if(!(re.exec(getEmail.value)))
		{
			var emailError = "Please enter a email address";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
	
		//If there are errors display them on the screen
		if(messageAry.length >= 1)
		{
			for(var i=0, j=messageAry.length; i < j; i++)
			{
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				$('errors').appendChild(txt);
			}
			
			e.preventDefault();
			return false;
			
			else
			{
				//if all is ok save our data. send the key value (which is from the editData function)
				//remember this key value was passed through the editsubmit event listener as a property. 
				storeData(this.key);
			}
		}

		function()
		{
			var ask = confirm("Do you want to delete this contact?");
			
			if(ask)
			{
				localStorage.removeItem(this.key);
				alert("Contact was deleted!");
				window.location.reload();
			}
			
			else
			{
				alert("Contact was not deleted");
			}
			
		}

	}







	
	