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
    var url = urls[0];
    jQuery.support.cors = true;
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify($('#registerDonor').serializeObject()),
        success: function (data) {
            alert('asda' + data);
            if(data.id!=null)
            {
                alert('asd');
                window.localStorage.setItem("DonorId",data.id);
            }
        }
    });

    return false; 
    
    
}

function getDonorSettings(id)
{
    var url = urls[0];
     $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        data: id,
        success: function (data) {
            alert(data);
        }
    });
}