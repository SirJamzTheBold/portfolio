<?php

namespace Drupal\cvs_starter_kit\Form;

use Drupal;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;
use JetBrains\PhpStorm\ArrayShape;

/**
 * Defines a form that configures CVS Common Header module settings.
 */
class StarterKitConfigurationForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'cvs_starter_kit_admin_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(
    array $form,
    FormStateInterface $form_state
  ): array {
    // Set which config we're using.
    $config = $this->config('cvs_starter_kit.settings');

    // Build the Full Width form element.
    $form['full_width_size'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Full Width Size'),
      '#default_value' => $config->get('full_width_size'),
      '#description'   => 'Format: ####px'
    ];

    // Build the Medium Width form element.
    $form['medium_width_size'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Medium Width Size'),
      '#default_value' => $config->get('medium_width_size'),
      '#description'   => 'Format: ####px'
    ];

    // Build the Narrow Width form element.
    $form['narrow_width_size'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Narrow Width Size'),
      '#default_value' => $config->get('narrow_width_size'),
      '#description'   => 'Format: ####px'
    ];

    // Build the Box Border Radius form element.
    $form['box_border_radius'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Box Border Radius'),
      '#default_value' => $config->get('box_border_radius'),
      '#description'   => 'Format: ####px or ####px ####px ####px ####px'
    ];

    // Build the Image Border Radius form element.
    $form['image_border_radius'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Image Border Radius'),
      '#default_value' => $config->get('image_border_radius'),
      '#description'   => 'Format: ####px or ####px ####px ####px ####px'
    ];

    // Build the Button Border Radius form element.
    $form['button_border_radius'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Button Border Radius'),
      '#default_value' => $config->get('button_border_radius'),
      '#description'   => 'Format: ####px or ####px ####px ####px ####px'
    ];

    // Hand off the form build and return results.
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Set which config we're using.
    $config = $this->config('cvs_starter_kit.settings');

    // Set the Full Width config.
    $config->set(
      'full_width_size',
      $form_state->getValue('full_width_size')
    )->save();

    // Set the Medium Width config.
    $config->set(
      'medium_width_size',
      $form_state->getValue('medium_width_size')
    )->save();

    // Set the Narrow Width config.
    $config->set(
      'narrow_width_size',
      $form_state->getValue('narrow_width_size')
    )->save();

    // Set the Box Border Radius config.
    $config->set(
      'box_border_radius',
      $form_state->getValue('box_border_radius')
    )->save();

    // Set the Image Border Radius config.
    $config->set(
      'image_border_radius',
      $form_state->getValue('image_border_radius')
    )->save();

    // Set the Button Border Radius config.
    $config->set(
      'button_border_radius',
      $form_state->getValue('button_border_radius')
    )->save();

    // Call the parent submitForm to handle the remainder of the submission.
    parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames(): array {
    return [
      'cvs_starter_kit.settings',
    ];
  }
}
