<?php

namespace Drupal\cvs_starter_kit\Plugin\Paragraph;

use Drupal\Core\Paragraph\ParagraphBase;

/**
 * Provides a 'My Template' paragraph.
 *
 */
class CskImageComponentParagraph extends ParagraphBase {
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
      '#theme' => 'paragraph__csk_image_component'
    ];

    return $renderable;
  }
}
