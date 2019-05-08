# Copyright 2019 Volvo Cars
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# ”License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# “AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

# Import all plugins from `rel/plugins`
# They can then be used by adding `plugin MyPlugin` to
# either an environment, or release definition, where
# `MyPlugin` is the name of the plugin module.
Path.join(["rel", "plugins", "*.exs"])
|> Path.wildcard()
|> Enum.map(&Code.eval_file(&1))

use Mix.Releases.Config,
    # This sets the default release built by `mix release`
    default_release: :default,
    # This sets the default environment used by `mix release`
    default_environment: Mix.env()

# For a full list of config options for both releases
# and environments, visit https://hexdocs.pm/distillery/configuration.html


# You may define one or more environments in this file,
# an environment's settings will override those of a release
# when building in that environment, this combination of release
# and environment configuration is called a profile

environment :dev do
  # If you are running Phoenix, you should make sure that
  # server: true is set and the code reloader is disabled,
  # even in dev mode.
  # It is recommended that you build with MIX_ENV=prod and pass
  # the --env flag to Distillery explicitly if you want to use
  # dev mode.
  set dev_mode: true
  set include_erts: false
  set cookie: :"7381822222747A51CBED4BFB226F347DD67A562FF1137324322D2705C5E2F7CA"
end

environment :prod do
  set include_erts: true
  set include_src: false
  set cookie: :"5AD6D6B586839A53530165D4880E0B52E9AFA514C76A14C60A69E4E842F35ED7"
end

# You may define one or more releases in this file.
# If you have not set a default release, or selected one
# when running `mix release`, the first release in the file
# will be used by default

# Get git based version
defmodule GitVersion do
  def get() do
    with {out, 0} <- System.cmd("git", ~w[describe --tags --dirty], stderr_to_stdout: true) do
      out
      |> String.trim()
      |> String.split("-")
      |> Enum.take(2)
      |> Enum.join(".")
      |> String.trim_leading("v")
    else
      _ -> "0.1.0"
    end
  end
end

release :service_client do
  set version: GitVersion.get()
  set applications: [
    :runtime_tools
  ]
end
