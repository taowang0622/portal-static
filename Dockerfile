FROM node:16-alpine

WORKDIR /opt/portal
COPY . .
RUN npm install && mkdir -p /opt/portal/static && touch /opt/portal/static/i_am_a_placeholder
ENTRYPOINT ["/opt/portal/bin/portal"]
CMD ["-p", "8080", "-h", "0.0.0.0", "-d", "/opt/portal/static"]
