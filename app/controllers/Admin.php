<?php

class Admin extends \BaseController {

	protected $layout = 'layouts.admin';

	public function index($site)
	{
		$site = Session::get('site');
		$jobs = Job::with('location','company')
		->where('site_id',$site->id)
		->get();

		$this->layout->content = View::make('admin.index', array( 'jobs' => $jobs ));
	}

	public function logout($site)
	{
		Auth::logout();
		Session::flush();

		return Redirect::to('login');
	}

	public function login()
	{
		if(Auth::guest())
		{
			$this->layout->hideNav = true;
			$this->layout->content = View::make('site.login');
		}
		else
		{
			return Redirect::to('/');
		}
	}

	public function auth($site)
	{
		$username = Input::get('username');
		$password = Input::get('password');

		$site = Site::where('subdomain', $site)->first();
		if(Auth::attempt(array('username' => $username, 'password' => $password, 'site_id' => $site->id)))
		{
			Session::put('site', $site);

			return Redirect::to('/');
		}
		else
		{
			return Redirect::to('login');
		}
	}

	public function addJob($site)
	{
		// return $this->layout->content = View::make('admin.job.add');
		return $this->layout->content = View::make('admin.job.edit');
	}

	public function editJob($site, $id)
	{
		$site = Session::get('site');
		$job = Job::with('location','company')
		->where('site_id', $site->id)
		->where('id',$id)
		->first();

		$city_state = $job->location->city . ', ' . $job->location->state;

		$this->layout->content = View::make('admin.job.edit', array( 'job' => $job, 'city_state' => $city_state ));
	}

	public function updateJob($site, $id = false)
	{
		$site = Session::get('site');
		$position = Input::get('position');
		$category = Input::get('category');
		$company_id = Input::get('company_id');
		$location_id = Input::get('location_id');
		$description = Input::get('description');

		if(!$id)
		{
			$job = new Job;
			$job->site_id = $site->id;
		}
		else
		{
			$job = Job::find($id);
		}

		if($company_id == "")
		{
			$company = Company::create([
				'name' => Input::get('company'),
				'site_id' => $site->id,
				'url' => '',
				'description' => ''
			]);

			$job->company_id = $company->id;
		}
		else
		{
			$job->company_id = $company_id;	
		}

		if($location_id == "")
		{
			$_location = explode(', ', Input::get('location'));
			$city = $_location[0];
			$state = (isset($_location[1])) ? $_location[1] : "";
			$location = Location::create([
				'site_id' => $site->id,
				'city' => $city,
				'state' => $state,
				'country' => 'United States',
			]);

			$job->location_id = $location->id;
		}
		else
		{
			$job->location_id = $location_id;
		}

		$job->position = $position;
		$job->category = $category;
		$job->category_slug = Str::slug($category);
		$job->description = $description;
		$job->slug = Str::slug($position);

		if($job->save())
		{
			return Response::json($job);
		}
		else
		{
			return false;
		}
	}

}