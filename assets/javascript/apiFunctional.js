$(document).ready(function(){
var typesOfcats = ['funny', 'sad', 'wacky', 'wet', 'feral', 'happy', 'fat', 'scared', 'hungry', 'playful'];
	function toggleGif(){
		 if($(this).attr('src') == $(this).data('still')){
		$(this).attr('src', $(this).data('gif') );
		}else $(this).attr('src', $(this).data('still'));
	}
	function displayKittyInfo(){

		var kitty = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + kitty + "+cat" + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";
		
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			console.log(queryURL);
			console.log(response);
			$('#catGifs').empty();
			for (var i = 0; i< response.data.length; i++){
				var div = $('<div>')
				var image = $('<img>');
				image.addClass('catGif')
				image.attr('src', response.data[i].images.fixed_height_still.url);
				image.attr('data-gif', response.data[i].images.downsized_medium.url);
				image.attr('data-still', response.data[i].images.fixed_height_still.url)
				var rating = response.data[i].rating;
				var ratingTag = $('<h2>');
				ratingTag.text('Rating: ' + rating);
				div.prepend(ratingTag);
				div.append(image);
				$('#catGifs').append(div);
				

				// console.log(image);
			};
		});
	}
	function renderButtons(){

		$('#catsView').empty();

		for (var i = 0; i <typesOfcats.length; i++){

			var a = $('<button>')
			a.addClass('typeOfCat');
			a.attr('data-name', typesOfcats[i]);
			a.text(typesOfcats[i]);
			$('#catsView').append(a);
		}
	}

	$('#addCat').on('click', function(){

			var cat = $('#cat-input').val().trim();

			typesOfcats.push(cat);

			renderButtons();

			return false; 
	})

	$(document).on('click', '.typeOfCat', displayKittyInfo);
	$(document).on('click', '.catGif', toggleGif);
	renderButtons();

});