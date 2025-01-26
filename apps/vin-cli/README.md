@bimmerz/vin-cli
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@bimmerz/vin-cli.svg)](https://npmjs.org/package/@bimmerz/vin-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@bimmerz/vin-cli.svg)](https://npmjs.org/package/@bimmerz/vin-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @bimmerz/vin-cli
$ vin COMMAND
running command...
$ vin (--version)
@bimmerz/vin-cli/0.0.1 darwin-arm64 node-v23.6.1
$ vin --help [COMMAND]
USAGE
  $ vin COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vin help [COMMAND]`](#vin-help-command)
* [`vin plugins`](#vin-plugins)
* [`vin plugins add PLUGIN`](#vin-plugins-add-plugin)
* [`vin plugins:inspect PLUGIN...`](#vin-pluginsinspect-plugin)
* [`vin plugins install PLUGIN`](#vin-plugins-install-plugin)
* [`vin plugins link PATH`](#vin-plugins-link-path)
* [`vin plugins remove [PLUGIN]`](#vin-plugins-remove-plugin)
* [`vin plugins reset`](#vin-plugins-reset)
* [`vin plugins uninstall [PLUGIN]`](#vin-plugins-uninstall-plugin)
* [`vin plugins unlink [PLUGIN]`](#vin-plugins-unlink-plugin)
* [`vin plugins update`](#vin-plugins-update)

## `vin help [COMMAND]`

Display help for vin.

```
USAGE
  $ vin help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for vin.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.22/src/commands/help.ts)_

## `vin plugins`

List installed plugins.

```
USAGE
  $ vin plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ vin plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.26/src/commands/plugins/index.ts)_

## `vin plugins add PLUGIN`

Installs a plugin into vin.

```
USAGE
  $ vin plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into vin.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the VIN_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the VIN_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ vin plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ vin plugins add myplugin

  Install a plugin from a github url.

    $ vin plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ vin plugins add someuser/someplugin
```

## `vin plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ vin plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ vin plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.26/src/commands/plugins/inspect.ts)_

## `vin plugins install PLUGIN`

Installs a plugin into vin.

```
USAGE
  $ vin plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into vin.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the VIN_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the VIN_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ vin plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ vin plugins install myplugin

  Install a plugin from a github url.

    $ vin plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ vin plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.26/src/commands/plugins/install.ts)_

## `vin plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ vin plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ vin plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.26/src/commands/plugins/link.ts)_

## `vin plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ vin plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vin plugins unlink
  $ vin plugins remove

EXAMPLES
  $ vin plugins remove myplugin
```

## `vin plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ vin plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.26/src/commands/plugins/reset.ts)_

## `vin plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ vin plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vin plugins unlink
  $ vin plugins remove

EXAMPLES
  $ vin plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.26/src/commands/plugins/uninstall.ts)_

## `vin plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ vin plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vin plugins unlink
  $ vin plugins remove

EXAMPLES
  $ vin plugins unlink myplugin
```

## `vin plugins update`

Update installed plugins.

```
USAGE
  $ vin plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.26/src/commands/plugins/update.ts)_
<!-- commandsstop -->
