var url="https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCh9hQ6K3jTCyBFk68WZtNoxob_3PW_kn4&maxResults=1"
var nextPage;
var prePage;
$(document).ready(function(){
	makeAJaxRequest();
	bindNextClick();
	bindPreClick();
})
function bindNextClick(){
	$('#next').click(function(e){
		e.preventDefault();
		url="https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCh9hQ6K3jTCyBFk68WZtNoxob_3PW_kn4&maxResults=1"
		url+="&pageToken="+nextPage;
		makeAJaxRequest();

	})
}
function bindPreClick(){
	$('#pre').click(function(e){
		e.preventDefault();
		url="https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCh9hQ6K3jTCyBFk68WZtNoxob_3PW_kn4&maxResults=1"
		url+="&pageToken="+prePage;
		makeAJaxRequest();
	})
}
function makeAJaxRequest(){
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'json',
		success: function(data){
			console.log(data);
			nextPage=data.nextPageToken;
			prePage=data.prevPageToken;
			if(nextPage !== undefined)
			{
				$('#next').show();
			}
			else{
				$('#next').hide();
			}
			if(prePage !== undefined)
			{
				$('#pre').show();
			}
			else{
				$('#pre').hide();
			}
			console.log(nextPage,prePage);

			var videoId=data.items[0].id.videoId;
			$('#video').attr('src','https://www.youtube.com/embed/'+videoId)
		},
		fail: function(){alert('Error!')}
	})
}