@section('content')

	<div class="job-edit" data-id="{{ $job->id or '' }}">
		
		<div class="position">
			<input type="text" name="position" placeholder="Position" tabindex="1" value="{{ $job->position or '' }}" />
		</div>

		<div class="category">
			<input type="text" name="category" placeholder="Category" tabindex="1" value="{{ $job->category or '' }}" />
		</div>

		<div class="company">
			<input type="text" name="company" class="complete" placeholder="Company" tabindex="2" value="{{ $job->company->name or '' }}" />
			<input type="hidden" name="company_id" value="{{ $job->company->id or '' }}" />
			<div class="autocomplete">
				<ul>
					
				</ul>
			</div>
		</div>

		<div class="location">
			<input type="text" name="location" class="complete" placeholder="Location" tabindex="3" value="{{ $city_state or '' }}" />
			<input type="hidden" name="location_id" value="{{ $job->location->id or '' }}" />
			<div class="autocomplete">
				<ul>
					
				</ul>
			</div>
		</div>

		<div class="description">
			<a href="#" class="help"></a>
			<textarea name="" id="description" cols="30" rows="10" tabindex="4" placeholder="Description">{{ $job->description or '' }}</textarea>
		</div>

	</div>
	<div class="job-preview">
		
		<p class="label">Preview</p>
		<div class="content"></div>

	</div>

	<div class="form-actions">
		<button>Save</button>
	</div>

@stop