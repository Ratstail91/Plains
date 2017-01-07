#!/usr/bin/perl

use strict;
use warnings;

use CGI "param";
use JSON;

my $latitude = param('latitude');
my $longitude = param('longitude');

#initialize the surrounding area
#TODO:

my %package;
$package{latitude} = $latitude;
$package{longitude} = $longitude;

my $json = encode_json \%package;

print "Content-type: text/html\n\n";
print $json;
