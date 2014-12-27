@section('content')

	<aside class="jobs-list">
		
		<ul>
			@foreach ($jobs as $job)
			<li>
				<a href="{{ url('job/'.$job->id) }}" data-id="{{ $job->id }}">
					<p><strong>{{ $job->company->name }}</strong> is looking for a <strong>{{ $job->position }}</strong></p>
					<p class="location">in <strong>{{ $job->location->city }}, {{ $job->location->state }}</strong></p>
				</a>
			</li>
			@endforeach
		</ul>

	</aside>

@stop