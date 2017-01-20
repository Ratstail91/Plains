#!/usr/bin/perl

use strict;
use warnings;

use CGI;
use CGI::Cookie;
use Template;

#setup the initial variables
my %cookies = CGI::Cookie->fetch;

#if someone gets here with a cookie
if (defined $cookies{'USER_ID'}) {
	#send them to the main page
	print CGI->redirect(
		-url => 'index.cgi'
	);
	exit(0);
}

my $tt = Template->new({
	INCLUDE_PATH => './src'
}) || die $Template::ERROR, '\n';

#login landing page
$tt->process('landing_screen.tt') || die $tt->error(), '\n';

