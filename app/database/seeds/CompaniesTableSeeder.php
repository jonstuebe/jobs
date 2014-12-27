<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class CompaniesTableSeeder extends Seeder {

	public function run()
	{
		Company::create([
			'name' => 'Google',
			'url' => 'http://google.com',
			'site_id' => 1,
			'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis veniam ad accusamus enim, commodi placeat rerum. Minus, consequuntur. Quidem nulla sint delectus incidunt, vel ducimus ratione est aut natus perspiciatis.'
		]);

		$faker = Faker::create();
		for ($i=0; $i < 100; $i++)
		{ 
			Company::create([
				'name' => $faker->company,
				'url' => $faker->url,
				'site_id' => 1,
				'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis veniam ad accusamus enim, commodi placeat rerum. Minus, consequuntur. Quidem nulla sint delectus incidunt, vel ducimus ratione est aut natus perspiciatis.'
			]);
		}
	}

}