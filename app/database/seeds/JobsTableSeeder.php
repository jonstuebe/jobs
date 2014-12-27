<?php
use Faker\Factory as Faker;

class JobsTableSeeder extends Seeder {

	public function run()
	{
		foreach(range(1, 20) as $index)
		{
			Job::create(array(
				'site_id' => 1,
				'slug' => 'google-ui-designer',
				'position' => 'UI Designer',
				'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi eaque eligendi debitis velit reprehenderit esse officia quia alias tempora ducimus atque aperiam animi, rerum excepturi temporibus, a eos? Consequuntur, facilis.',
				'category' => 'Testing',
				'category_slug' => 'testing',
				'type' => 'full time',
				'remote' => true,
				'company_id' => 1,
				'location_id' => 1,
			));
		}
	}

}