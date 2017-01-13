#!/usr/bin/perl

use strict;
use warnings;

use CGI;
use CGI::Cookie;
use Template;

#setup the initial variables
my %cookies = CGI::Cookie->fetch;

#choose the correct landing page
if (!defined $cookies{'USER_ID'}) {
	#login landing page
	my $tt = Template->new({
		INCLUDE_PATH => './src'
	}) || die $Template::ERROR, '\n';

	$tt->process('login.tt') || die $tt->error(), '\n';
}
else {
	my $query = CGI->new;

	print $query->redirect(
		-url => 'map_screen.cgi',
	);
}

