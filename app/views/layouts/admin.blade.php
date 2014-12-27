<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Jobs</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="/assets/css/screen.css" />

</head>
<body>
	
	<div class="outer-container">

		<header class="navigation">
			<div class="navigation-wrapper">
				<a href="{{ url('/') }}" class="logo">
					<img src="/assets/svg/job-icon.svg" alt="Logo Image" />
				</a>
				<?php if(isset($hideNav)): ?>
				<?php else: ?>
				<div class="nav">
					<ul id="js-navigation-menu" class="navigation-menu show">
						<li class="nav-link"><a href="{{ url('/') }}">All Jobs</a></li>
						<li class="nav-link"><a href="{{ url('job/add') }}">Add Job</a></li>
					</ul>
				</div>

				<div class="nav-right">
					<ul id="js-navigation-menu" class="navigation-menu show">
						<li class="nav-link"><a href="{{ url('logout') }}">Logout</a></li>
					</ul>
				</div>
				<?php endif; ?>
			</div>
		</header>

		@yield('content')
	</div>

	<script src="/assets/vendor/jquery/js/jquery.js"></script>
	<script src="/assets/vendor/marked/js/marked.js"></script>
	<script src="/assets/js/main.js"></script>
</body>
</html>