<?php

namespace Drupal\cvs_starter_kit\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'My Template' block.
 *
 * @Block(
 *   id = "my_template_block",
 *   admin_label = @Translation("My Template")
 * )
 */
class CskInteriorHeader extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return ['label_display' => FALSE];
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $renderable = [
      '#theme' => 'block__inline_block__csk_interior_header'
    ];

    return $renderable;
  }
}
