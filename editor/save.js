$(document).ready(function(){


$('#dock').append(`<img src="${base_path}editor/img/save.png" id="btn-save" class="exclude grow" />`);

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
				
				
				let data = "\n\n<div class='"+main_class.replace('.', '')+"'>"+$(blocks_container).html()+"</div>\n\n";
				
				var head = $('head').html();
				
				if (typeof header_class !== 'undefined') {
				
				var header1 = "<div class='"+header_class.replace('.', '')+"'>"+$(header_class).html();+"</div>";
				
				}else{
				var header1 = "";
			
				}
				
				if (typeof footer_class !== 'undefined') {
				var footer = "<div class='"+footer_class.replace('.', '')+"'>"+$(footer_class).html()+"</div>\n\n</body>\n</html>";
				}else{	
				var footer = "";	
				}
				
				$.post(save_path, {site: site, page: page, html: data, head: head, header: header1, footer: footer}, function( data ) {
				 
					
					console.log(data);
					
					$('#save-modal').fadeOut();
					
					
				});
				
				/*
					let data = getCleanHtml();
					
					if (typeof nav_class !== 'undefined') {
					let nav = $(nav_class).html();
					}else{
					let nav = "";
					}
					
					if (typeof header_class !== 'undefined') {
					let header = $(header_class).html();
					}else{
					let header = "";
					}
					
					if (typeof footer_class !== 'undefined') {
					let footer = $(footer_class).html();
					}else{	
					let footer = "";	
					}
				
					$.post(save_path, {site: site, page: page, html: data, nav: nav, header: header, footer: footer}, function( data ) {
					 
						
						console.log(data);
						
						$('#save-modal').fadeOut();
						
						
					});
					
					*/
					
			
				
				
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
