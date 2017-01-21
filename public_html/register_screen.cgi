#!/usr/bin/perl

use strict;
use warnings;

use CGI ":standard";
use DBI;
use Template;

$CGI::LIST_CONTEXT_WARN = 0;

#setup the initial variables
my $query = CGI->new;

my $tt = Template->new({
	INCLUDE_PATH => './src'
}) || die $Template::ERROR, '\n';

#get the parameters
my $keyParam = $query->param('key');

#connect to the database
my $dbh = DBI->connect('dbi:mysql:database=plains;localhost','access','',{AutoCommit=>1,RaiseError=>1,PrintError=>1});

#get and check for the corresponding email
my $sth = $dbh->prepare("SELECT email FROM signups WHERE verify=$keyParam");
$sth->execute();
my @row = $sth->fetchrow_array;
$sth->finish();

#print out the success or failure message
$tt->process('register_screen.tt', {
	result => scalar @row > 0
}) || die $tt->error(), '\n';

#save the given email address into profiles
if (scalar @row > 0) {
  $sth = $dbh->prepare("INSERT INTO profiles (email) VALUES ('$row[0]');");
  $sth->execute();
  $sth->finish();
}

#delete the given email address from signups
$sth = $dbh->prepare("DELETE FROM signups WHERE email='$row[0]';");
$sth->execute();
$sth->finish();

#disconnect from the database
$dbh->disconnect();

