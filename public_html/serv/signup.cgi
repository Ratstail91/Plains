#!/usr/bin/perl

use strict;
use warnings;

use CGI ":standard";
use DBI;
use JSON;
use Email::MIME;
use Email::Sender::Simple "sendmail";

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

#connect to the database
my $dbh = db->connectDB();

#check for duplicate emails
my $sth = $dbh->prepare("SELECT COUNT(*) FROM profiles WHERE email='$email';");
$sth->execute() or die $DBI::errstr;
if ($sth->fetch()->[0] != 0) {
  $sth->finish();
  print "failure -2";
  exit(0);
}
$sth->finish();

#generate the verification key
my $key = int(rand 65535);

#store the data in the database
$sth = $dbh->prepare("REPLACE INTO signups (email, verify) VALUES ('$email', '$key');");
$sth->execute() or die $DBI::errstr;
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

$message->body_set("<html style=\"color:#000\"><body><p>Hello Player!</p><p>This is a verification message. To verify your email for Plains, please click here:</p><a href='https://plains.krgamestudios.com/serv/register.cgi?email=$email&key=$key'>https://plains.krgamestudios.com/serv/register.cgi?email=$email&key=$key</a><p>If you wish to receive weekly updates on the progress of Plains, remember to mark this address as not spam.</p><p>If you didn't sign up for this message, please ignore it.</p></body></html>");

sendmail($message);

print "success";
