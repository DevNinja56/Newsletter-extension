 // API url for hosting php file
const api_url = "https://newsletter.thefastech.com/user_api.php";
const form_id_url = "https://newsletter.thefastech.com/last_url.php";


// Event Listeners
 document.getElementById("submit_btn").addEventListener("click", submit_btn);


 // function calls
 function submit_btn(e){
 	e.preventDefault();
 	var email = document.getElementById("email").value;
 	var first_name = document.getElementById("first_name").value;
 	var last_name =document.getElementById("last_name").value;
  var phone_number =document.getElementById("phone_number").value;
 	var message = document.getElementById('message');
 	var re = /\S+@\S+\.\S+/;
 	
 	document.getElementById('message').innerText = 'Waiting For Response';

 	if(email == '' || first_name == '' || last_name == ''){
		message.innerText = 'Above Fields are Required';
		return;
 	}
 	if (!re.test(email)) {
    	message.innerText = "Email Format incorrect";
    	return;
  	}

  	var xhr = new XMLHttpRequest();
      xhr.open("POST", api_url, true);
      xhr.setRequestHeader("Content-Type", "application/json",'Access-Control-Allow-Origin: *');
      xhr.send(
        JSON.stringify({
        	email: email,
        	first_name: first_name,
        	last_name: last_name,
          phone_number: phone_number,
        })
      );

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          	var data = JSON.parse(xhr.response);
            if(data == null){
              alert('All forms Submitted');
            }
            else{
              var counter = 0;
              auto();
            }
            
        
        function auto(){
          	console.log(counter);
            var profile_link = data[counter].url;
            let params = {
              active: true,
              currentWindow: true,
            };
            chrome.tabs.query(params, gotTab);
            // alert(data.url);
            function gotTab(tabs) {
              let msg = {
              	state: 1,
                data: data[counter],
              };
            
              chrome.tabs.sendMessage(tabs[0].id, msg);
             
            }

            setTimeout(function(){
            	console.log('data0');
            	 var profile_link = data[counter].url;
	            let params = {
	              active: true,
	              currentWindow: true,
	            };
	            chrome.tabs.query(params, gotTab);
	            // alert(data.url);
	            function gotTab(tabs) {
	              let msg = {
	              	state: 2,
	                data: data[counter],
	                email: email,
        			    first_name: first_name,
        			    last_name: last_name,
                  phone_number: phone_number,
	              };
	            
	              chrome.tabs.sendMessage(tabs[0].id, msg);
	             
	            }

                var xhr1 = new XMLHttpRequest();
                xhr1.open("POST", form_id_url, true);
                xhr1.setRequestHeader("Content-Type", "application/json",'Access-Control-Allow-Origin: *');
                xhr1.send(
                  JSON.stringify({
                    email: email,
                    last_url: data[counter].id,
                  })
                );
                xhr1.onreadystatechange = function () {
                  if (xhr1.readyState == 4 && xhr1.status == 200) {
                      message.style.color = "red";
                      message.innerText = "Forms remaining" + xhr1.response;
                  }
                }


	            setTimeout(function(){
	            	counter++;
		            if(counter < data.length){
		            	auto();
		            }else{
                  alert('All forms Submitted');
                }
	            },3000);
	              	
            },3000);

          

         } 
            

           	message.style.color = "green";
          	message.innerText = "Submitted Successfully";
          	
        }
      };

 }