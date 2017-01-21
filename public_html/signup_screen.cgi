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

#connect to the database
my $dbh = DBI->connect('dbi:mysql:database=plains;localhost','access','',{AutoCommit=>1,RaiseError=>1,PrintError=>1});

#check to see of this is a duplicate email
my $sth = $dbh->prepare("SELECT COUNT(*) FROM profiles WHERE email='$email';");
$sth->execute() or die $DBI::errstr;
my $result = $sth->fetch()->[0];
$sth->finish();

#print out the success or failure message
$tt->process('signup_screen.tt', {
	result => $result
}) || die $tt->error(), '\n';

#save the given email address
$sth = $dbh->prepare("INSERT INTO profiles (email) VALUES (\"$email\");");
$sth->execute();
$sth->finish();

#disconnect from the database
$dbh->disconnect();


