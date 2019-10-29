$(document).ready(function(){


$('.system').append(`
<div id="save-modal" class="modal">

	<div class="modal-window">
		<div class="edit-header">Save<a onclick="$('#save-modal').fadeOut();" class="float-right"><i class="fa fa-times"></i></a></div>
		
		<div class="mod-content"></div>
	
	</div>

</div>
`);


	if (typeof save_path !== 'undefined') {
		
		$('#save-modal .mod-content').html(`
		<a class="button green" id="save">Save</a>
		`);
		
	}else{
	
		$('#save-modal .mod-content').html(`
		<a class="button grey" id="download">Download</a>
		`);
	
	}



	$('#btn-save').on('click', function(){
	

		
		$('#adder,#editor').fadeOut();
		
		
		
			$('#save-modal').fadeIn();
		
		
		
		$('#download').on('click', function(){
		
			let data = getCleanHtml();
			
			download(data, 'index.html', 'text/html');
			
			$('#save-modal').fadeOut();
			
			
		
		});
		
		
		
			$('#save').on('click', function(){
				
				
				
					let data = getCleanHtml();
				
				
					$.post(save_path, {site: site, page: page, html: data}, function( data ) {
					 
						
						console.log(data);
						
						$('#save-modal').fadeOut();
						
						
					});
					
			
				
				
			});
		
	
	});

	
	

	
	



});


function getCleanHtml(){


		let head = $('head').html();
		let body = $('body').html();
	
		$('body').append('<div id="temp" style="display: none;">'+body+'</div>');
	
	
		$('#temp .cog').remove();
		$('#temp .system').remove();
		
		$('#temp template').remove();
		$('#temp .app').remove();
		
		body = $('#temp').html();
		
		let data = "<!DOCTYPE html><html>"+head+"</head><body>"+body+"</body></html>";
		
		$('#temp').remove();
		
		return data;


}


function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
