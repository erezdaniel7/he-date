$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "js/menu.xml",
		//url: "js/menu_full_url.xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find('link').each(function(){
				var id = $(this).attr('id');
				var title = $(this).find('title').text();
				var url = $(this).find('url').text();
				var element;
				if (typeof(thisPageId)!== 'undefined' && thisPageId==id) 
					element=$('<span id="menu_'+id+'"></span>');
				else
					element=$('<a href="'+url+'" id="menu_'+id+'"></a>');
				element.html(title);
				element.appendTo('#topbar>.menu');
			});
		}
	});
	if (typeof(today)=== 'undefined')
		var today = new HeDate(new Date());
	$('#topbar>.today').html(today.toString());
	

});


//google analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-40802224-1', 'he-date.info');
  ga('send', 'pageview');

