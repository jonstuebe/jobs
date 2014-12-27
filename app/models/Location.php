<?php

class Location extends \Eloquent {
	protected $fillable = ['site_id','city','state','country','zip','lat','long'];
}