FROM envoyproxy/envoy:latest
# RUN apt-get update

ARG SIGNAL_SERVER_HOST_NAME=127.0.0.1
COPY envoy.yaml /etc/envoy.yaml
RUN sed -i "s/127\.0\.0\.1/${SIGNAL_SERVER_HOST_NAME}/g" /etc/envoy.yaml 
CMD /usr/local/bin/envoy -c /etc/envoy.yaml
