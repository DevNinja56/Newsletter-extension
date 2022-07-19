// Global Test text for automation
const test_email = 'test';
var test_first_name = 'testFirst';
var test_last_name = 'testLast';
var test_full_name = 'testFull';
var test_phone = '123';
var test_confirm_email = 'testConfirm';
var test_additional = 'testAdd';

// API url for hosting php file
const api_url = "https://newsletter.thefastech.com/api.php";

// Global html tags
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
// const anchors = document.querySelectorAll('a');
const spans = document.querySelectorAll('span');
const selects = document.querySelectorAll('select');
const divs = document.querySelectorAll('div');
var dropdowns = [];
var additional = [];
var radios = [];
var button_id = null;


// Triggers
btns.forEach(btn => {
   btn.addEventListener('click', event => {
   		event.preventDefault();
	   	var form = btn.form;
	   	if(btn.id){
	   		button_id = btn.id;
	   	}else{
	   		button_id = btn.className;
	   	}
	   
	   	getData(form);
   });
});

inputs.forEach(inp => {
   inp.addEventListener('click', event => {
   	event.preventDefault();
	   	var form = inp.form;
	   	if(inp.id){
	   		button_id = inp.id;
	   	}else{
	   		button_id = inp.className;
	   	}
	   	getData(form);
   });
});

spans.forEach(anc => {
   anc.addEventListener('click', event => {
   		event.preventDefault();
	   	var form = anc.form;
	   	// alert(anc.form);
	   	if(anc.id){
	   		button_id = anc.id;
	   	}else{
	   		button_id = anc.className;
	   	}
	   	getData(form);
   });
});

// divs.forEach(div => {
//    div.addEventListener('click', event => {
//    	event.preventDefault();
// 	   	var form = div.form;
// 	   	alert(div.form);
// 	   	if(div.id){
// 	   		button_id = div.id;
// 	   	}else{
// 	   		button_id = div.className;
// 	   	}
// 	   	getData(form);
//    });
// });





selects.forEach(select => {
   select.addEventListener('change', event => {
		dropdowns.push({id:select.id, class:select.name});
   });
});



// Main function to fetch data
function getData(form){
		console.log(form);
	  var email = null;

		if(!form){
			email = null;
		}else{
			email = form.querySelector('input[type="email"]');
		}
		 
	    	
	   	if(email == null){
	   		if(!form){
	   			var tags = document.querySelectorAll('input');
	   		}else{
	   			var tags = form.querySelectorAll('input[type="text"]');
	   		}
	   		
	   		console.log(tags);

	   		for(var i=0; i<tags.length; i++){
	   			if (tags[i].value == test_email) 
	   			{
	   				email = tags[i];
	   				break;
	   			}
	   		}
	   	}

	   	if(email.value != test_email){
	   		return false;
	   	}
	   	// alert(email.value);

	   	if(email && email.value == test_email){

	   		console.log('Form saved for', document.location.href);
	   		console.log('Form ID:',form?form.id:'');
	   		console.log('------EMAIL VALUES-----');
	   		console.log(email.id,'with value of:',email.value);
	   		
	   		if(!form){
	   			form = document;
	   		}

	   		var texts = form.querySelectorAll('input');
	   		var text_fields = [];
	   		console.log('------TEXT VALUES------');
			for (var value of texts) {
			    console.log(value.id,'with value of:', value.value);
			    if(value.value == test_first_name){
			    	test_first_name = value;
			    }
			    if(value.value == test_last_name){
			    	test_last_name = value;
			    }
			    if(value.value == test_full_name){
			    	test_full_name = value;
			    }
			    if(value.value == test_phone){
			    	test_phone = value;
			    }
			    if(value.value == test_confirm_email){
			    	test_confirm_email = value;
			    }
			    if(value.value == test_additional){
			    	additional.push({id:value.id, class:value.name});
			    }
			}

			var checkboxes = form.querySelectorAll('input[type="checkbox"]');
			var check_fields = [];
			console.log('-----CHECKBOX VALUES------');
			for (var value of checkboxes) {
			    console.log(value.id,'with value of:', value.checked);
			     if(value.checked){
			    	check_fields.push(value.name);
			    }
			}

			var radio_tags = form.querySelectorAll('input[type="radio"]');
			for (var value of radio_tags) {
			     if(value.checked){
			    	radios.push(value.name);
			    }
			}

			if(form == document){
				form = {
					id: null,
					class: null
				};
				
			}

			if(test_email == email.value){
				apicall(document.location.href, document.title, form.id?form.id:'', form.className?form.className:'', email.id,
			 email.name, test_first_name.id, test_first_name.name, test_last_name.id, test_last_name.name,
			  test_full_name.id, test_full_name.name, test_phone.id, test_phone.name, test_confirm_email.id, test_confirm_email.name, check_fields);

			}
			
	   	}
}

