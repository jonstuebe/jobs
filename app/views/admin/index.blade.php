@section('content')

	<aside class="jobs-list">
		
		<ul>
			@foreach ($jobs as $job)
			<li>
				<a href="{{ url('job/'.$job->id) }}">
					<h2 class="title">{{ $job->position }}</h2>
					<h3 class="company">{{ $job->company->name }}</h3>
					<p class="location">{{ $job->location->city }}, {{ $job->location->state }}</p>
				</a>
			</li>
			@endforeach
		</ul>

	</aside>

@stop