FROM golang:alpine as builder
RUN apk --no-cache add git
ENV GOPATH /go
RUN go get -u github.com/golang/dep/cmd/dep
RUN git clone https://github.com/improbable-eng/grpc-web.git $GOPATH/src/github.com/improbable-eng/grpc-web
WORKDIR $GOPATH/src/github.com/improbable-eng/grpc-web
RUN $GOPATH/bin/dep ensure
RUN go install ./go/grpcwebproxy # installs into $GOPATH/bin/grpcwebproxy

FROM alpine
RUN apk --no-cache add ca-certificates
WORKDIR /
COPY --from=builder /go/bin/grpcwebproxy .
CMD ["/grpcwebproxy"]