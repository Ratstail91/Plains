#!/usr/bin/perl

use strict;
use warnings;

use CGI "param";
use GIS::Distance;
use JSON;

use db;

#get the coordinates
my $latitude = param('latitude');
my $longitude = param('longitude');
my $radius = param('radius');

#fetch the quests
my %markers = db->getQuestMarkers();

#add markers within the radius to a package
my $gis = GIS::Distance->new('Polar');
my %package;

while(my ($key, $value) = each %markers) {
  my $distance = $gis->distance(
    $latitude,$longitude => $value->[0],$value->[1]
  );
  if ($distance->meters() < $radius) {
    $package{$key} = {
      "latitude" => $value->[0],
      "longitude" => $value->[1]
    };
  }
}

#TODO: generate new markers if there aren't enough

#return the JSON structure
my $json = encode_json(\%package);

print "Content-type: text/html\n\n";
print $json;
