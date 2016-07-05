FROM centos:centos6

RUN rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
RUN yum update -y
RUN yum install -y curl git tar wget
RUN wget -q https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-x64.tar.gz -O - | tar xzf - -C /opt/

RUN mv /opt/node-v* /opt/node
RUN ln -s /opt/node/bin/node /usr/bin/node
RUN ln -s /opt/node/bin/npm /usr/bin/npm

COPY . /opt/analytics-web-app/

WORKDIR /opt/analytics-web-app

RUN npm install
RUN yum clean all

EXPOSE 3001
# CMD ["npm", "start"]