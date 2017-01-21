#!/usr/bin/perl

#prevent accidentally sending a mass email
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

$message->body_set("Hello Player!\n\nHave you ever been kept awake by a toothache? It's horrible. Damn wisdom tooth.\n\nSo this weekend I've implemented a proper signup system. The system has a front-facing panel which expands when you click it (you can see it on the landing page), as well as an email verification. So from now on, anyone who signs up will have to click a link in their inbox (or more likely, spam box) before they can play. Still, it prevents a certain someone from spamming the website, and that will hopefully lead to a better experience for you in the long run.\n\nI'd like to get more of the core game implemented next week, like the profile page. It's currently early Sunday for me, but I'm afraid I'm too tired to work anymore. However, I'd like to leave you with a bit of wisdom I heard recently. I envision my project as a circle, with different segments of the circle representing different tasks that need to be completed (such as login system, core gameplay, etc.). When I complete something, the circle in that segment gets bigger. It doesn't matter what I finish first, as long as the game's circle reaches it's full size eventually.\n\nThank you for your continued patronage of Plains! You have received this message because you signed up to play Plains at plains.krgamestudios.com. If you would like to unsubscribe, please message me at kayneruse\@gmail.com. Because this mass mailer is still quite cheap ;)\n\nBest Regards,\n\nKayne Ruse, KR Game Studios");

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
	print "Sending to $el\n";
	$message->header_str_set(To => $el);
	sendmail($message);
}
