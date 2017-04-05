#!/usr/bin/perl

package db;

use strict;
use warnings;

use DBI;

sub connectDB {
  return DBI->connect('dbi:mysql:database=plains;localhost','access','',{AutoCommit=>1,RaiseError=>1,PrintError=>1});
}

1;
