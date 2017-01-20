#!/usr/bin/perl

use strict;
use warnings;

use CGI ":standard";
use CGI::Cookie;
use DBI;

$CGI::LIST_CONTEXT_WARN = 0;

my $query = CGI->new;

#get the data
my $email = escapeHTML($query->param('email'));
#TODO: password

#check to see of it's a valid email address
if ($email !~ /..*@..*\...*/) {
	print $query->redirect(
		-url => 'index.cgi'
	);
	exit(0);
}

#Find the profile based on the email address
my $dbh = DBI->connect('dbi:mysql:database=plains;localhost','access','',{AutoCommit=>1,RaiseError=>1,PrintError=>1});

my $sth = $dbh->prepare("SELECT * FROM profiles WHERE email='$email';");

$sth->execute() or die $DBI::errstr;

#Load the necessary data into the cookie

my $cookie = $query->cookie({
	-name => 'USER_ID',
	-value => "email=$email",
	-expires => '4h',
	-domain => 'plains.krgamestudios.com'
});

#close the database connection
$sth->finish();
$dbh->disconnect();

#print the cookie information
print $query->redirect(
	-url => 'index.cgi',
	-cookie => $cookie
);
