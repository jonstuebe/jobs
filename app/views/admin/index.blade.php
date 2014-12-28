@section('content')
	
	<!-- <div class="jobs-sort">
		
		<div class="buttons">
			<button class="list">list</button>
			<button class="grid">grid</button>
		</div>

	</div> -->
	<div class="jobs-list">
		
		<ul>
			@foreach ($jobs as $job)
			<li>
				<a href="{{ url('job/'.$job->id) }}" data-id="{{ $job->id }}">
					<span class="top-image" style="background-image: url(/assets/images/rr-phoenix.jpg);">
						<span class="label"><strong>{{ $job->position }}</strong></span>
					</span>
					<span class="text">
						<h3 class="company">{{ $job->company->name }}</h3>
						<p class="location"><strong>{{ $job->location->city }}, {{ $job->location->state }}</strong></p>
						<p class="type">{{ $job->type }}@if($job->remote == 1) (remote)@endif</p>
					</span>
				</a>
			</li>
			@endforeach
		</ul>

	</div>

@stop