// Function connected to API
function apicall (url, title, form_id, form_class, email_id = null, email_class = null, first_name_id = null,
 first_name_class = null, last_name_id = null, last_name_class = null, full_name_id = null,
  full_name_class = null, phone_id = null, phone_class = null, confirm_email_id = null, confirm_email_class = null, checkboxes = null){

	var xhr = new XMLHttpRequest();
      xhr.open("POST", api_url, true);
      xhr.setRequestHeader("Content-Type", "application/json",'Access-Control-Allow-Origin: *');
      xhr.send(
        JSON.stringify({
          url: url,
          title: title,
          form_id: form_id,
          form_class:form_class,
          email_id: email_id,
          email_class:email_class,
          first_name_id: first_name_id,
          first_name_class: first_name_class,
          last_name_id: last_name_id,
          last_name_class: last_name_class,
          full_name_id: full_name_id,
          full_name_class: full_name_class,
          phone_id: phone_id,
          phone_class:phone_class,
          confirm_email_id: confirm_email_id,
          confirm_email_class: confirm_email_class,
          dropdowns: dropdowns,
          checkboxes:checkboxes,
          additional:additional,
          radios: radios,
          button_id: button_id,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          	console.log(xhr.response);
        }
      };
}

// Message passing
// Response from database, running automation
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	
	if(message.state == 1){
		window.location.href = message.data.url;
	}else{

			data = message.data;
	
		
		// Email Field
	  	if(data.email_field_id){
	  		// document.getElementById(data.form_id).focus();
	  		document.getElementById(data.email_field_id).value = message.email;
	  	}

	  	if(data.first_name_id){
	  		document.getElementById(data.first_name_id).value = message.first_name;
	  	}

	  	if(data.last_name_id){
	  		document.getElementById(data.last_name_id).value = message.last_name;
	  	}

	  	if(data.confirm_email_id){
	  		document.getElementById(data.confirm_email_id).value = message.email;
	  	}

	  	if(data.phone_id){
	  		document.getElementById(data.phone_id).value = message.phone_number;
	  	}
	  	
	  	if(data.checkboxes){
	  		data.checkboxes = JSON.parse(data.checkboxes);
	  		for (var value of data.checkboxes) {
			    document.getElementsByName(value)[0].checked = true;
			}
	  		
	  	}

	  	if(data.radios){
	  		data.radios = JSON.parse(data.radios);
	  		for (var value of data.radios) {
			    document.getElementsByName(value)[0].checked = true;
			}
	  		
	  	}

	  	if(data.dropdowns){
	  		data.dropdowns = JSON.parse(data.dropdowns);
	  		for (var value of data.dropdowns) {
			    document.getElementById(value.id).selectedIndex = "1";
			}
	  	}

	  	if(data.additional){
	  		data.additional = JSON.parse(data.additional);
	  		for (var value of data.additional) {
			    document.getElementById(value.id).value = "test";
			}
	  	}


	  	if(data.button_id){
	  		if(document.getElementById(data.button_id)){
	  			document.getElementById(data.button_id).focus();
	  			document.getElementById(data.button_id).click();
	  		}else{
	  			document.getElementsByClassName(data.button_id)[0].focus();
	  			document.getElementsByClassName(data.button_id)[0].click();
	  		}
	  	}




	}
  
}
