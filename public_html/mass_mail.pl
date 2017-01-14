#!/usr/bin/perl

#prevent accidentally sendind a mass email
exit(1);

use strict;
use warnings;

use DBI;
use Email::MIME;
use Email::Sender::Simple "sendmail";

#first, create the message
my $message = Email::MIME->create();

$message->header_str_set(From => 'no-reply@krgamestudios.com');
$message->header_str_set(Subject => 'Plains Update');

$message->encoding_set("quoted-printable");
$message->charset_set("UTF-8");

$message->body_set("Hello dear patron!\n\n MESSAGE TEXT \n\nThank you for your continued patronage of Plains! You have received this message because you signed up to play Plains at plains.krgamestudios.com. If you would like to unsubscribe, please message me at kayneruse\@gmail.com. Because this mass mailer is still quite cheap ;)\n\nBest Regards,\n\nKayne Ruse, KR Game Studios");

#get the database
my $dbh = DBI->connect('dbi:mysql:database=plains;localhost','access','',{AutoCommit=>1,RaiseError=>1,PrintError=>1});
my $sth = $dbh->prepare("SELECT email FROM profiles;");

$sth->execute() or die $DBI::errstr;

my @dbdump;

while(my @row = $sth->fetchrow_array()) {
	push @dbdump, $row[0];
}

#close the database
$sth->finish();
$dbh->disconnect();

#send the message to the mailing list
for my $el (@dbdump) {
	$message->header_str_set(To => $el);
	sendmail($message);
}
