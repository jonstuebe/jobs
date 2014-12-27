<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class LocationsTableSeeder extends Seeder {

	public function run()
	{
		Location::create([
			'site_id' => 1,
			'city' => 'San Francisco',
			'state' => 'California',
			'country' => 'United States',
		]);

		$faker = Faker::create();
		for ($i=0; $i < 100; $i++)
		{ 
			Location::create([
				'site_id' => 1,
				'city' => $faker->city,
				'state' => $faker->state,
				'country' => 'United States',
			]);
		}
	}

}