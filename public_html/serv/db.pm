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
sub getAllQuestMarkers {
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

sub getQuestMarker {
  my ($db, $id) = @_;

  my $dbh = connectDB();
  my $sth = $dbh->prepare("SELECT latitude, longitude FROM questMarkers WHERE id = '$id';");
  $sth->execute() or die $DBI::errstr;

  my $count = 0;
  my $lat;
  my $lng;
  while (my @row = $sth->fetchrow_array()) {
    $count++;
    $lat = $row[0];
    $lng = $row[1];
  }

  if ($count >= 1) {
    my %package;
    $package{$id} = [$lat, $lng];
    return %package;
  }
  return -1;
}

sub pushQuestMarker {
  my ($db, $lat, $lng) = @_;

  my $dbh = connectDB();
  my $sth = $dbh->prepare("INSERT INTO questMarkers (latitude, longitude) VALUES ('$lat','$lng');");
  $sth->execute() or die $DBI::errstr;
  $sth->finish();

  $sth = $dbh->prepare("SELECT id FROM questMarkers ORDER BY id DESC LIMIT 1;");
  $sth->execute() or die $DBI::errstr;
  my ($id) = $sth->fetchrow_array();
  $sth->finish();

  $dbh->disconnect();
  return $id;
}

sub deleteQuestMarker {
  my ($db, $id) = @_;

  my $dbh = connectDB();
  my $sth = $dbh->prepare("DELETE FROM questMarkers WHERE id = '$id';");
  $sth->execute() or die $DBI::errstr;
  $sth->finish();
  $dbh->disconnect();
}

1;
