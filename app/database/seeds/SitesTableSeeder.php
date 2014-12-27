<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class SitesTableSeeder extends Seeder {

	public function run()
	{
		Site::create([
			'name' => 'R&R Partners',
			'subdomain' => 'rr'
		]);
	}

}