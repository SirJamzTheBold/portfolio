# CVS Common Header
A common header for various CVS sites structured as a custom Drupal module.

# Active Branches:

There is no `main` or `develop` branch in this repo, there are TWO actively maintained branches for 1.3.x and 2.x releases. (2.x used on Coram site to accommodate the Smart Content Block).

The 2.x branch was previously named 1.4.x incorrectly. As of Sept 8,2021 we renamed this to 2.x branch to reflect the API change under the hood for Smart Block compatability, since this was causing regression errors when upgrading other sites. We decided to bifurcate the releases and maintain two branches instead, 2.x for Coram and 1.3 for all other sites that don't need Smart Content support. 

# Installation

## Pre
This currently depends on the menu_item_extras module and it's dependencies are listed in the composer and info files but it may be grabbed by performing:

```$bash
composer require 'drupal/menu_item_extras:^2.11'
```

## Fresh Setup
Ideally a fresh install has happened so that the new config will be imported.
You may also grab the latest tagged version with Composer and run the updates as noted later. After pulling this module, just run:

```$bash
drush en -y cvs_common_header;
drush cr;
```

This will setup the configuration page. the templates, and exposes a new field Featured Item field for menus via the menu items extra module.

## Existing Setup
If not on a fresh install, you'll need the menu_items_extras module as you may not have the updated dependencies.
As noted above, you may get the module with Composer:

```$bash
composer require 'drupal/menu_item_extras:^2.11'
```

Then we do our Drupal setup tasks.

```$bash
drush en -y menu_item_extras;
drush cr;
drush updb;
```

Module update 8001 should show up which installs base field configuration for menu link content.

The menus in which you wish to have the Featured Content field must be manually updated to have this field. Navigate to the menus and you'll now be able to manage fields and place our reference field.

# Usage
Navigate to /admin/config/cvs_common_header
Select a menu to show on the () position
Select a menu to show on the () position
Click Save

Navigate to the Blocks Layout page /admin/structure/block
Place the Common Header block in whichever region

View the bundled menus and site branding on whichever page.

# Development Notes
When pulling from repo to work on, you may need to manually pull the dependencies e.g.

```
# Install Menu Item Extras
composer require 'drupal/menu_item_extras:^2.12'

# Install Twig Tweak
composer require 'drupal/twig_tweak:^2.8'

# Install Block Content Machine Name
composer require 'drupal/block_content_machine_name:^3.0'
```
