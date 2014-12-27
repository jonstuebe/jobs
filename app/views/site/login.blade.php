@extends('layouts.admin')

@section('content')

	<div class="login-form">
		{{ Form::open() }}

		<p>
			<input type="text" name="username" placeholder="Username">
		</p>

		<p>
			<input type="password" name="password" placeholder="Password">
		</p>

		<p>
			{{ Form::submit('submit') }}
		</p>

		{{ Form::close() }}
	</div>

@stop