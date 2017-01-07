#!/usr/bin/perl

use strict;
use warnings;

use CGI;
use CGI::Cookie;

my $query = CGI->new;

#get the data and store it as a cookie
my $email = $query->param('email');

my $cookie = $query->cookie({
	-name => 'USER_ID',
	-value => "email=$email",
	-expires => '4h',
	-domain => 'plains.krgamestudios.com'
});

#print the cookie information
print $query->redirect(
	-url => 'index.cgi',
	-cookie => $cookie
);
