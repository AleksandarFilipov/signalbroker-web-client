FROM ubuntu:16.04 AS build-env

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive \
       apt-get install -y --no-install-recommends \
               curl ca-certificates sudo locales \
               iproute2 can-utils \
               vim tmux \
               build-essential git make gcc cmake cmake-curses-gui \
               doxygen

ENV LANG en_US.UTF-8
RUN echo "en_US.UTF-8 UTF-8" >/etc/locale.gen && locale-gen

RUN curl -sO https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb \
    && dpkg -i erlang-solutions_1.0_all.deb

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive \
       apt-get install -y \
               esl-erlang \
               elixir=1.7.4-*

# # For erlang dev env, code coverage etc
# RUN apt-get install -y --no-install-recommends \
#             erlang-dev erlang-tools erlang-common-test

ARG MIX_ENV=prod

RUN mix local.hex --force
RUN mix local.rebar --force

COPY . /service_client/
WORKDIR /service_client
RUN rm -rf _build
RUN rm -rf deps
RUN mix deps.get
RUN mix release


FROM ubuntu:16.04

# NOTE: libssl1.0.0 is a run-time dependency of service_client, which happens
# to not be installed on ubuntu:16.04 (raspbian has it, because it comes with
# curl pre-installed)
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive \
       apt-get install -y --no-install-recommends \
               locales \
               libssl1.0.0

ENV LANG en_US.UTF-8
RUN echo "en_US.UTF-8 UTF-8" >/etc/locale.gen && locale-gen

#EXPOSE 4040

WORKDIR /service_client

COPY --from=build-env service_client/_build ./_build/
COPY --from=build-env service_client/configuration ./_build/prod/rel/signal_server/configuration/

ENTRYPOINT ["_build/prod/rel/service_client/bin/service_client", "console"]
