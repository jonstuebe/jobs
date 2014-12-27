$(function() {

	$('#description').on('keyup', function(e){
		$('.job-preview .content').html( marked($(this).val()) );
	});

	$('.form-actions').on('click', 'button', function(e)
	{
		saveJob();
		e.preventDefault();
	});

	var cmd = false;
	$(document).on('keydown', function(e)
	{

		if($('.job-edit').length)
		{
			// saveJob();
		}

	});

	function saveJob()
	{
		var $preview = $('.job-edit');
		var fields = {
			company: $preview.find('.company input[type="text"]').val(),
			company_id: $preview.find('.company input[type="hidden"]').val(),
			category: $preview.find('.category input[type="text"]').val(),
			position: $preview.find('.position input[type="text"]').val(),
			location: $preview.find('.location input[type="text"]').val(),
			location_id: $preview.find('.location input[type="hidden"]').val(),
		};

		$.post('/job/' + $preview.data('id'), fields, function(data)
		{
			console.log('saved');
			$('.job-edit .company input[type="hidden"]').val(data.company_id);
			$('.job-edit .location input[type="hidden"]').val(data.location_id);
		});
	}

	var timer;
	$('.job-edit .complete').each(function(){
		$(this).data('val', $(this).val());
	});
	$('.job-edit').on('keyup', '.complete', function(e)
	{
		var $this = $(this),
			$autocomplete = $this.parent().find('.autocomplete');

		if(e.keyCode == 40) // down arrow key
		{
			if($autocomplete.find('li.selected').length)
			{
				var $selected = $autocomplete.find('li.selected');
				$selected.removeClass('selected');
				$selected.next().addClass('selected');
			}
			else
			{
				$autocomplete.find('li:first').addClass('selected');
			}
		}
		else if(e.keyCode == 38) // up arrow key
		{
			if($autocomplete.find('li.selected').length)
			{
				var $selected = $autocomplete.find('li.selected');
				$selected.removeClass('selected');
				$selected.prev().addClass('selected');
			}
		}
		else if(e.keyCode == 13) // return key
		{
			$autocomplete.parent().find('input[type="text"]').val( $autocomplete.find('li.selected').text() );
			$autocomplete.parent().find('input[type="hidden"]').val( $autocomplete.find('li.selected').data('id') );
			autocompleteClose();
		}
		else if($this.data('val') != $this.val())
		{
			$this.parent().find('input[type="hidden"]').val('');

			clearTimeout(timer);
			timer = setTimeout(function(){
				var query = { query: $this.val() };
				console.log(query);
				autocompleteSearch($this, query);
				$this.data('val', $this.val());
			}, 700);
		}
	});

	$('.job-edit').on('click', '.autocomplete li', function(e)
	{
		var input = $(this).parents('.autocomplete').parent().find('input[type="text"]');
		var $id = $(this).parents('.autocomplete').parent().find('input[type="hidden"]');

		input.val($(this).text());
		$id.val($(this).data('id'));

		autocompleteClose();
		e.preventDefault();
	});

	var autocompleteSearch = function(input, query)
	{
		var type = input.parent().attr('class');

		if(type == 'company') type = 'companies';
		if(type == 'location') type = 'locations';

		$.get('/api/v1/' + type, query, function(data){
			input.parent().find('.autocomplete ul').empty();
			if(data.length)
			{
				$.each(data, function()
				{
					if(type == 'companies')
					{
						input.parent().find('.autocomplete ul').append('<li data-id="' + this.id + '">' + this.name + '</li>');
					}
					else if(type == 'locations')
					{
						console.log(this);
						input.parent().find('.autocomplete ul').append('<li data-id="' + this.id + '">' + this.city + ', ' + this.state + '</li>');
					}
				});
				input.parent().find('.autocomplete ul li:first').addClass('selected');
				$('.autocomplete-overlay').addClass('show');
				input.parent().find('.autocomplete').addClass('open');
			}
		});
	}

	$('<div class="autocomplete-overlay"></div>').appendTo('body');
	var autocompleteClose = function()
	{
		$('.job-edit .autocomplete.open').removeClass('open');
		$('.autocomplete-overlay').removeClass('show');
	}

	$('body').on('click', '.autocomplete-overlay', autocompleteClose);

	$(window).on('load', function(){
		$('.job-preview .content').html( marked($('#description').val()) );
		$('.job-edit input[type="text"]:first').focus();
	});

	function resizeDescription()
	{
		$('.job-edit .description').css('height', $(window).height() - $('header.navigation').height() - (47 * 4) - (10 * 2) - 65 );
		$('.job-preview').css('height', $(window).height() - $('header.navigation').height() - 70 );
	}

	$(window).on('load resize', resizeDescription);
	resizeDescription();

});