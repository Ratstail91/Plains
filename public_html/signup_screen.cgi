#!/usr/bin/perl

use strict;
use warnings;

use CGI ":standard";
use DBI;
use Email::MIME;
use Email::Sender::Simple "sendmail";
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

#check to see if this is a duplicate email
my $sth = $dbh->prepare("SELECT COUNT(*) FROM profiles WHERE email='$email';");
$sth->execute() or die $DBI::errstr;
my $result = $sth->fetch()->[0];
$sth->finish();

#print out the success or failure message
$tt->process('signup_screen.tt', {
	result => $result
}) || die $tt->error(), '\n';

#generate the verification key
my $key = int(rand 65535);

#save the given email address
$sth = $dbh->prepare("REPLACE INTO signups (email, verify) VALUES ('$email', $key);");
$sth->execute();
$sth->finish();

#disconnect from the database
$dbh->disconnect();

#send the verification email

my $message = Email::MIME->create();

$message->header_str_set(To => $email);
$message->header_str_set(From => 'no-reply@krgamestudios.com');
$message->header_str_set(Subject => 'Plains Email Verification');
$message->header_str_set('Content-type' => 'text/html');

$message->encoding_set('quoted-printable');
$message->charset_set('UTF-8');

$message->body_set("<html><body><p>Hello Player!</p><p>This is a verification message. To verify your email for Plains, please click here: <a href='https://plains.krgamestudios.com/register_screen.cgi?key=$key'>https://krgamestudios.com/register_screen.cgi?key=$key</a></p><p>If you didn't sign up for this message, please ignore it.</p></body></html>");

sendmail($message);
