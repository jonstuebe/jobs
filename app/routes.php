<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


Route::group(array('prefix' => 'api/v1'), function()
{

	Route::get('companies', array('before' => 'auth', function()
	{

		$site = Session::get('site');
		$query = Input::get('query');

		if($query)
		{
			$companies = Company::where('name', 'like', '%'.$query.'%')
			->where('site_id',$site->id)
			->get();
		}
		else
		{
			$companies = Company::where('site_id',$site->id)->get();
		}

		return Response::json($companies);

	}));

	Route::get('locations', array('before' => 'auth', function()
	{

		$site = Session::get('site');
		$query = Input::get('query');
		$query = explode(', ', $query);

		if($query)
		{
			if(count($query) > 1)
			{
				$locations = Location::where('city', 'like', '%'.$query[0].'%')
				->where('site_id', $site->id)
				->orWhere('state', 'like', '%'.$query[1].'%')
				->get();
			}
			else
			{
				$locations = Location::where('city', 'like', '%'.$query[0].'%')
				->where('site_id', $site->id)
				->orWhere('state', 'like', '%'.$query[0].'%')
				->get();
			}
		}
		else
		{
			$locations = Location::where('site_id', $site->id)->get();
		}

		return Response::json($locations);

	}));

	Route::get('job', function(){

		$subdomain = Input::get('site');
		$site = Site::where('subdomain', $subdomain)->first();
		if(count($site) > 0)
		{
			$slug = Input::get('slug');

			$job = Job::where('site_id', $site->id)
			->where('slug', $slug)
			->first();

			return Response::json($job)->setCallback(Input::get('callback'));
		}

		return Response::json(array())->setCallback(Input::get('callback'));

	});

	Route::get('jobs', function(){
		$subdomain = Input::get('site');
		$site = Site::where('subdomain', $subdomain)->first();
		if(count($site) > 0)
		{
			$jobs = Job::where('site_id', $site->id)->get();

			return Response::json($jobs)->setCallback(Input::get('callback'));
		}

		return Response::json(array())->setCallback(Input::get('callback'));
	});

});

Route::group(array('domain' => '{site}.jo.bs', 'before' => array('subdomain')), function()
{

	Route::get('/', array('before' => 'auth', 'uses' => 'Admin@index'));
	Route::get('logout', array('uses' => 'Admin@logout'));
	Route::get('login', array('uses' => 'Admin@login'));
	Route::post('login', array('uses' => 'Admin@auth'));
	Route::get('admin', function()
	{
		return Redirect::to('login');
	});

	Route::group(array('prefix' => 'job', 'before' => 'auth'), function($site)
	{

		Route::get('{id}', array('uses' => 'Admin@editJob', 'as' => 'job.edit'))->where('id', '[0-9]+');
		Route::post('{id}', array('uses' => 'Admin@updateJob'))->where('id', '[0-9]+');
		Route::get('add', array('uses' => 'Admin@addJob', 'as' => 'job.add'));

	});

});

Route::get('login', function()
{
	return Redirect::to('/');
});

Route::get('logout', function()
{
	return Redirect::to('/');
});

Route::get('/', function()
{
	return View::make('hello');
});