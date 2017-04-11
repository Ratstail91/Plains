#!/usr/bin/perl

use strict;
use warnings;

use CGI "param";
use GIS::Distance;
use JSON;

use db;

#get the parameters
my $id = param('id');
my $latitude = param('latitude');
my $longitude = param('longitude');

#get the specified marker from the database
my %marker = db->getQuestMarker($id);

my $gis = GIS::Distance->new('Polar');
my $distance = $gis->distance(
  $latitude,$longitude => $marker{$id}[0],$marker{$id}[1]
)->meters();

#headers
print "Content-type:text/plain\n\n";

#reject if the player is too far from this marker
if ($distance > 3000) {
  print "failure -1";
  exit(0);
}

db->deleteQuestMarker($id);

#TODO: store in the player's info

print "success";
