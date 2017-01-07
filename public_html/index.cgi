#!/usr/bin/perl

use strict;
use warnings;

use CGI::Cookie;
use Template;

#setup the initial variables
my $tt = Template->new({
	INCLUDE_PATH => './src'
}) || die $Template::ERROR, '\n';

my %cookies = CGI::Cookie->fetch;

#choose the correct landing page
if (defined $cookies{'USER_ID'}) {
	#map screen
	$tt->process('map_screen.tt', {
		copyrightOwner => "Kayne Ruse",
		copyrightCompany => "KR Game Studios",
		copyrightYear => "2017"
	}) || die $tt->error(), '\n';
}
else {
	#login screen
	$tt->process('login.tt', {
		copyrightOwner => "Kayne Ruse",
		copyrightCompany => "KR Game Studios",
		copyrightYear => "2017"
	}) || die $tt->error(), '\n';
}
