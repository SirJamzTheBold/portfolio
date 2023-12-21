<?php

namespace Drupal\cvs_starter_kit\Plugin\Field;

use Drupal\Core\Field\FieldBase;

/**
 * Provides a 'My Template' field.
 *
 */
class CskStatisticField extends FieldBase {
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
      '#theme' => 'field__paragraph__field_csk_statistics'
    ];

    return $renderable;
  }
}
