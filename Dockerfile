FROM centos:centos7

RUN yum update -y
RUN yum install -y tar wget
RUN wget -q https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-x64.tar.gz -O - | tar xzf - -C /opt/

RUN mv /opt/node-v* /opt/node
RUN ln -s /opt/node/bin/node /usr/bin/node
RUN ln -s /opt/node/bin/npm /usr/bin/npm

COPY . /opt/publishing-app/

WORKDIR /opt/publishing-app

RUN npm install
RUN yum clean all

EXPOSE 3000
CMD ["npm", "start"]