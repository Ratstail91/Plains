#!/usr/bin/perl

use strict;
use warnings;

use CGI "param";
use GIS::Distance;
use JSON::XS;

$CGI::LIST_CONTEXT_WARN = 0;

#setup the variables
my $gis = GIS::Distance->new('Polar');

#get the argument
my $query = CGI->new;
my %payload = %{decode_json($query->param('payload'))};
my %origin = %{$payload{'origin'}};

#calculate the answer
my %output;

foreach my $questMarker (@{$payload{'destinations'}}) {
	$output{%{$questMarker}->{id}} =
		$gis->distance(
			$origin{lat},$origin{lng} =>
			%{$questMarker}->{lat}, %{$questMarker}->{lng}
		)->value('meter');
}

#output the argument
print "Content-type: text/html\n\n";
print encode_json(\%output);

