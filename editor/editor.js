


$(document).ready(function(){


$('body').append('<div id="system"></div>');

$('#system').append(`

<div class="editor slide-left" id="adder">
	
	<div class="edit-header">Add Content <a onclick="$('#adder').fadeOut();" class="float-right"><i class="fa fa-times"></i></a></div>
	
	<div class="add-tab"></div>
	
</div>

<div class="editor slide-right" id="editor">

	<div class="edit-header">Edit <a onclick="$('#editor').fadeOut();" class="float-right"><i class="fa fa-times"></i></a></div>
	
	<div id="edit-content" class="edit-tab">

</div>


<div id="edit-image" class="edit-tab">


	<img id="original-Img" class="exclude" />
	<input id="upload-Image" type="file" onchange="loadImageFile();" style="display: none;" />
	
	<a class="button grey" onclick="$('#mode').text('replace');$('#upload-Image').click();">Replace image</a>
	
	
	<div id="mode" class="d-none"></div>

</div>


<div id="edit-settings" class="edit-tab">

	<label>Move</label>
	<div class="box">
	
	<a class="button no-margin split" id="moveup"><i class="fa fa-arrow-up"></i> &nbsp;Up</a><a class="button no-margin split" id="movedown"><i class="fa fa-arrow-down"></i> &nbsp;Down</a>
	
	</div>
	
	
	<label>Delete</label>
	<div class="box">
	
	<a class="button red no-margin" id="delete"><i class="fa fa-trash"></i> &nbsp;Delete</a>

</div>


</div>


<div class="pad">
	<a class="button green" id="done">Done</a>
</div>

</div>


<div id="modal">

<div id="modal-window">
	<div class="edit-header"><span id="modal-title"></span><a onclick="$('#modal').fadeOut();" class="float-right"><i class="fa fa-times"></i></a></div>
	
	<div id="modal-content"></div>

</div>

</div>


<div id="dock"><img src="editor/img/add.png" id="btn-add" class="exclude grow" /><img src="editor/img/save.png" id="btn-save" class="exclude grow" /></div>


`);


make_editable();
	
	
	
	
	$('#btn-add').on('click', function(){
	
		$('#modal').fadeOut();
	
		$('#adder').fadeIn();
	
	});
	
	$('#btn-save').on('click', function(){
	
		$('#adder,#editor').fadeOut();
	
		$('#modal-title').text('Save');
	
		$('#modal').fadeIn();
	
	});
	
	
	$('template').each(function(){
	
		var id = $(this).attr('id');
		var name = $(this).attr('data-name');
		var preview = $(this).attr('data-preview');
		
		if(typeof id !== 'undefined'){
		
			$('#adder .add-tab').append(`<a class="card" data-id="${id}"><img src="${preview}" class="exclude"><div class="card-label">${name}</div></a>`);
		}
	
	});
	
	$('#adder a.card').on('click', function(){
	
	
			var id = $(this).attr('data-id');
			
			var html = $('#'+id).html();
			
			$(blocks_container).prepend(html);
			
			make_editable();
		
		
			$('#adder').fadeOut();
			
			var e = $(blocks_container);
			
			$([document.documentElement, document.body]).animate({
				        scrollTop: $(e).offset().top
				    }, 500);
	
	});
	
	
	$('#done').on('click', function(){
	
		$('#editor').fadeOut('fast');
	
	});
	
	
	$('#delete').on('click', function(){
		
		$('.current-block').fadeOut(function(){
			
			$(this).remove();
			
		});
		
	});
	
	$('#movedown').on('click', function(){
	
		var e = $('.current-block');	
		// move down:
		e.next().insertBefore(e);
		
		$([document.documentElement, document.body]).animate({
		        scrollTop: $(e).offset().top
		    }, 500);
	
	});
	
	$('#moveup').on('click', function(){
	
		var e = $('.current-block');	
	
		e.prev().insertAfter(e);
		
		$([document.documentElement, document.body]).animate({
			        scrollTop: $(e).offset().top
			    }, 500);
		
	});
	
	
	
	
	

});


function make_editable(){

	$(editable+","+editable_img).not('.exclude').mouseenter(function() {
	    $(this).css('border', '1px solid lightblue');
	}).mouseleave(function() {
	    $(this).css('border', '1px solid transparent');
	});
	

	$(editable).on('click', function(e){
	
		
	
		$('.edit-tab').hide();
	
		$('.current').removeClass('current');
		$(this).addClass('current');
		
		var content = $(this).html();
		
		$('#edit-content').html('<textarea name="content" id="content"></textarea>');
		
		
		$('#content').html(content);
		$('#add-media').show();
		
		
		$('#editor').fadeIn();
		
		$('#content').richText(rte_config);
		
		$('#edit-content').show();
		
			$('.richText-editor').on('keyup', function(){
			
				$('.current').html($('.richText-editor').html());
				
			});
			
			$('.richText-btn').on('click', function(){
				
				window.setTimeout(function(){
				
				$('.current').html($('.richText-editor').html());
				
				},50);
				
			
			});
			
	
	});
	
	
	$(editable_img).not('.exclude').on('click', function(e){
	
	
		$('.edit-tab').hide();
	
		$('.current').removeClass('current');
		$(this).addClass('current');
		
		var content = $(this).attr('src');
		
	
		
		
		$('#original-Img').attr('src', content);
		
		$('#edit-image').show();
		
		$('#editor').fadeIn();
		
		
	
	});
	
	$('.cog').remove();
	
	$(blocks_tagname).each(function(){
		
		$(this).prepend('<img src="editor/img/cog.png" class="cog exclude" style="display: none;" />');
		
	});
	
	$(blocks_tagname).mouseenter(function() {
	    //$(this).css('border', '1px solid lightblue');
		
		$(this).children('.cog').show();
		
		
	}).mouseleave(function() {
	    //$(this).css('border', '1px solid transparent');
		
		$(this).children('.cog').hide();
		
	});
	
	
	$('.cog').on('click', function(){
	
		$('.current-block').removeClass('current-block');
		
		$(this).closest(blocks_tagname).addClass('current-block');
	
		$('.edit-tab').hide();
		
		$('#edit-settings').show();
		
		$('#editor').fadeIn();
	
	});
	
	
}	





