@extends('layouts.admin')

@section('content')

	<div class="login-form">
		{{ Form::open() }}

		<p>
			<label for="username">Username</label>
			<input type="text" name="username" id="username" />
		</p>

		<p>
			<label for="password">Password</label>
			<input type="password" name="password" id="password" />
		</p>

		<p>
			{{ Form::submit('submit') }}
		</p>

		{{ Form::close() }}
	</div>

@stop