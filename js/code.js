var url="https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCh9hQ6K3jTCyBFk68WZtNoxob_3PW_kn4&maxResults=3&q="
var nextPage=''
var firstResult=true;
$(document).ready(function(){
	bindLinkClick();
	bindLoadMoreClick();
})
function bindLinkClick(){
	$('#searchLink').click(function(e){
		firstResult=true;
		e.preventDefault();
		fetchData();
		firstResult=false;
	})
}
function fetchData(){
	$('.loading').fadeIn();
	var qry=$('#txtSearch').val();
	if (nextPage!==undefined&&nextPage.length!==0)
	{
		qry+='&pageToken='+nextPage;
	}
	$.ajax({
		url: url+qry,
		type: 'get',
		datatype:  'jsonp',
		success: function(data){
			$('.loading').fadeOut();
			$('#loadMore').fadeIn();
			
			nextPage=data.nextPageToken;
			showResult(data)
		},
		fail:showError
	})
}
function showResult(data){
	$('#header').fadeIn();
	if(firstResult)
	{
		$('#result').html(formatData(data));
	}
	else{
		$('#result').append(formatData(data));
	}

	$('html, body').animate({ scrollTop: $("#loadMore").offset().top }, 2000);

}
function formatData(data){

	var html=''
	
	$.each(data.items,function(i,res){
		html+='<div class="row">'+
		'<div class="col-md-4">'+res.snippet.title+'</div>'+
		'<div class="col-md-4">'+res.snippet.description+'</div>'+
		'<div class="col-md-4"><a href="https://www.youtube.com/watch?v='+res.id.videoId+'" target="_blank" title="Watch"> <img class="img-thumbnail re-sized" src='+res.snippet.thumbnails.default.url+'></a></div>'+
		//uncomment this line and comment the previous line if you want to show the video in the same page
		// '<div class="col-md-4"><iframe width="130" height="100" src="https://www.youtube.com/embed/'+res.id.videoId+'"></iframe></div>'
		'</div>'

	})
	return html;
}
function showError(){
	$('.loading').fadeOut();
	alert(Error);
}
function bindLoadMoreClick(){
	$('#loadMore').click(function(e){
		e.preventDefault();
		fetchData();
	})
}