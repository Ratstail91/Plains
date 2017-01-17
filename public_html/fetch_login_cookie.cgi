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

#check to see of it's a valid email address
if ($email !~ /..*@..*\...*/) {
	print $query->redirect(
		-url => 'index.cgi'
	);
	exit(0);
}

#save the given email address
my $dbh = DBI->connect('dbi:mysql:database=plains;localhost','access','',{AutoCommit=>1,RaiseError=>1,PrintError=>1});

my $sth = $dbh->prepare("INSERT IGNORE INTO profiles (email) VALUES (\"$email\");");

$sth->execute() or die $DBI::errstr;

$sth->finish();
$dbh->disconnect();

#store the user data as a cookie
my $cookie = $query->cookie({
	-name => 'USER_ID',
	-value => "email=$email",
	-expires => '4h',
	-domain => 'plains.krgamestudios.com'
});

#print the cookie information
print $query->redirect(
	-url => 'index.cgi',
	-cookie => $cookie
);
