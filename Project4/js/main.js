//Brenna Pavlinchak
//VFW
//Project 4
//11/18/2012

    
window.addEventListener("DOMContentLoaded", function()
{
    
            var errMsg = $('errors');
            var trimValue;
            var sexValue;
            var radios;
        
        
        function $(x) //getElementById Function
        {
            var theElement = document.getElementById(x);
            return theElement;
        }//End function $
            
            var chooseBreed = ["--Choose Breed--","Cairn Terrier", "Golden Retriever", "Standard Poodle", "Greyhound", "Great Dane", 
                               "Miniature Poodle", "West Highland Terrier", "Jack Russell Terrier", "GoldenDoodle", "Other"]; //The choose breed drop down
            
            
        function makeDogs() //create select field element with options
        {
                var formTag = document.getElementsByTagName("Form"),
                    selectLi = $('pools'),
                    makeSelect = document.createElement('select');
                    makeSelect.setAttribute("id", "groups");
            
            for (var i = 0, j = chooseBreed.length; i<j; i++) //For loop to choose the breed
            {
                
                var makeOption = document.createElement('option');
                var optText = chooseBreed[i];
                makeOption.setAttribute("value", optText);
                makeOption.innerHTML = optText;
                makeSelect.appendChild(makeOption);
            }
            selectLi.appendChild(makeSelect);
        
        }//End of function makeDogs
        
        
        function getSelectedRadio() //Find value of selected radio button.
        {
                var radios = document.forms[0].sexValue;
            
            for(var i=0; i<radios.length; i++)
            {
                    
                if (radios[i].checked)
                {
                sexValue = radios[i].value;
                }
                    
            }
        
        }//End function getSelectedRadio
    
            
        function getCheckboxValue() //Find the value of the check box
        {
            if($('trim').checked)
            {
                trimValue = $('trim').value;
            }
                
                else
                {
                    trimValue = "No";    
                }
        
        }//End function getCheckBoxValue 
    
        
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
        }//End of function toggle controls
    
        
        function storeData(key)
        {
            var id;
            
            if(!key)
            {
                id = Math.floor(Math.random()*1000001);    
            }
            
                else
                {
                    id = key;
                }
            
            console.log("storeData fired"); //Gathers all form field values & store in an object.
            
                getSelectedRadio(); 
                getCheckboxValue();
            var item                  = {};
                item.firstName        =["First Name:", $('firstName').value];
                item.lastName         =["Last Name:", $('lastName').value];
                item.phoneNumber      =["Phone Number:", $('phoneNumber').value];
                item.email            =["Email:", $('email').value];
                item.dogName          =["Dog's Name:", $('dogName').value];
                item.groups      	  =["Dog Breed:", $('groups').value];    
                item.sexValue         =["Gender Of Dog:", $('sexValue').value];        
                item.date             =["Appointment Date:", $('date').value];
                item.slide            =["Weight:", $('slide').value];
                item.trim             =["Trim the nails?", $('trim').value];
                item.comments         =["Comments:", $('comments').value];
                
            
            localStorage.setItem(id, JSON.stringify(item)); //Save data in not local storage: Use Stringify to convert our object to a string.
            alert("Dog Saved!");
            window.location.reload();
        
        } //End of function storeData
    
               
 
        
        function getData()
        {
            toggleControls("on");
            
            if(localStorage.length === 0)
            {
                alert("There are no dogs saved! Load default data");
                autoFillData();
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
                var linksLi = document.createElement('li'); 
                
                makeList.appendChild(makeli);
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                
                var obj = JSON.parse(value); //Convert string from local storage value back to object using JSON.parse
                var makeSubList = document.createElement('ul'); 
                makeli.appendChild(makeSubList);
                
               getImage(obj.pools[1], makeSubList);//Calls the getImage function
                
				for(var n in obj)
				{
					var makeSubli = document.createElement('li');
					makeSubList.appendChild(makeSubli);
					var optSubText = obj[n][0]+" "+obj[n][1];
					makeSubli.innerHTML = optSubText;
					makeSubList.appendChild(linksLi);
				}
                
                makeItemLinks(localStorage.key(i), linksLi); //create our edit delete buttons link
            }
        } //End of function getData
                            
       
       
       
        function makeItemLinks(key, linksLi) //Create the edit and delete links for each stored item when displayed
        { 
             
                var editLink = document.createElement("a"); //add edit single item link
                editLink.href = "#";
                editLink.key = key;
                var editText = "Edit Contact"; 
                editLink.addEventListener("click", editItem);
                editLink.innerHTML = editText;
                linksLi.appendChild(editLink);
                
                
                var breakTag = document.createElement("br"); //add link break
                linksLi.appendChild(breakTag);
                
                
                var deleteLink = document.createElement("a"); //add delete single item link
                deleteLink.href = "#";
                deleteLink.key = key;
                var deleteText = "Delete Contact";
                deleteLink.addEventListener("click", deleteItem);
                deleteLink.innerHTML = deleteText;
                linksLi.appendChild(deleteLink);
        }//End function makeItemLinks


       
       
        function editItem()//grabs the data from our item from local storage 
        {
            var value = localStorage.getItem(this.key);
            var item = JSON.parse(value);//testing
            var checkIn;
            var validate;
            var radios = document.forms[0].sexValue;
            
            
            toggleControls("off"); //show the form
            
            $('firstName').value = item.firstName[1]; //populate the form fields with current localStorage values
            $('lastName').value = item.lastName[1];
            $('email').value = item.email[1];
            $('phoneNumber').value = item.phoneNumber[1];
            
	            for(var i=0; i<radios.length; i++)
	            {
	                if(radios[i].value == "Male" && item.sexValue[1] == "Male")
	                {
	                    radios[i].setAttribute("checked", "checked");
	                }
	                
	                else if(radios[i].value == "Female" && item.sexValue[1] == "Female") 
	                {
	                    radios[i].setAttribute("checked", "checked");
	                }
	            }//end of for loop
	            
	                if (item.trim[1] == "Yes")
	                {
	                    $("trim").setAttribute("checked", "checked");
	                }
                
            $('dogName').value = item.dogName[1];
            $('groups').value = item.pools[1];
            $('date').value = item.date[1];
            $('comments').value = item.comments[1];
            $('slide').value = item.slide[1];
        
        
                checkIn.removeEventListener("click", validate); //Remove the initital listener from the input "save contact" button
                
                $('checkIn').value = "Edit Contact"; //Change submit button value to edit button
                
                var editSubmit = $('checkIn');
                
                editSubmit.addEventListener("click", validate);//save the key value estiblished in this function as a property of the editSubmit event
                
                editSubmit.key = this.key; //so we can use that value when we save the data we edited
                
        }//End of function editItem    
            
            
            
            
            
         function getImage(catName, makeSubList)//Adding images to the app
        {
            var imageLi = document.createElement('li');
            makeSubList.appendChild(imageLi);
            
            var newImg = document.createElement('img');
            var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
            imageLi.appendChild(newImg);
        
        }//End function getImage 
      
        
        
        
        
        function autoFillData() //Auto populate local storage
        {
        	  
               for(var n in json)
               {
                   var id = Math.floor(Math.random()*100000001);
                   localStorage.setItem(id, JSON.stringify(json[n]));
               }
       
        }//End function autoFillData
            
       
       
       
       
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
        }//End function deleteData
        
        
        
        
        function deleteItem()
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
                
        } //End function deleteItem

       
       
       
        
        function validate(e) //have to create a "validate" function
        { 
            
            var getGroup = $('groups');//Define the elements we want to check
            var getfirstName = $('firstName');
            var getlastName = $('lastName');
            var getEmail = $('email');
            var getPhoneNumber = $('phoneNumber');
            var getDogName = $('dogName');
            var ErrMsg = $('errors');
            
            
            errMsg.innerHTML = ""; //Reset Error Messages
            getGroup.style.border = "1px solid black";
            getfirstName.style.border = "1px solid black";
            getlastName.style.border = "1px solid black";
            getPhoneNumber.style.border = "1px solid black";
            getEmail.style.border = "1px solid black";
            getDogName.style.border = "1px solid black";
    
            var messageAry = []; //Get error messages
        
            
            if(getfirstName.value === "--Choose A Group--") //Group validation
            {
                var groupError = "Please choose a group.";
                getGroup.style.border = "1px solid red";
                messageAry.push(groupError);
            }
        
            
            if(getfirstName.value === "") //First name validation 
            {
                var firstNameError = "Please enter a first name";
                getfirstName.style.border = "1px solid red";
                messageAry.push(firstNameError);
            }
        
            
            if(getlastName.value === "") //Last name validation 
            {
                var lastNameError = "Please enter a last name";
                getlastName.style.border = "1px solid red";
                messageAry.push(lastNameError);
            }
        
            var number = /^[0-9]{3}[\-]{1}[0-9]{3}[\-]{1}[0-9]{4}$/;//Phone Number Validation
        
            if(!(number.exec(getPhoneNumber.value)))
            {
                var phoneNumberError = "Please enter a phone number in format: 123-456-7890";
                getPhoneNumber.style.border = "1px solid red";
                messageAry.push(phoneNumberError);
            }
             
            var re = /^\w+([\.-]?\w)*@\w+([\.-]?\w)*(\.\w{2,3})+$/; //Email Validation
            
            if(!(re.exec(getEmail.value)))
            {
                var emailError = "Please enter a email address";
                getEmail.style.border = "1px solid red";
                messageAry.push(emailError);
            }
            
            
            if(getDogName.value === "") //Dog's name validation 
            {
                var dogNameError = "Please enter the Dog's name";
                getDogName.style.border = "1px solid red";
                messageAry.push(dogNameError);
            }
        
            
            if(messageAry.length >= 1)//If there are errors display them on the screen
            {
                for(var i=0, j=messageAry.length; i < j; i++)
                {
                    var txt = document.createElement('li');
                    txt.innerHTML = messageAry[i];
                    $('errors').appendChild(txt);
                }
            }    
                else
                {
                    storeData(this.key);
                }
                
                e.preventDefault();
                return false;
                
        } //End function validate
        
        
                    
            
        makeDogs();//Calls make dogs function
    
                //Set Link & Submit Click Events    
                var displayData = $('displayData');
                displayData.addEventListener("click", getData);
                
                var clearData = $('clearData');
                clearData.addEventListener ("click", deleteData);
                
                var checkIn = $('checkIn');
                checkIn.addEventListener ("click", validate);
    
    
    
});