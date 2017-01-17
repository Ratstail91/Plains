#!/usr/bin/perl

use strict;
use warnings;

use CGI;
use CGI::Cookie;

#setup the initial variables
my $query = CGI->new;
my %cookies = CGI::Cookie->fetch;

#choose the correct landing page
if (!defined $cookies{'USER_ID'}) {
	#login landing page
	my $query = CGI->new;

	print $query->redirect(
		-url => 'login.cgi',
	);
}
else {
	#map screen main page
	my $query = CGI->new;

	print $query->redirect(
		-url => 'map_screen.cgi',
	);
}

