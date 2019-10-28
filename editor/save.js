$(document).ready(function(){



	$('#btn-save').on('click', function(){
	

		if (typeof save_path !== 'undefined') {
			
			$('#modal-content').html(`
			<a class="button green" id="save">Save</a>
			`);
			
		}else{
		
			$('#modal-content').html(`
			<a class="button grey" id="download">Download</a>
			`);
		
		}
		
		
		$('#download').on('click', function(){
		
			let data = getCleanHtml();
			
			download(data, 'index.html', 'text/html');
			
			$('#modal-window').fadeOut();
			
			
		
		});
		
		
		
			$('#save').on('click', function(){
				
				
				
					let data = getCleanHtml();
				
				
					$.post(save_path, {site: site, page: page, html: data}, function( data ) {
					 
						
						console.log(data);
						
						$('#modal-window').fadeOut();
						
						
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
