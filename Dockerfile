FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:mc3man/trusty-media -y
RUN apt-get update
RUN apt-get dist-upgrade
RUN apt-get install ffmpeg -y

# Install curl, git, wget and Node.js
RUN \
  apt-get update && \
  apt-get -y install curl && \
  apt-get -y install git && \
  apt-get -y install wget && \
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
  apt-get install --yes nodejs

# Install Python
RUN \
  apt-get update && \
  apt-get install -y python python-dev python-pip python-virtualenv && \
  rm -rf /var/lib/apt/lists/*

# Install Node process manager
RUN npm install -g pm2

RUN mkdir storage app
ADD . app

CMD ["./app/entrypoint.sh"]
