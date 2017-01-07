#!/usr/bin/perl

use strict;
use warnings;

use CGI;

print CGI->redirect(
	-url => 'https://plains.krgamestudios.com'
);

