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
		if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
			if($('.job-edit').length)
			{
				saveJob();
			}
			e.preventDefault();	
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
			description: $preview.find('.description textarea').val(),
			location_id: $preview.find('.location input[type="hidden"]').val(),
		};

		var job_id = ($preview.data('id') != "") ? $preview.data('id') : "add";

		$.post('/job/' + job_id, fields, function(data)
		{
			if(data.id)
			{
				if(history.pushState) history.pushState({}, "", data.id);
				$('.job-edit .company input[type="hidden"]').val(data.company_id);
				$('.job-edit .location input[type="hidden"]').val(data.location_id);
				console.log('job saved');

				$('.form-actions .saved').addClass('show');
				setTimeout(function() {
					$('.form-actions .saved').removeClass('show');
				}, 1000);
			}
			else
			{
				alert("something went wrong");
			}
		});
	}

	var timer;
	$('.job-edit .complete').each(function(){
		$(this).data('val', $(this).val());
	});
	$('.job-edit').on('keydown', 'input[type="text"], textarea', function()
	{
		$(this).parent().find('label').addClass('show');
	});
	$('.job-edit .input').each(function()
	{
		var $this = $(this);

		if($this.find('input, textarea').val() != "")
		{
			$this.find('label').addClass('show');
		}
	})
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
		var type = input.parent().data('type');

		$.get('/api/v1/' + type, query, function(data){
			input.parent().find('.autocomplete ul').empty();
			if(data.length)
			{
				var skip = false;
				if(type == 'companies')
				{
					if(data.length == 1 && data[0]['name'] == query.query)
					{
						skip = true;
					}
				}
				else if(type == 'locations')
				{
					var _query = query.query.split(', ');
					if(data.length == 1 && data[0]['city'] == _query[0] && data[0]['state'] == _query[1])
					{
						skip = true;
					}
				}

				console.log('skip', skip);

				if(skip != true)
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
				else
				{
					autocompleteClose();
				}
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
		if($('.job-edit').length)
		{
			$('.job-preview .content').html( marked($('#description').val()) );
			$('.job-edit input[type="text"]:first').focus();
		}
	});

	function resizeDescription()
	{
		$('.job-edit .description').css('height', $(window).height() - $('header.navigation').height() - (47 * 4) - (10 * 2) - 65 );
		$('.job-preview').css('height', $(window).height() - $('header.navigation').height() - 70 );
	}

	$(window).on('load resize', resizeDescription);
	resizeDescription();

});