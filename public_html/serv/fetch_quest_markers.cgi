#!/usr/bin/perl

use strict;
use warnings;

use CGI "param";
use DBI;
use GIS::Distance;
use JSON;

use db;

#get the coordinates
my $latitude = param('latitude');
my $longitude = param('longitude');
my $radius = param('radius');

#connect to and retreive quest markers from the database
my $dbh = db->connectDB();
my $sth = $dbh->prepare("SELECT id, latitude, longitude FROM questMarkers;");#TODO: scalability issues
$sth->execute() or die $DBI::errstr;

#Add each quest within the radius to a package
my $gis = GIS::Distance->new('Polar');
my %package;

while(my @row = $sth->fetchrow_array()) {
  my $distance = $gis->distance( $latitude,$longitude => $row[1],$row[2] );
  if ($distance->meters() < $radius) {
    $package{$row[0]} = {
      "latitude" => $row[1],
      "longitude" => $row[2]
    };
  }
}

$sth->finish();

#TODO: generate new markers if there aren't enough

#close the database
$dbh->disconnect();

#return the JSON structure
my $json = encode_json(\%package);

print "Content-type: text/html\n\n";
print $json;
