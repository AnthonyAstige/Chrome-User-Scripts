// ==UserScript==
// @name           PNR Spaces
// @namespace      http://unitedflightcrew.com
// @match        https://united.intranet.ual.com/weblist/weblist/do/searchFlights*
// @match        https://united.intranet.ual.com/weblist/weblist/do/load?*
// ==/UserScript==

// Add jQuery
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://anthonysweb.com/js/jquery-latest.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function addSpaceAvailble(){
	$('table tr').each(function(){
		var space = 0;
		var seats = 0;
		var foundLoads = false;
		$(this).find('td.text2').each(function(){
			var text = $(this).html();
			if(-1 != text.search(/[0-9]{1,3}\-[0-9]{1,3}\-[0-9]{1,3}/)){
				foundLoads = true;
//				console.log(text);
				
				var dashA = text.indexOf('-');
				var dashB = text.lastIndexOf('-');
				var end = text.lastIndexOf('&');
				
				var cap = Number(text.substr(0, dashA));
//				console.log(cap);
				
				var bkd = Number(text.substr(dashA+1, dashB-dashA-1));
//				console.log(bkd);
				
				var nrsa = Number(text.substr(dashB+1, end-dashB-1));
//				console.log(nrsa);
				
				space += cap - bkd - nrsa;
				seats += cap;
			}
		});
		if(foundLoads){
			var percent = (space/seats) * 100;
			color = (space>0?"green":"red");
			$(this).append('<td class="text2" style="color: '+color+';">&nbsp;' +space+ '&nbsp;/&nbsp;' +seats+ '&nbsp;(' +percent.toFixed(1)+'%)&nbsp;</td>');
		}
	});
}

addJQuery(addSpaceAvailble);