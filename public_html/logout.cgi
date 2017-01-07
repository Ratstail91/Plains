#!/usr/bin/perl

use strict;
use warnings;

use CGI;
use CGI::Cookie;

my $query = CGI->new;

#create the cookie with no data
my $cookie = $query->cookie({
	-name => 'USER_ID',
	-value => '',
	-expires => '-1h',
	-domain => 'plains.krgamestudios.com'
});

#print the cookie information
print $query->redirect(
	-url => 'index.cgi',
	-cookie => $cookie
);
