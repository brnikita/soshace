FROM centos:centos7
MAINTAINER Bragin Pavel <pabragin@yandex.ru>

ADD mongo.repo /etc/yum.repos.d/
RUN yum -y update; yum clean all
RUN yum -y install epel-release

##NODE INSTALL
RUN yum -y install gcc-c++ make
RUN yum -y install nodejs npm

##NGINX INSTALL
RUN yum -y install nginx
ADD nginx.conf /etc/nginx/nginx.conf

##GIT INSTALL
RUN yum -y install git

##MONGO INSTALL
RUN yum -y install mongodb-org
RUN mkdir -p /data/db

##CLONE REPO
RUN rm -fR /usr/share/nginx/html/*
RUN git clone https://github.com/brnikita/soshace.git /usr/share/nginx/html
RUN mv /usr/share/nginx/html/app/config.template.js /usr/share/nginx/html/app/config.js

##BUILD PROJECT
RUN cd /usr/share/nginx/html ; npm install ; npm install -g grunt-cli

EXPOSE 8080 80

CMD ["mongod"]
CMD ["grunt", "--gruntfile", "/usr/share/nginx/html/Gruntfile.js"]
CMD ["node", "/usr/share/nginx/html/app.js"]
CMD [ "/usr/sbin/nginx", "-g", "daemon off ;"]
