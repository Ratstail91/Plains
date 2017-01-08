#!/usr/bin/perl

use strict;
use warnings;

use CGI "param";
use DBI;
use GIS::Distance;
use JSON;

#get the coordinates
my $latitude = param('latitude');
my $longitude = param('longitude');

#connect to and retreive quests from the database
my $dbh = DBI->connect('dbi:mysql:database=plains;localhost','access','',{AutoCommit=>1,RaiseError=>1,PrintError=>1});
my $sth = $dbh->prepare("SELECT id, latitude, longitude FROM quests;");#TODO: scalability issues
$sth->execute() or die $DBI::errstr;

#check to see how many quests are within 1km
my $gis = GIS::Distance->new('Polar');
my $nearbyCount = 0;

while((my @row = $sth->fetchrow_array()) and ($nearbyCount < 10)) {
	my $distance = $gis->distance( $latitude,$longitude => $row[1],$row[2] );
	if ($distance->meters() < 1000) {
		$nearbyCount++;
	}
}

$sth->finish();

#create the nearby quests
while ($nearbyCount < 10) {
	#random locations
	#TODO: snapped to roads
	my $randomX = (rand(1000) - 500) / 100000; #about 100km to a degree
	my $randomY = (rand(1000) - 500) / 100000;

	$sth = $dbh->prepare("INSERT INTO quests (latitude, longitude) VALUES ($latitude+$randomX, $longitude+$randomY);");
	$sth->execute() or die $DBI::errstr;
	$sth->finish();

	$nearbyCount++;
}

#close the database
$dbh->disconnect();

#return the latitude & longitude
my %package;
$package{latitude} = $latitude;
$package{longitude} = $longitude;

my $json = encode_json \%package;

print "Content-type: text/html\n\n";
print $json;
