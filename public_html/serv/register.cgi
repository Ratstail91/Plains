#!/usr/bin/perl

use strict;
use warnings;

use CGI ":standard";
use DBI;

use db;

#get the expected parameters
my $email = param("email");
my $key = param("key");

#connect to the database
my $dbh = db->connectDB();

#get the corresponding verify
my $sth = $dbh->prepare("SELECT verify FROM signups WHERE email='$email';");
$sth->execute() or die $DBI::errstr;
my $verify = $sth->fetchrow_array();
$sth->finish();

#error check
if ($key != $verify) {
  print "Content-type:text/plain\n\n";
  print "Verification failed.\n";
  $dbh->disconnect();
  exit(0);
}

#save into profiles
$sth = $dbh->prepare("INSERT INTO profiles (email) VALUES ('$email');");
$sth->execute() or die $DBI::errstr;
$sth->finish();

#delete from signups
$sth = $dbh->prepare("DELETE FROM signups WHERE email='$email';");
$sth->execute() or die $DBI::errstr;
$sth->finish();

#output
print "Content-type:text/html\n\n";
print "<html><script>alert('Success')</script></html>";

