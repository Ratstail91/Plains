#!/usr/bin/perl

package db;

use strict;
use warnings;

use DBI;

#connect to the database with fixed settings
sub connectDB {
  return DBI->connect('dbi:mysql:database=plains;localhost','access','',{AutoCommit=>1,RaiseError=>1,PrintError=>1});
}

#retreive quest markers from the database
sub getQuestMarkers {
  my $dbh = connectDB();
  my $sth = $dbh->prepare("SELECT id, latitude, longitude FROM questMarkers;");#TODO: scalability issues
  $sth->execute() or die $DBI::errstr;

  #add each quest marker to a package
  my %package;

  while(my ($key, $lat, $lng) = $sth->fetchrow_array()) {
    $package{$key} = [$lat, $lng];
  }

  $sth->finish();

  #close the database
  $dbh->disconnect();

  return %package;
}

1;
