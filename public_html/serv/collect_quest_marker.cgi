#!/usr/bin/perl

use strict;
use warnings;

use CGI "param";
use GIS::Distance;
use JSON;

use db;

#headers
print "Content-type:text/plain\n\n";

#get the parameters
my $id = param('id');
my $latitude = param('latitude');
my $longitude = param('longitude');

#get the specified marker from the database
my @marker = db->getQuestMarker($id);

if ($marker[0] == -1) {
  print "failure -3 (id: $id)";
  exit(0);
}

my $gis = GIS::Distance->new('Polar');
my $distance = $gis->distance(
  $latitude,$longitude => $marker[0],$marker[1]
)->meters();

#reject if the player is too far from this marker
if ($distance > 3000) {
  print "failure -2 (too far: $distance)";
  exit(0);
}

db->deleteQuestMarker($id);

#TODO: store in the player's info

print "success";
