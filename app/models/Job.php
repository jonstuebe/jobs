<?php

class Job extends \Eloquent {
	protected $fillable = [];

	public function location()
	{
		return $this->belongsTo('Location');
	}

	public function company()
	{
		return $this->belongsTo('Company');
	}
}