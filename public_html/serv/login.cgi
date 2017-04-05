#!/usr/bin/perl

use strict;
use warnings;

use CGI ":standard";
use DBI;
use JSON;

use db;

#supress warning
$CGI::LIST_CONTEXT_WARN = 0;

#begin output
print "Content-type:text/plain\n\n";

#get the email/password
my $email = escapeHTML(param('email'));

#check the input
if ($email !~ /..*@..*\...*/) {
	print "failure -1";
	exit(0);
}

#fetch data from the database
my $dbh = db->connectDB();
my $sth = $dbh->prepare("SELECT email,coins,jewels FROM profiles WHERE email= '$email';");
$sth->execute() or die $DBI::errstr;

#count and store the results
my $count = 0;
my @array;

while (my @fields = $sth->fetchrow_array()) {
  $count++;
  push @array, @fields;
}

#cleanup
$sth->finish();
$dbh->disconnect();

#check the result
if ($count == 0) {
  print "failure -2";
  exit(0);
}

if ($count > 1) {
  print "failure -3";
  exit(0);
}

#print the result
my $json = JSON->new->utf8;
$json = $json->encode(\@array);
print $json;
