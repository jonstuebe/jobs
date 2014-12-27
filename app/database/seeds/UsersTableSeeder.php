<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder {

	public function run()
	{
		User::create([
			'email' => 'jstuebe@gmail.com',
			'site_id' => 1,
			'username' => 'jonstuebe',
			'first_name' => 'Jon',
			'last_name' => 'Stuebe',
			'password' => Hash::make('Thefray1'),
		]);
	}

}