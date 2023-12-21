<?php
/**
 * @file
 * Contains \Drupal\sample_config_entity\Entity\Ball.
 */

namespace Drupal\cvs_common_header\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;
use Drupal\Core\Entity\Annotation\ConfigEntityType;


/**
 * Defines the CVS Common Header entity.
 *
 * This Entity contains data related to the Common Header functionality.
 *
 * @ConfigEntityType(
 *   id = "cvs_common_header",
 *   label = @Translation("CVS Common Header"),
 *   module = "cvs_common_header",
 *   config_prefix = "cvs_common_header",
 *   entity_keys = {
 *     "primary_menu" = "primary_menu",
 *     "secondary_menu" = "secondary_menu",
 *     "search_menu" = "search_menu"
 *   },
 *   config_export = {
 *     "id",
 *     "label",
 *     "primary_menu",
 *     "secondary_menu",
 *     "search_menu",
 *     "show_logo",
 *     "show_logo_h1",
 *     "langcode"
 *   }
 * )
 */
class CVSCommonHeader extends ConfigEntityBase {

  /**
   * The primary menu machine name.
   *
   * @var array
   */
  public $primary_menu;

  /**
   * The secondary menu machine name.
   *
   * @var array
   */
  public $secondary_menu;

  /**
   * The search menu machine name.
   *
   * @var string
   */
  public $search_menu;

}

