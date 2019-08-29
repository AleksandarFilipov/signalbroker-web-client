FROM envoyproxy/envoy:latest
# RUN apt-get update

COPY envoy.yaml /etc/envoy.yaml
RUN sed "s/127\.0\.0\.1/${SIGNAL_SERVER_HOST_NAME}/g" /etc/envoy.yaml
CMD /usr/local/bin/envoy -c /etc/envoy.yaml
