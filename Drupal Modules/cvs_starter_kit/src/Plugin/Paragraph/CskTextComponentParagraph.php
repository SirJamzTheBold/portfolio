<?php

namespace Drupal\cvs_starter_kit\Plugin\Paragraph;

use Drupal\Core\Paragraph\ParagraphBase;

/**
 * Provides a 'My Template' paragraph.
 *
 */
class CskTextComponentParagraph extends ParagraphBase {
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
      '#theme' => 'paragraph__csk_text_component'
    ];

    return $renderable;
  }
}
