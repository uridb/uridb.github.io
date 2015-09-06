
	Date.prototype.format = function (fmt) {
    var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	function load_more_posts(post_type, post_date) {
		var postsAPI = "/posts?type=" + post_type + "&date=" + post_date.getTime();
		postsAPI="example.json"
		$.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
		$.getJSON( postsAPI, function( data ) {
			$( "#all-posts" ).append('<h3 class="date"><i class="fa fa-calendar"></i> ' + post_date.format("yyyy-MM-dd") + '</h3>')
			$( "#all-posts" ).append('<div class="list-group posts" id="posts-' + post_date.format("yyyyMMdd") + '"></div>')
		
			  $.each( data.posts, function( i, post ) {
				$( "#posts-" + post_date.format("yyyyMMdd") ).append( '<div class="list-group-item post">\
							<div class="btn-group-vertical upvote">\
							<a title="点赞" class="btn btn-default" title="" href="/like"><i class="fa fa-thumbs-o-up"></i> <div class="count">' + post.likethis +'</div></a>\
						  </div>\
							 <div class="post-info" data-url="' + post.url + '">\
								<h3 class="title"><a target="_blank" href="' + post.url + '">测试测试</a></h3>\
								<div class="meta">' + post.meta + '</div>\
							  </div>\
							<div class="post-img-info">'
							+ ((post.img == null) ? '':'<img class="post-img" src="images/logos/' + post.img+ '" >') + '</div>\
						 </div>');
			  });
			  
			  post_date.setDate(post_date.getDate()-1);
			})  .fail(function( jqXHR, textStatus, errorThrown) {
				alert( errorThrown);
			  });
	}
		
	var post_date = new Date()
	load_more_posts(post_type,post_date);
	
	$( "#load-more" ).click(function() {
		load_more_posts(post_type, post_date);
	})
