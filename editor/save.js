$(document).ready(function(){



	$('#btn-save').on('click', function(){
	

	
		$('#modal-content').html(`
		
		<a class="button grey" id="download">Download</a>
		
		
		`);
		
		
		$('#download').on('click', function(){
		
			var system = $('#system').html();
			
			$('#system').html('');
			
			let head = $('head').html();
			let body = $('body').html();
			
			let data = "<!DOCTYPE html><html>"+head+"</head><body>"+body+"</body></html>";
			
			
			$('#system').html(system);
			
			download(data, 'index.html', 'text/html');
			
		
		});
	
	});


	$('#save').on('click', function(){
		
		
		$('#editor').fadeOut('fast', function(){
		
		
			var system = $('#system').html();
			$('#system').html('');
			
			var head = $('head').html();
			var main = $('main').html();
			var body = $('body').html().replace(main, ''); // the rest of the body
			
			
			
			$.post(save_url, {site: site, page: page, head: head, body: body, main: main}, function( data ) {
			 
				
				console.log(data);
				
				$('#system').html(system);
				
				
			});
			
		});
		
		
	});
	
	

	
	



});


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