!function(e){e.fn.richText=function(t){var a=e.extend({bold:!0,italic:!0,underline:!0,leftAlign:!0,centerAlign:!0,rightAlign:!0,justify:!0,ol:!0,ul:!0,heading:!0,fonts:!0,fontList:["Arial","Arial Black","Comic Sans MS","Courier New","Geneva","Georgia","Helvetica","Impact","Lucida Console","Tahoma","Times New Roman","Verdana"],fontColor:!0,fontSize:!0,imageUpload:!0,fileUpload:!0,videoEmbed:!0,urls:!0,table:!0,removeStyles:!0,code:!0,colors:[],fileHTML:"",imageHTML:"",translations:{title:"Title",white:"White",black:"Black",brown:"Brown",beige:"Beige",darkBlue:"Dark Blue",blue:"Blue",lightBlue:"Light Blue",darkRed:"Dark Red",red:"Red",darkGreen:"Dark Green",green:"Green",purple:"Purple",darkTurquois:"Dark Turquois",turquois:"Turquois",darkOrange:"Dark Orange",orange:"Orange",yellow:"Yellow",imageURL:"Image URL",fileURL:"File URL",linkText:"Link text",url:"URL",size:"Size",responsive:"Responsive",text:"Text",openIn:"Open in",sameTab:"Same tab",newTab:"New tab",align:"Align",left:"Left",justify:"Justify",center:"Center",right:"Right",rows:"Rows",columns:"Columns",add:"Add",pleaseEnterURL:"Please enter an URL",videoURLnotSupported:"Video URL not supported",pleaseSelectImage:"Please select an image",pleaseSelectFile:"Please select a file",bold:"Bold",italic:"Italic",underline:"Underline",alignLeft:"Align left",alignCenter:"Align centered",alignRight:"Align right",addOrderedList:"Add ordered list",addUnorderedList:"Add unordered list",addHeading:"Add Heading/title",addFont:"Add font",addFontColor:"Add font color",addFontSize:"Add font size",addImage:"Add image",addVideo:"Add video",addFile:"Add file",addURL:"Add URL",addTable:"Add table",removeStyles:"Remove styles",code:"Show HTML code",undo:"Undo",redo:"Redo",close:"Close"},youtubeCookies:!1,useSingleQuotes:!1,height:0,heightPercentage:0,id:"",class:"",useParagraph:!1},t),n=e(this);n.addClass("richText-initial");var i,r,l=e("<ul />"),o=e("<li />"),s=e("<a />",{class:"richText-btn","data-command":"bold",title:a.translations.bold,html:'<span class="fa fa-bold"></span>'}),d=e("<a />",{class:"richText-btn","data-command":"italic",title:a.translations.italic,html:'<span class="fa fa-italic"></span>'}),c=e("<a />",{class:"richText-btn","data-command":"underline",title:a.translations.underline,html:'<span class="fa fa-underline"></span>'}),p=e("<a />",{class:"richText-btn","data-command":"justifyFull",title:a.translations.justify,html:'<span class="fa fa-align-justify"></span>'}),h=e("<a />",{class:"richText-btn","data-command":"justifyLeft",title:a.translations.alignLeft,html:'<span class="fa fa-align-left"></span>'}),f=e("<a />",{class:"richText-btn","data-command":"justifyCenter",title:a.translations.alignCenter,html:'<span class="fa fa-align-center"></span>'}),u=e("<a />",{class:"richText-btn","data-command":"justifyRight",title:a.translations.alignRight,html:'<span class="fa fa-align-right"></span>'}),m=e("<a />",{class:"richText-btn","data-command":"insertOrderedList",title:a.translations.addOrderedList,html:'<span class="fa fa-list-ol"></span>'}),g=e("<a />",{class:"richText-btn","data-command":"insertUnorderedList",title:a.translations.addUnorderedList,html:'<span class="fa fa-list"></span>'}),v=e("<a />",{class:"richText-btn",title:a.translations.addHeading,html:'<span class="fa fa-header fa-heading"></span>'}),x=e("<a />",{class:"richText-btn",title:a.translations.addFont,html:'<span class="fa fa-font"></span>'}),T=e("<a />",{class:"richText-btn",title:a.translations.addFontColor,html:'<span class="fa fa-paint-brush"></span>'}),b=e("<a />",{class:"richText-btn",title:a.translations.addFontSize,html:'<span class="fa fa-text-height"></span>'}),w=e("<a />",{class:"richText-btn",title:a.translations.addImage,html:'<span class="fa fa-image"></span>'}),y=e("<a />",{class:"richText-btn",title:a.translations.addVideo,html:'<span class="fa fa-video-camera fa-video"></span>'}),C=e("<a />",{class:"richText-btn",title:a.translations.addFile,html:'<span class="fa fa-file-text-o far fa-file-alt"></span>'}),R=e("<a />",{class:"richText-btn",title:a.translations.addURL,html:'<span class="fa fa-link"></span>'}),S=e("<a />",{class:"richText-btn",title:a.translations.addTable,html:'<span class="fa fa-table"></span>'}),N=e("<a />",{class:"richText-btn","data-command":"removeFormat",title:a.translations.removeStyles,html:'<span class="fa fa-recycle"></span>'}),k=e("<a />",{class:"richText-btn","data-command":"toggleCode",title:a.translations.code,html:'<span class="fa fa-code"></span>'}),L=e("<div />",{class:"richText-dropdown-outer"}),A=e("<span />",{class:"richText-dropdown-close",html:'<span title="'+a.translations.close+'"><span class="fa fa-times"></span></span>'}),U=e("<ul />",{class:"richText-dropdown"}),F=e("<div />",{class:"richText-dropdown"}),D=e("<div />",{class:"richText-form"}),I=e("<div />",{class:"richText-form-item"}),H=e("<label />"),B=e("<input />",{type:"text"}),z=(e("<input />",{type:"file"}),e("<select />")),E=e("<button />",{text:a.translations.add,class:"btn"}),M="richText-"+Math.random().toString(36).substring(7),W=null,P=[];P[M]=[];var X=[];X[M]=0;var Y=U.clone();Y.append(e("<li />",{html:'<a data-command="formatBlock" data-option="h1">'+a.translations.title+" #1</a>"})),Y.append(e("<li />",{html:'<a data-command="formatBlock" data-option="h2">'+a.translations.title+" #2</a>"})),Y.append(e("<li />",{html:'<a data-command="formatBlock" data-option="h3">'+a.translations.title+" #3</a>"})),Y.append(e("<li />",{html:'<a data-command="formatBlock" data-option="h4">'+a.translations.title+" #4</a>"})),v.append(L.clone().append(Y.prepend(A.clone())));for(var G=a.fontList,O=U.clone(),Q=0;Q<G.length;Q++)O.append(e("<li />",{html:'<a style="font-family:'+G[Q]+';" data-command="fontName" data-option="'+G[Q]+'">'+G[Q]+"</a>"}));x.append(L.clone().append(O.prepend(A.clone())));var j=[24,18,16,14,12],V=U.clone();for(Q=0;Q<j.length;Q++)V.append(e("<li />",{html:'<a style="font-size:'+j[Q]+'px;" data-command="fontSize" data-option="'+j[Q]+'">Text '+j[Q]+"px</a>"}));b.append(L.clone().append(V.prepend(A.clone())));var _=U.clone();_.html(function(e){var t=[],n="";t["#FFFFFF"]=a.translations.white,t["#000000"]=a.translations.black,t["#7F6000"]=a.translations.brown,t["#938953"]=a.translations.beige,t["#1F497D"]=a.translations.darkBlue,t.blue=a.translations.blue,t["#4F81BD"]=a.translations.lightBlue,t["#953734"]=a.translations.darkRed,t.red=a.translations.red,t["#4F6128"]=a.translations.darkGreen,t.green=a.translations.green,t["#3F3151"]=a.translations.purple,t["#31859B"]=a.translations.darkTurquois,t["#4BACC6"]=a.translations.turquois,t["#E36C09"]=a.translations.darkOrange,t["#F79646"]=a.translations.orange,t["#FFFF00"]=a.translations.yellow,a.colors&&a.colors.length>0&&(t=a.colors);for(var i in t)n+='<li class="inline"><a data-command="'+e+'" data-option="'+i+'" style="text-align:left;" title="'+t[i]+'"><span class="box-color" style="background-color:'+i+'"></span></a></li>';return n}("forecolor")),T.append(L.clone().append(_.prepend(A.clone())));var q=F.clone(),$=D.clone().attr("id","richText-URL").attr("data-editor",M);$.append(I.clone().append(H.clone().text(a.translations.url).attr("for","url")).append(B.clone().attr("id","url"))),$.append(I.clone().append(H.clone().text(a.translations.text).attr("for","urlText")).append(B.clone().attr("id","urlText"))),$.append(I.clone().append(H.clone().text(a.translations.openIn).attr("for","openIn")).append(z.clone().attr("id","openIn").append(e("<option />",{value:"_self",text:a.translations.sameTab})).append(e("<option />",{value:"_blank",text:a.translations.newTab})))),$.append(I.clone().append(E.clone())),q.append($),R.append(L.clone().append(q.prepend(A.clone())));var K=F.clone(),J=D.clone().attr("id","richText-Video").attr("data-editor",M);J.append(I.clone().append(H.clone().text(a.translations.url).attr("for","videoURL")).append(B.clone().attr("id","videoURL"))),J.append(I.clone().append(H.clone().text(a.translations.size).attr("for","size")).append(z.clone().attr("id","size").append(e("<option />",{value:"responsive",text:a.translations.responsive})).append(e("<option />",{value:"640x360",text:"640x360"})).append(e("<option />",{value:"560x315",text:"560x315"})).append(e("<option />",{value:"480x270",text:"480x270"})).append(e("<option />",{value:"320x180",text:"320x180"})))),J.append(I.clone().append(E.clone())),K.append(J),y.append(L.clone().append(K.prepend(A.clone())));var Z=F.clone(),ee=D.clone().attr("id","richText-Image").attr("data-editor",M);a.imageHTML&&(e(a.imageHTML).find("#imageURL").length>0||"imageURL"===e(a.imageHTML).attr("id"))?ee.html(a.imageHTML):(ee.append(I.clone().append(H.clone().text(a.translations.imageURL).attr("for","imageURL")).append(B.clone().attr("id","imageURL"))),ee.append(I.clone().append(H.clone().text(a.translations.align).attr("for","align")).append(z.clone().attr("id","align").append(e("<option />",{value:"left",text:a.translations.left})).append(e("<option />",{value:"center",text:a.translations.center})).append(e("<option />",{value:"right",text:a.translations.right}))))),ee.append(I.clone().append(E.clone())),Z.append(ee),w.append(L.clone().append(Z.prepend(A.clone())));var te=F.clone(),ae=D.clone().attr("id","richText-File").attr("data-editor",M);a.fileHTML&&(e(a.fileHTML).find("#fileURL").length>0||"fileURL"===e(a.fileHTML).attr("id"))?ae.html(a.fileHTML):(ae.append(I.clone().append(H.clone().text(a.translations.fileURL).attr("for","fileURL")).append(B.clone().attr("id","fileURL"))),ae.append(I.clone().append(H.clone().text(a.translations.linkText).attr("for","fileText")).append(B.clone().attr("id","fileText")))),ae.append(I.clone().append(E.clone())),te.append(ae),C.append(L.clone().append(te.prepend(A.clone())));var ne=F.clone(),ie=D.clone().attr("id","richText-Table").attr("data-editor",M);function re(e,t,n){if(void 0===t&&(t=null),pe(n),"heading"===e&&se())he("<"+t+">"+se()+"</"+t+">");else if("fontSize"===e&&parseInt(t)>0){var i=se();i=(i+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br>$2"),he(a.useSingleQuotes?"<span style='font-size:"+t+"px;'>"+i+"</span>":'<span style="font-size:'+t+'px;">'+i+"</span>")}else document.execCommand(e,!1,t)}function le(){var t=e("#"+M),n=t.html();!0===a.useSingleQuotes&&(n=fe(n)),t.siblings(".richText-initial").val(n)}function oe(t,a,n){var i=document.getElementById(t),l=r;if(l||(l={start:0,end:0,type:"caret",editorID:t,anchor:e("#"+t).children("div")[0]}),l.editorID!==t)return!1;if(!0===a?i=l.anchor?l.anchor:i:!0===n&&0===l.start&&0===l.end&&(i=l.anchor?l.anchor:i),window.getSelection&&document.createRange){var o=0,s=document.createRange();if(!s||!i)return window.getSelection().removeAllRanges(),!0;s.setStart(i,0),s.collapse(!0);for(var d,c=[i],p=!1,h=!1;!h&&(d=c.pop());)if(3===d.nodeType){var f=o+d.length;!p&&l.start>=o&&l.start<=f&&(s.setStart(d,l.start-o),p=!0),p&&l.end>=o&&l.end<=f&&(s.setEnd(d,l.end-o),h=!0),o=f}else for(var u=d.childNodes.length;u--;)c.push(d.childNodes[u]);var m=window.getSelection();m.removeAllRanges(),m.addRange(s)}}function se(){var e;return window.getSelection?(e=window.getSelection()).toString()?e.toString():e.focusNode.nodeValue:!!document.selection.createRange&&(e=document.selection.createRange()).text}function de(t){!function(e,t){if(!P[t])return!1;P[t].length-1>X[t]&&(P[t].length=X[t]+1);P[t][P[t].length-1]!==e&&P[t].push(e);X[t]=P[t].length-1,ce(t)}(e(".richText-editor#"+t).siblings(".richText-initial").val(),t),r=function(t){var a,n,i,l=document.getElementById(t);if(window.getSelection&&document.createRange){var o=window.getSelection&&window.getSelection();if(o&&o.rangeCount>0&&e(o.anchorNode).parents("#"+t).length>0){var s=(a=window.getSelection().getRangeAt(0)).cloneRange();return s.selectNodeContents(l),s.setEnd(a.startContainer,a.startOffset),i=(n=s.toString().length)===n+a.toString().length?"caret":"selection",anchor=o.anchorNode,{start:n="caret"===i&&!1!==anchor?0:s.toString().length,end:"caret"===i&&!1!==anchor?0:n+a.toString().length,type:i,anchor:anchor,editorID:t}}}return r||{start:0,end:0}}(t)}function ce(e){X[e]<=0?i.find(".richText-undo").addClass("is-disabled"):i.find(".richText-undo").removeClass("is-disabled"),X[e]>=P[e].length-1||0===P[e].length?i.find(".richText-redo").addClass("is-disabled"):i.find(".richText-redo").removeClass("is-disabled")}function pe(e){r&&oe(e||r.editorID)}function he(e){var t,a;if(window.getSelection){if((t=window.getSelection()).getRangeAt&&t.rangeCount){(a=t.getRangeAt(0)).deleteContents();var n=document.createElement("div");n.innerHTML=e;for(var i,r,l=document.createDocumentFragment();i=n.firstChild;)r=l.appendChild(i);a.insertNode(l),r&&((a=a.cloneRange()).setStartAfter(r),a.collapse(!0),t.removeAllRanges(),t.addRange(a))}}else document.selection&&"Control"!==document.selection.type&&document.selection.createRange().pasteHTML(e)}function fe(e){return e?(!0===a.useSingleQuotes?(t=/\s+(\w+\s*=\s*(["][^"]*["])|(['][^']*[']))+/g,n=e.replace(t,function(e,t,a){return a?e.replace(a,a.replace(/\"/g,"'")):e})):(t=/\s+(\w+\s*=\s*(['][^']*['])|(["][^"]*["]))+/g,n=e.replace(t,function(e,t,a){return a?e.replace(a,a.replace(/'/g,'"')):e})),n):"";var t,n}function ue(t,a,n){var i=e("#"+t),l=i.siblings(".richText-initial"),o=l.val();if(!a||!o)return{start:0,end:0};if(!0===n)return r={start:i.text().length,end:i.text().length,editorID:t},oe(t),!0;a.node=l[0];for(var s={start:!1,end:!1,tag:!1,isTag:!1,tagsCount:0,isHighlight:a.start!==a.end},d=0;d<o.length;d++)"<"===o[d]?(s.isTag=!0,s.tag=!1,s.tagsCount++):!0===s.isTag&&">"!==o[d]?s.tagsCount++:!0===s.isTag&&">"===o[d]?(s.isTag=!1,s.tag=!0,s.tagsCount++):!0===s.tag&&(s.tag=!1),n||(a.start+s.tagsCount<=d&&s.isHighlight&&!s.isTag&&!s.tag&&!s.start?(a.start=d,s.start=!0):!(a.start+s.tagsCount<=d+1)||s.isHighlight||s.isTag||s.tag||s.start||(a.start=d+1,s.start=!0),a.end+s.tagsCount<=d+1&&!s.isTag&&!s.tag&&!s.end&&(a.end=d+1,s.end=!0));return function(e,t,a){if(e.createTextRange){var n=e.createTextRange();n.collapse(!0),n.moveStart("character",t),n.moveEnd("character",a),n.select(),e.focus()}else e.setSelectionRange?(e.focus(),e.setSelectionRange(t,a)):void 0!==e.selectionStart&&(e.selectionStart=t,e.selectionEnd=a,e.focus())}(a.node,a.start,a.end),a}function me(){i&&!i.find(".richText-editor").html()?!1!==a.useParagraph?i.find(".richText-editor").html("<p><br></p>"):i.find(".richText-editor").html("<div><br></div>"):!1!==a.useParagraph?i.find(".richText-editor").find("div:not(.videoEmbed)").replaceWith(function(){return e("<p />",{html:e(this).html()})}):i.find(".richText-editor").find("p").replaceWith(function(){return e("<div />",{html:e(this).html()})}),le()}return ie.append(I.clone().append(H.clone().text(a.translations.rows).attr("for","tableRows")).append(B.clone().attr("id","tableRows").attr("type","number"))),ie.append(I.clone().append(H.clone().text(a.translations.columns).attr("for","tableColumns")).append(B.clone().attr("id","tableColumns").attr("type","number"))),ie.append(I.clone().append(E.clone())),ne.append(ie),S.append(L.clone().append(ne.prepend(A.clone()))),function(){var t,r,L="";!1!==a.useParagraph&&document.execCommand("DefaultParagraphSeparator",!1,"p"),"TEXTAREA"===n.prop("blocks_tagname")||(n.val()?(t=n.val(),r=n.prop("attributes"),e.each(r,function(){this.name&&(L+=" "+this.name+'="'+this.value+'"')}),n.replaceWith(e("<textarea"+L+' data-richtext="init">'+t+"</textarea>")),(n=e('[data-richtext="init"]')).removeAttr("data-richtext")):n.html()?(t=n.html(),r=n.prop("attributes"),e.each(r,function(){this.name&&(L+=" "+this.name+'="'+this.value+'"')}),n.replaceWith(e("<textarea"+L+' data-richtext="init">'+t+"</textarea>")),(n=e('[data-richtext="init"]')).removeAttr("data-richtext")):(r=n.prop("attributes"),e.each(r,function(){this.name&&(L+=" "+this.name+'="'+this.value+'"')}),n.replaceWith(e("<textarea"+L+' data-richtext="init"></textarea>')),(n=e('[data-richtext="init"]')).removeAttr("data-richtext"))),i=e("<div />",{class:"richText"});var A=e("<div />",{class:"richText-toolbar"}),U=e("<div />",{class:"richText-editor",id:M,contenteditable:!0});if(A.append(l),!0===a.bold&&l.append(o.clone().append(s)),!0===a.italic&&l.append(o.clone().append(d)),!0===a.underline&&l.append(o.clone().append(c)),!0===a.leftAlign&&l.append(o.clone().append(h)),!0===a.centerAlign&&l.append(o.clone().append(f)),!0===a.rightAlign&&l.append(o.clone().append(u)),!0===a.justify&&l.append(o.clone().append(p)),!0===a.ol&&l.append(o.clone().append(m)),!0===a.ul&&l.append(o.clone().append(g)),!0===a.fonts&&a.fontList.length>0&&l.append(o.clone().append(x)),!0===a.fontSize&&l.append(o.clone().append(b)),!0===a.heading&&l.append(o.clone().append(v)),!0===a.fontColor&&l.append(o.clone().append(T)),!0===a.imageUpload&&l.append(o.clone().append(w)),!0===a.fileUpload&&l.append(o.clone().append(C)),!0===a.videoEmbed&&l.append(o.clone().append(y)),!0===a.urls&&l.append(o.clone().append(R)),!0===a.table&&l.append(o.clone().append(S)),!0===a.removeStyles&&l.append(o.clone().append(N)),!0===a.code&&l.append(o.clone().append(k)),U.html(n.val()),i.append(A),i.append(U),i.append(n.clone().hide()),n.replaceWith(i),i.append(e("<div />",{class:"richText-toolbar"}).append(e("<a />",{class:"richText-undo is-disabled",html:'<span class="fa fa-undo"></span>',title:a.translations.undo})).append(e("<a />",{class:"richText-redo is-disabled",html:'<span class="fa fa-repeat fa-redo"></span>',title:a.translations.redo})).append(e("<a />",{class:"richText-help",html:'<span class="fa fa-question-circle"></span>'}))),a.height&&a.height>0)i.children(".richText-editor, .richText-initial").css({"min-height":a.height+"px",height:a.height+"px"});else if(a.heightPercentage&&a.heightPercentage>0){var F=i.parent().innerHeight(),D=a.heightPercentage/100*F;D-=2*A.outerHeight(),D-=parseInt(i.css("margin-top")),D-=parseInt(i.css("margin-bottom")),D-=parseInt(i.find(".richText-editor").css("padding-top")),D-=parseInt(i.find(".richText-editor").css("padding-bottom")),i.children(".richText-editor, .richText-initial").css({"min-height":D+"px",height:D+"px"})}a.class&&i.addClass(a.class),a.id&&i.attr("id",a.id),me(),P[M].push(i.find("textarea").val())}(),i.find(".richText-help").on("click",function(){var t=e(this).parents(".richText");if(t){var n=e("<div />",{class:"richText-help-popup",style:"position:absolute;top:0;right:0;bottom:0;left:0;background-color: rgba(0,0,0,0.3);"}),i=e("<div />",{style:"position:relative;margin:60px auto;padding:20px;background-color:#FAFAFA;width:70%;font-family:Calibri,Verdana,Helvetica,sans-serif;font-size:small;"}),r=e("<div />",{html:'<span id="closeHelp" style="display:block;position:absolute;top:0;right:0;padding:10px;cursor:pointer;" title="'+a.translations.close+'"><span class="fa fa-times"></span></span>'});r.append('<h3 style="margin:0;">RichText</h3>'),r.append('<hr><br>Powered by <a href="https://github.com/webfashionist/RichText" target="_blank">webfashionist/RichText</a> (Github) <br>License: <a href="https://github.com/webfashionist/RichText/blob/master/LICENSE" target="_blank">AGPL-3.0</a>'),n.append(i.append(r)),t.append(n),n.on("click","#closeHelp",function(){e(this).parents(".richText-help-popup").remove()})}}),e(document).on("click",".richText-undo, .richText-redo",function(t){var a=e(this),n=a.parents(".richText");a.hasClass("richText-undo")&&!a.hasClass("is-disabled")?function(e){var t=e.children(".richText-editor").attr("id");if(X[t]--,!X[t]&&0!==X[t])return!1;var a=P[t][X[t]];e.find("textarea").val(a),e.find(".richText-editor").html(a),ce(t)}(n):a.hasClass("richText-redo")&&!a.hasClass("is-disabled")&&function(e){var t=e.children(".richText-editor").attr("id");if(X[t]++,!X[t]&&0!==X[t])return!1;var a=P[t][X[t]];e.find("textarea").val(a),e.find(".richText-editor").html(a),ce(t)}(n)}),e(document).on("input change blur keydown keyup",".richText-editor",function(t){if((9===t.keyCode||"9"===t.keyCode)&&"keydown"===t.type)return t.preventDefault(),function t(a,n){if(9!==n.keyCode)return!1;var i;if(a.getSelection&&(i=a.getSelection()).rangeCount>0){var r=null,l=null;if(n.shiftKey?(l="previous",r="TD"===i.focusNode.nodeName?null!=i.focusNode.previousSibling?i.focusNode.previousSibling:null!=i.focusNode.parentNode.previousSibling?i.focusNode.parentNode.previousSibling.childNodes[i.focusNode.parentNode.previousSibling.childNodes.length-1]:null:null!=i.focusNode.parentNode.previousSibling?i.focusNode.parentNode.previousSibling:null!=i.focusNode.parentNode.parentNode.previousSibling?i.focusNode.parentNode.parentNode.previousSibling.childNodes[i.focusNode.parentNode.parentNode.previousSibling.childNodes.length-1]:null):(l="next",r="TD"===i.focusNode.nodeName?null!=i.focusNode.nextSibling?i.focusNode.nextSibling:null!=i.focusNode.parentNode.nextSibling?i.focusNode.parentNode.nextSibling.childNodes[0]:null:null!=i.focusNode.parentNode.nextSibling?i.focusNode.parentNode.nextSibling:null!=i.focusNode.parentNode.parentNode.nextSibling?i.focusNode.parentNode.parentNode.nextSibling.childNodes[0]:null),null!=r)return i.collapse(r,Math.min(r.length,i.focusOffset+1)),null!=r.textContent&&i.selectAllChildren(r),n.preventDefault(),!0;if(null===r&&"next"===l&&"TD"===i.focusNode.nodeName){for(var o=e(i.focusNode).parents("table"),s=o.find("tr").first().children("td").length,d=e("<tr />"),c=e("<td />"),p=1;p<=s;p++)d.append(c.clone());o.append(d),t(window,{keyCode:9,shiftKey:!1,preventDefault:function(){}})}}return!1}(window,t),!1;me(),le(),de(e(this).attr("id"))}),e(document).on("contextmenu",".richText-editor",function(t){var a=e("<ul />",{class:"list-rightclick richText-list"}),n=e("<li />");e(".richText-editor").find(".richText-editNode").removeClass("richText-editNode");var i=e(t.target),r=i.parents(".richText"),l=r.find(".richText-toolbar"),o=t.pageX-r.offset().left,s=t.pageY-r.offset().top;return a.css({top:s,left:o}),"A"===i.prop("blocks_tagname")?(t.preventDefault(),a.append(n.clone().html('<span class="fa fa-link"></span>')),i.parents(".richText").append(a),a.find(".fa-link").on("click",function(){e(".list-rightclick.richText-list").remove(),i.addClass("richText-editNode");var t=l.find("#richText-URL");t.find("input#url").val(i.attr("href")),t.find("input#urlText").val(i.text()),t.find("select#openIn").val(i.attr("target")),l.find(".richText-btn").children(".fa-link").parents("li").addClass("is-selected")}),!1):"IMG"===i.prop("blocks_tagname")?(t.preventDefault(),a.append(n.clone().html('<span class="fa fa-image"></span>')),i.parents(".richText").append(a),a.find(".fa-image").on("click",function(){var t;t=i.parent("div").length>0&&"text-align:center;"===i.parent("div").attr("style")?"center":i.attr("align"),e(".list-rightclick.richText-list").remove(),i.addClass("richText-editNode");var a=l.find("#richText-Image");a.find("input#imageURL").val(i.attr("src")),a.find("select#align").val(t),l.find(".richText-btn").children(".fa-image").parents("li").addClass("is-selected")}),!1):void 0}),e(document).on("input change blur",".richText-initial",function(){!0===a.useSingleQuotes&&e(this).val(fe(e(this).val()));var t,n,i=e(this).siblings(".richText-editor").attr("id");t=e("#"+i),n=t.siblings(".richText-initial").val(),t.html(n),de(i)}),e(document).on("dblclick mouseup",".richText-editor",function(){de(e(this).attr("id"))}),e(document).on("click","#richText-Video button.btn",function(t){t.preventDefault();var n=e(this).parent(".richText-form-item").parent(".richText-form");if(n.attr("data-editor")===M){var i=n.find("input#videoURL").val(),r=n.find("select#size").val();if(i){var l;(l=function(e,t){var n=function(e){var t=e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/),a=e.match(/(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/),n=e.match(/(?:http?s?:\/\/)?(?:www\.)?(?:facebook\.com)\/.*\/videos\/[0-9]+/),i=e.match(/(?:http?s?:\/\/)?(?:www\.)?(?:dailymotion\.com)\/video\/([a-zA-Z0-9]+)/);{if(t&&11===t[2].length)return{platform:"YouTube",id:t[2]};if(a&&a[1])return{platform:"Vimeo",id:a[1]};if(n&&n[0])return{platform:"Facebook",id:n[0]};if(i&&i[1])return{platform:"Dailymotion",id:i[1]}}return!1}(e),i=!1,r=!1;if(!n)return!1;t?"responsive"!==t?t=t.split("x"):(i=!0,t=(t="640x360").split("x")):t=(t="640x360").split("x");var l="<br><br>";!0===i&&(l+='<div class="videoEmbed" style="position:relative;height:0;padding-bottom:56.25%">');var o="webkitallowfullscreen mozallowfullscreen allowfullscreen";if("YouTube"===n.platform){var s=a.youtubeCookies?"www.youtube.com":"www.youtube-nocookie.com";l+='<iframe src="https://'+s+"/embed/"+n.id+'?ecver=2" width="'+t[0]+'" height="'+t[1]+'" frameborder="0"'+(!0===i?' style="position:absolute;width:100%;height:100%;left:0"':"")+" "+o+"></iframe>",r=!0}else"Vimeo"===n.platform?(l+='<iframe src="https://player.vimeo.com/video/'+n.id+'" width="'+t[0]+'" height="'+t[1]+'" frameborder="0"'+(!0===i?' style="position:absolute;width:100%;height:100%;left:0"':"")+" "+o+"></iframe>",r=!0):"Facebook"===n.platform?(l+='<iframe src="https://www.facebook.com/plugins/video.php?href='+encodeURI(e)+"&show_text=0&width="+t[0]+'" width="'+t[0]+'" height="'+t[1]+'" style="'+(!0===i?'position:absolute;width:100%;height:100%;left:0;border:none;overflow:hidden"':"border:none;overflow:hidden")+'" scrolling="no" frameborder="0" allowTransparency="true" '+o+"></iframe>",r=!0):"Dailymotion"===n.platform&&(l+='<iframe frameborder="0" width="'+t[0]+'" height="'+t[1]+'" src="//www.dailymotion.com/embed/video/'+n.id+'"'+(!0===i?' style="position:absolute;width:100%;height:100%;left:0"':"")+" "+o+"></iframe>",r=!0);!0===i&&(l+="</div>");if(l+="<br><br>",r)return l;return!1}(i,r))?(a.useSingleQuotes,oe(M,!0),he(l),le(),n.find("input#videoURL").val(""),e(".richText-toolbar li.is-selected").removeClass("is-selected")):(n.prepend(e("<div />",{style:"color:red;display:none;",class:"form-item is-error",text:a.translations.videoURLnotSupported})),n.children(".form-item.is-error").slideDown(),setTimeout(function(){n.children(".form-item.is-error").slideUp(function(){e(this).remove()})},5e3))}else n.prepend(e("<div />",{style:"color:red;display:none;",class:"form-item is-error",text:a.translations.pleaseEnterURL})),n.children(".form-item.is-error").slideDown(),setTimeout(function(){n.children(".form-item.is-error").slideUp(function(){e(this).remove()})},5e3)}}),e(document).on("mousedown",function(t){var a=e(t.target);if(a.hasClass("richText-list")||0!==a.parents(".richText-list").length||(e(".richText-list.list-rightclick").remove(),a.hasClass("richText-form")||0!==a.parents(".richText-form").length||e(".richText-editNode").each(function(){var t=e(this);t.removeClass("richText-editNode"),""===t.attr("class")&&t.removeAttr("class")})),"IMG"===a.prop("blocks_tagname")&&a.parents("#"+M)){startX=t.pageX,startY=t.pageY,startW=a.innerWidth(),startH=a.innerHeight();a.offset().left;var n=a.offset().left+a.innerWidth(),i=a.offset().top+a.innerHeight(),r=(a.offset().top,!1);a.css({cursor:"default"}),startY<=i&&startY>=i-20&&startX>=n-20&&startX<=n&&((W=a).css({cursor:"nwse-resize"}),r=!0),!0!==r&&!W||W.data("width")?!0===r||W?t.preventDefault():W=null:(W.data("width",a.parents("#"+M).innerWidth()),W.data("height",3*a.parents("#"+M).innerHeight()),t.preventDefault())}}),e(document).mouseup(function(){W&&W.css({cursor:"default"}),W=null}).mousemove(function(e){if(null!==W){var t=W.data("width"),a=W.width(),n=W.data("height"),i=W.height();startW+e.pageX-startX<=t&&startH+e.pageY-startY<=n?(W.innerWidth(startW+e.pageX-startX),le()):startW+e.pageX-startX<=a&&startH+e.pageY-startY<=i&&(W.innerWidth(startW+e.pageX-startX),le())}}),e(document).on("click","#richText-URL button.btn",function(t){t.preventDefault();var n=e(this).parent(".richText-form-item").parent(".richText-form");if(n.attr("data-editor")===M){var i=n.find("input#url").val(),r=n.find("input#urlText").val(),l=n.find("#openIn").val();if(l||(l="_self"),r||(r=i),i){var o="";o=!0===a.useSingleQuotes?"<a href='"+i+"' target='"+l+"'>"+r+"</a>":'<a href="'+i+'" target="'+l+'">'+r+"</a>",oe(M,!1,!0);var s=e(".richText-editNode");s.length>0&&"A"===s.prop("blocks_tagname")?(s.attr("href",i),s.attr("target",l),s.text(r),s.removeClass("richText-editNode"),""===s.attr("class")&&s.removeAttr("class")):he(o),n.find("input#url").val(""),n.find("input#urlText").val(""),e(".richText-toolbar li.is-selected").removeClass("is-selected")}else n.prepend(e("<div />",{style:"color:red;display:none;",class:"form-item is-error",text:a.translations.pleaseEnterURL})),n.children(".form-item.is-error").slideDown(),setTimeout(function(){n.children(".form-item.is-error").slideUp(function(){e(this).remove()})},5e3)}}),e(document).on("click","#richText-Image button.btn",function(t){t.preventDefault();var n=e(this).parent(".richText-form-item").parent(".richText-form");if(n.attr("data-editor")===M){var i=n.find("#imageURL").val(),r=n.find("select#align").val();if(r||(r="center"),i){var l="";l=!0===a.useSingleQuotes?"center"===r?"<div style='text-align:center;'><img src='"+i+"'></div>":"<img src='"+i+"' align='"+r+"'>":"center"===r?'<div style="text-align:center;"><img src="'+i+'"></div>':'<img src="'+i+'" align="'+r+'">',oe(M,!0);var o=e(".richText-editNode");o.length>0&&"IMG"===o.prop("blocks_tagname")?(o.attr("src",i),o.parent("div").length>0&&"text-align:center;"===o.parent("div").attr("style")&&"center"!==r?(o.unwrap("div"),o.attr("align",r)):0!==o.parent("div").length&&"text-align:center;"===o.parent("div").attr("style")||"center"!==r?o.attr("align",r):(o.wrap('<div style="text-align:center;"></div>'),o.removeAttr("align")),o.removeClass("richText-editNode"),""===o.attr("class")&&o.removeAttr("class")):he(l),n.find("input#imageURL").val(""),e(".richText-toolbar li.is-selected").removeClass("is-selected")}else n.prepend(e("<div />",{style:"color:red;display:none;",class:"form-item is-error",text:a.translations.pleaseSelectImage})),n.children(".form-item.is-error").slideDown(),setTimeout(function(){n.children(".form-item.is-error").slideUp(function(){e(this).remove()})},5e3)}}),e(document).on("click","#richText-File button.btn",function(t){t.preventDefault();var n=e(this).parent(".richText-form-item").parent(".richText-form");if(n.attr("data-editor")===M){var i=n.find("#fileURL").val(),r=n.find("#fileText").val();if(r||(r=i),i){var l="";l=!0===a.useSingleQuotes?"<a href='"+i+"' target='_blank'>"+r+"</a>":'<a href="'+i+'" target="_blank">'+r+"</a>",oe(M,!0),he(l),n.find("input#fileURL").val(""),n.find("input#fileText").val(""),e(".richText-toolbar li.is-selected").removeClass("is-selected")}else n.prepend(e("<div />",{style:"color:red;display:none;",class:"form-item is-error",text:a.translations.pleaseSelectFile})),n.children(".form-item.is-error").slideDown(),setTimeout(function(){n.children(".form-item.is-error").slideUp(function(){e(this).remove()})},5e3)}}),e(document).on("click","#richText-Table button.btn",function(t){t.preventDefault();var n=e(this).parent(".richText-form-item").parent(".richText-form");if(n.attr("data-editor")===M){var i=n.find("input#tableRows").val(),r=n.find("input#tableColumns").val();(!i||i<=0)&&(i=2),(!r||r<=0)&&(r=2);var l="";l=!0===a.useSingleQuotes?"<table class='table-1'><tbody>":'<table class="table-1"><tbody>';for(var o=1;o<=i;o++){l+="<tr>";for(var s=1;s<=r;s++)l+="<td> </td>";l+="</tr>"}l+="</tbody></table>",oe(M,!0),he(l),n.find("input#tableColumns").val(""),n.find("input#tableRows").val(""),e(".richText-toolbar li.is-selected").removeClass("is-selected")}}),e(document).on("click",function(t){var a=e(t.target);if(0===a.parents(".richText-toolbar").length);else if(a.hasClass("richText-dropdown-outer"))a.parent("a").parent("li").removeClass("is-selected");else if(a.find(".richText").length>0)e(".richText-toolbar li").removeClass("is-selected");else if(a.parent().hasClass("richText-dropdown-close"))e(".richText-toolbar li").removeClass("is-selected");else if(a.hasClass("richText-btn")&&e(t.target).children(".richText-dropdown-outer").length>0)if(a.parent("li").addClass("is-selected"),a.children(".fa,svg").hasClass("fa-link")){oe(M,!1,!0);var n=se();a.find("input#urlText").val(""),a.find("input#url").val(""),n&&a.find("input#urlText").val(n)}else a.hasClass("fa-image")}),e(document).on("click",".richText-toolbar a[data-command]",function(t){var a,n=e(this),l=n.closest(".richText-toolbar").siblings(".richText-editor"),o=l.attr("id");if(l.length>0&&o===M&&(!n.parent("li").attr("data-disable")||"false"===n.parent("li").attr("data-disable"))){t.preventDefault();var s=e(this).data("command");if("toggleCode"===s)pe(a=l.attr("id")),i.find(".richText-editor").is(":visible")?(i.find(".richText-initial").show(),i.find(".richText-editor").hide(),e(".richText-toolbar").find(".richText-btn").each(function(){0===e(this).children(".fa-code").length&&e(this).parent("li").attr("data-disable","true")}),ue(a,r)):(i.find(".richText-initial").hide(),i.find(".richText-editor").show(),ue(a,r,!0),e(".richText-toolbar").find("li").removeAttr("data-disable"));else{var d=null;e(this).data("option")&&(d=e(this).data("option").toString()).match(/^h[1-6]$/)&&(s="heading"),re(s,d,o),"removeFormat"===s&&(l.find("*").each(function(){var t=["id","class","name","action","method","src","align","alt","title","style","webkitallowfullscreen","mozallowfullscreen","allowfullscreen","width","height","frameborder"],a=e(this),n=e.map(this.attributes,function(e){return e.name});e.each(n,function(e,n){t.indexOf(n)<0&&"data-"!==n.substr(0,5)&&a.removeAttr(n)}),"A"===a.prop("blocks_tagname")&&a.replaceWith(function(){return e("<span />",{html:e(this).html()})})}),re("formatBlock","div",o)),l.find("div:empty,p:empty,li:empty,h1:empty,h2:empty,h3:empty,h4:empty,h5:empty,h6:empty").remove(),l.find("h1,h2,h3,h4,h5,h6").unwrap("h1,h2,h3,h4,h5,h6")}}n.parents("li.is-selected").removeClass("is-selected")}),e(this)},e.fn.unRichText=function(t){var a,n,i=e.extend({delay:0},t),r=e(this);function l(){n.find(".richText-toolbar").remove(),n.find(".richText-editor").remove(),a.unwrap(".richText").data("editor","richText").removeClass("richText-initial").show()}!function(){if(r.hasClass("richText")?n=r:(r.hasClass("richText-initial")||r.hasClass("richText-editor"))&&(n=r.parents(".richText")),!n)return!1;n.find(".richText-editor"),a=n.find(".richText-initial"),parseInt(i.delay)>0?setTimeout(l,parseInt(i.delay)):l()}()}}(jQuery);


var fileReader = new FileReader();
var filterType = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

fileReader.onload = function (event) {
  var image = new Image();
  
  image.onload=function(){
      document.getElementById("original-Img").src=image.src;
      var canvas=document.createElement("canvas");
      var context=canvas.getContext("2d");
      canvas.width=image.width/2;
      canvas.height=image.height/2;
      context.drawImage(image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvas.width,
          canvas.height
      );
      
	  var mode = $('#mode').text();
	  
  	if(mode=='replace'){
  		$('.current').attr('src', canvas.toDataURL());
	}else{
	
		var src = canvas.toDataURL();
		
		$('.current').after(`<img src="${src}" class="img-fluid" />`);
		
		make_editable();
	
	}
	
	
	
  }
  image.src=event.target.result;
};

var loadImageFile = function () {
  var uploadImage = document.getElementById("upload-Image");
  
  //check and retuns the length of uploded file.
  if (uploadImage.files.length === 0) { 
    return; 
  }
  
  //Is Used for validate a valid file.
  var uploadFile = document.getElementById("upload-Image").files[0];
  if (!filterType.test(uploadFile.type)) {
    alert("Please select a valid image."); 
    return;
  }
  
  fileReader.readAsDataURL(uploadFile);
}



rte_config = {
	
  // text formatting
  bold: true, italic: true, underline: false,

  // text alignment
  leftAlign: false, centerAlign: false, rightAlign: false, justify: false,

  // lists
  ol: false, ul: true,

  // title
  heading: false, fonts: false, fontColor: false, fontSize: false,

  // uploads
  imageUpload: false, fileUpload: false,

  // media
  videoEmbed: false, urls: true, table: false,

  // code
  removeStyles: false, code: true,

  // dev settings
  useSingleQuotes: false,
  height: 0,
  heightPercentage: 0,
  id: "",
  class: "",
  useParagraph: false
  
 }
