#!/usr/bin/perl

use strict;
use warnings;

use CGI ":standard";
use DBI;

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
my $sth = $dbh->prepare("SELECT COUNT(*) FROM profiles WHERE email= '$email';");
$sth->execute() or die $DBI::errstr;

#if the entry doesn't exist, exit
if ($sth->fetch()->[0] == 0) {
  print "failure -2";
  exit(0);
}

$sth->finish();
$dbh->disconnect();

print "success";
