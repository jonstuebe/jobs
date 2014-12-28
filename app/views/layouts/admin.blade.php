<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Jobs</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,400,700,600,300,800' rel='stylesheet' type='text/css' />
	<link rel="stylesheet" href="/assets/css/screen.css" />

</head>
<body>
	
	<div class="outer-container">
		<div class="header-placeholder"></div>
		<div class="header-nav">
			<div class="header-nav-wrap">
				<h1 id="logo"><a href="{{ url('/') }}">postivo</a></h1>
				<?php if(isset($hideNav)): ?>
				<?php else: ?>
				<div class="nav">
					<ul class="navigation-menu show">
						<li class="nav-link"><a href="{{ url('/') }}">All Jobs</a></li>
						<li class="nav-link"><a href="{{ url('job/add') }}">Add Job</a></li>
					</ul>
				</div>

				<div class="nav nav-right">
					<ul class="navigation-menu show">
						<!-- <li class="nav-link"><a href="">Settings</a></li> -->
						<li class="nav-link"><a href="{{ url('logout') }}">Logout</a></li>
					</ul>
				</div>
				<?php endif; ?>
			</div>
		</div>

		@yield('content')
	</div>

	<script src="/assets/vendor/jquery/js/jquery.js"></script>
	<script src="/assets/vendor/marked/js/marked.js"></script>
	<script src="/assets/vendor/jquery.cookie/js/jquery.cookie.js"></script>
	<script src="/assets/js/main.js"></script>

</body>
</html>