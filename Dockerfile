FROM node:stretch-slim

MAINTAINER gowtham2003

RUN apt-get update && apt-get -y install cron

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc 

RUN chmod 777 /app/run

# Copy hello-cron file to the cron.d directory
COPY ./cronfiles/crontab /etc/cron.d/crontab
 
# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/crontab

# Apply cron job
RUN crontab /etc/cron.d/crontab
 
# Create the log file to be able to run tail
RUN touch /var/log/cron.log
 
# Run the command on container startup
CMD cron && tail -f /var/log/cron.log
