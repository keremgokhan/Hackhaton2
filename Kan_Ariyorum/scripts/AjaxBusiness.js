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
    alert(JSON.stringify($('#registerDonor').serializeObject()));
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify($('#registerDonor').serializeObject()),
        success: function (data) {
           
            alert(data);
        }
    });

    return false; 
    
    
}