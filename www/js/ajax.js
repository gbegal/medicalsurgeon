var apiUrl='https://app82.center5.com/c5/REST/ShuttleMapping/';
var api_token=false;
var reauth=false;

function chnageImagesrc(class_name)
{
	var img_name = 'images/'+class_name+'.jpg';
	$('#first_img').attr('src',img_name);
}

function arrToString(arr)
{

	var str='';
	var strArr=[];
	for(var obj in arr)
	{
		strA=obj+'='+arr[obj];
		strArr.push(strA);
		
	}
	str=strArr.join("&");


	return str;
}

function apiCall(method,postddata){
//alert('method API call'+method);
	var params;
	params=arrToString(postddata);
	//var uri=apiUrl+method+'?'+params;
	$.ajaxSetup({timeout: 45*1000});
	var uri=apiUrl+'?method='+method+'&'+params;
	console.log(uri);
	$.getJSON(uri,function(data)
			{
				console.log('Call Data:');
				console.log(data);
				switch(method)
				{
					case 'authenticate_vehicle':
					setToken(data,postddata);
					if(autoLoginVar)
										{
							//  app.showAlert('autologin authenticate..');
					// sending all offline submisions
						syncWithServer();
					}
					else
				{

					if(data.success=='Yes')
					{
						syncRoutesOnLogin=true;
					    //sync with server all data from the db when login is successful
					    
						syncWithServer();
						
						/*new Route List call*/
						authen_PID=data.provider_id;
                        var data={'Token':api_token , 'Client':'TEST+CLIENT+1' , 'ProviderID':data.provider_id};
                        apiCall('ListRoutes',data);						
					}					
                    else
                    {
                            app.showAlert(data.message);
                            $('#login').text('Login').attr('disabled',false);
                  }
			}
					
					break;                        
				}
               

			})
			.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error ;
			console.log( "Request Failed: " + err + '--' +jqxhr.responseText + jqxhr.getAllResponseHeaders());
			$('#login').text('Login').attr('disabled',false);
			alert("Application is Off-Line at the moment");

		});

}


function setToken(data,postddata)
{

	if(data.success=='Yes')
	{
		api_token=data.token;
		var now= new Date();
        var users={'user_id':postddata.user_id,'password':postddata.password , 'sessionDate': now };
		window.localStorage.setItem("userdetail", JSON.stringify(users));
        
	}
}

function scroll2Top()
{
	
		$('body').animate({ scrollTop: 0 }, "slow","linear", function() {
		//alert( "all done" );
		});
		
      
		
}

function deviceIDGenerate(){

// alert('ok');
    var devID = window.localStorage.getItem("BTappDeviceID");
	// alert(devID);
	if($.isEmptyObject(devID)){
		d=new Date();
		// alert(d);
		var gID=d.getMonth()+1+'/'+d.getDate()+'/'+d.getFullYear()+' '+d.getHours() +':'+ d.getMinutes() +':'+ d.getSeconds()+' '+makeid();
		//alert(gID);

		window.localStorage.setItem("BTappDeviceID",gID );
	};


		return  window.localStorage.getItem("BTappDeviceID");
}