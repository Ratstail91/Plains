#!/usr/bin/perl

use strict;
use warnings;

use CGI ":standard";
use CGI::Cookie;
use Template;

#setup the initial variables
my $query = CGI->new;
my %cookies = CGI::Cookie->fetch;
my $tt = Template->new({
	INCLUDE_PATH => './src'
}) || die $Template::ERROR, '\n';

#if someone gets here without a cookie
if (!defined $cookies{'USER_ID'}) {
	#send them to the main page
	print $query->redirect(
		-url => 'index.cgi'
	);
	exit(0);
}

#output the HTML page
$tt->process('profile_screen.tt') || die $tt->error(), '\n';


