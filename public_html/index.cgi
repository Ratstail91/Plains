#!/usr/bin/perl

use strict;
use warnings;

use CGI::Cookie;
use Template;

#setup the initial variables
my $tt = Template->new({
	INCLUDE_PATH => '.'
}) || die $Template::ERROR, '\n';

my %cookies = CGI::Cookie->fetch;

#choose the correct landing page
if (defined $cookies{'USER_ID'}) {
	#map screen
	print "Content-type: text/html\n\n";
	print "map screen\n";
	print "<a href='logout.cgi'>logout</a>";
}
else {
	#login screen
	$tt->process('login.tt', {
		copyrightOwner => "Kayne Ruse",
		copyrightCompany => "KR Game Studios",
		copyrightYear => "2017"
	}) || die $tt->error(), '\n';
}
