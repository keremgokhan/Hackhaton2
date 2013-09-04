var urls= ["http://kanariyorum.azurewebsites.net/api/Donors"]

$.fn.serializeObject = function () {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };


function registerDonorSubmit (){
        app.showLoading();
    var url = urls[0];
    var id=window.localStorage.getItem('DonorId');
    jQuery.support.cors = true;
	var options = {type: "POST",
		url: url,
		contentType: "application/json",
		data: JSON.stringify($('#registerDonor').serializeObject()),success: function (incoming) {
			if(incoming==null){
                app.navigate("#:back");
            }
            else if (incoming.id != null) {
				window.localStorage.setItem("DonorId", incoming.id);
                window.localStorage.setItem('Badges',1);
				  app.hideLoading();
                app.navigate(
					'mainMenu.html',
					'slide:right'
					);
                
			}
            else
            {
                  app.hideLoading();
                app.navigate("#:back");
                 var dId = window.localStorage.getItem("DonorId");
            if(dId!=null)
                getDonorSettings(dId);
                
            }
		}};
    
    if(global.isEditing)
    {
        options.type="PUT";
        options.url = options.url + "/" + id;
        
    }
    $.ajax(options);
    global.isEditing=false;
	return false; 
    
    
}

function getDonorSettings(id)
{
       app.showLoading();
    var url = urls[0] + "/" + id;
     $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        success: function (data) {
            var nameSurname = data.Name + " " + data.Surname;
            var sex,rh;
            
            switch(data.Sex)
            {
                case true:
                    sex="Female";
                    break;
                case false:
                    sex="Male";
                    break;
            }
            switch(data.RHFactor)
            {
                case true:
                    rh="RH+";
                    break;
                case false:
                    rh="RH-";
                    break;
            }
            
            var birthYear = data.BirthYear;
            
            var bloodType = data.BloodType + " " + rh; 
            
            
            $('#lblNameSurname').text(nameSurname);
            $('#lblDogumYili').text(birthYear);
            $('#lblCinsiyet').text(sex);
            $('#lblKan').text(bloodType);
            app.hideLoading();
        }
    });
}

function searchForDonors(){
    var rad = $('#rad').val();
    openMap(rad);
    
        
}
