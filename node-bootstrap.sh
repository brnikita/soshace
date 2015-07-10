#!/usr/bin/env bash

# Just a simple way of checking if we need to install everything
if [ ! -d "/home/vagrant/soshace" ]
then
	curl -sL https://deb.nodesource.com/setup | sudo bash -
	sudo apt-get -y update
	sudo apt-get install --force-yes -y gcc make build-essential libssl-dev
	sudo apt-get install --force-yes -y nodejs git mongodb node-gyp
	ln -s /vagrant/soshace /home/vagrant/soshace
	cd /home/vagrant/soshace
	npm install
	npm install -g grunt-cli
	npm install --no-bin-link
fi	

cd /home/vagrant/soshace
grunt &
node app.js
	