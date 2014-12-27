var hashChange = function()
{
	var hash = window.location.hash.replace('#!/','').split('/');
	if(hash[0] != "")
	{
		loadJobs(hash);
	}
	else
	{
		loadJobs(false);
	}
}

var createJobs = function(data)
{
	var render = function(jobData, single)
	{
		var $jobs = $('.jobs-board');
		var jobSingle = '<div class="jobs-board-job jobs-board-job-single"><h1 class="title">{{position}}</h1><div class="body">{{{description}}}</div></div>',
			job = '<div class="jobs-board-job"><h1><a href="#!/{{category_slug}}/{{slug}}/">{{position}}</a></h1><div class="body">{{{description}}}</div></div>';

		if(single)
		{
			template = Handlebars.compile(jobSingle);
		}
		else
		{
			template = Handlebars.compile(job);
		}

		jobData.description = marked(jobData.description);
		var $job = $(template(jobData));
			

		$jobs.append($job);
	}

	if(data.length > 1)
	{
		$.each(data, function()
		{
			render(this);
		});
	}
	else
	{
		render(data, true);
	}
}

var loadJobs = function(hash)
{
	var $jobs = $('.jobs-board'),
		sendData = {},
		apiPath = 'jobs';
	
	$jobs.empty();

	if(hash && hash[1])
	{
		var category = hash[0],
			slug = hash[1];

		sendData.category = category;
		sendData.slug = slug;
		apiPath = 'job';
	}

	sendData.site = $jobs.data('site');

	$.ajax('//jo.bs/api/v1/' + apiPath,
	{
		dataType: 'jsonp',
		data: sendData
	})
	.success(createJobs);
}

var callback = function()
{
	$(window).on('hashchange', hashChange);
	hashChange();
	var $jobs = $('.jobs-board');
	if($jobs.data('transparent'))
	{
		$jobs.addClass('jobs-board-transparent');
	}

	if($jobs.data('styles'))
	{
		var head = document.getElementsByTagName('head')[0];
	    var style = document.createElement('link');
	    style.rel = 'stylesheet';
	    style.href = '//jo.bs/assets/css/embed.css';
	    head.appendChild(style);
	}
};

var checkLoaded = function()
{
	document.jobsLoaded++;
	if(document.jobsLoaded == 3) callback();
}

var docReady = function()
{
	document.jobsLoaded = 0;

	if(!window.jQuery)
	{
		var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = '//jo.bs/assets/vendor/jquery/js/jquery.js';
	    script.onreadystatechange = checkLoaded;
	    script.onload = checkLoaded;
	    head.appendChild(script);
	}
	else
	{
		checkLoaded();
	}

    var head = document.getElementsByTagName('head')[0];
    var handlebarsScript = document.createElement('script');
    handlebarsScript.type = 'text/javascript';
    handlebarsScript.src = '//jo.bs/assets/vendor/handlebars/js/handlebars.js';
    handlebarsScript.onreadystatechange = checkLoaded;
    handlebarsScript.onload = checkLoaded;
    head.appendChild(handlebarsScript);

    var head = document.getElementsByTagName('head')[0];
    var marked = document.createElement('script');
    marked.type = 'text/javascript';
    marked.src = '//jo.bs/assets/vendor/marked/js/marked.js';
    marked.onreadystatechange = checkLoaded;
    marked.onload = checkLoaded;
    head.appendChild(marked);
};

var bindReady = function(){

    // Mozilla, Opera and webkit nightlies currently support this event
    if ( document.addEventListener ) {
        // Use the handy event callback
        document.addEventListener( "DOMContentLoaded", function(){
            document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
            docReady();
        }, false );

    // If IE event model is used
    } else if ( document.attachEvent ) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                document.detachEvent( "onreadystatechange", arguments.callee );
                docReady();
            }
        });

        // If IE and not an iframe
        // continually check to see if the document is ready
        if ( document.documentElement.doScroll && window == window.top ) (function(){
            if ( jQuery.isReady ) return;

            try {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            } catch( error ) {
                setTimeout( arguments.callee, 0 );
                return;
            }

            // and execute any waiting functions
            docReady();
        })();
    }
};

bindReady();