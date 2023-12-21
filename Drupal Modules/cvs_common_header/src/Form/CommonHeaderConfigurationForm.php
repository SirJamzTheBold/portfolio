<?php

namespace Drupal\cvs_common_header\Form;

use Drupal;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines a form that configures CVS Common Header module settings.
 */
class CommonHeaderConfigurationForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'cvs_common_header_admin_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Set which config we're using.
    $config = $this->config('cvs_common_header.settings');

    // Get the list of Menu options.
    $menu_option_list = $this->getMenuOptionList();

    // Get the list of Search Menu options
    $search_menu_option_list = $this->getSearchMenuOptionList();

    // Show some help text.
    $form['help'] = [
      '#type' => 'item',
      '#title' => t('Instructions'),
      '#markup' => t($this->getHelpText()),
    ];

    // Build the Primary Menu form element.
    $form['primary_menu'] = [
      '#type' => 'select',
      '#title' => $this->t('Primary Menu'),
      '#options' => $menu_option_list,
      '#default_value' => $config->get('primary_menu'),
    ];

    // Build the Secondary Menu form element.
    $form['secondary_menu'] = [
      '#type' => 'select',
      '#title' => $this->t('Secondary Menu'),
      '#options' => $menu_option_list,
      '#default_value' => $config->get('secondary_menu'),
    ];

    // Build the Secondary Menu form element.
    $form['search_menu'] = [
      '#type' => 'select',
      '#title' => $this->t('Search Menu'),
      '#options' => $search_menu_option_list,
      '#default_value' => $config->get('search_menu'),
    ];

    // Build the Secondary Menu form element.
    $form['show_logo'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show Logo'),
      //      '#options'       => $search_menu_option_list,
      '#default_value' => is_null($config->get('show_logo')) ? FALSE : $config->get('show_logo'),
    ];

    $form['show_logo_h1'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Wrap logo with H1 on frontpage'),
      '#description' => $this->t('H1 text for frontpage logo uses the site name field from config page: Basic Site Settings > Site Details > Site Name'),
      '#default_value' => $config->get('show_logo_h1') ?: FALSE,
      '#states' => [
        'visible' => [
          ':input[name=show_logo]' => ['checked' => TRUE],
        ],
      ],
    ];

    // Build the Secondary Menu form element.
    $form['node_menu_depth'] = [
      '#type' => 'select',
      '#title' => $this->t('Node Menu Depth'),
      '#options' => [0, 1, 2, 3, 4, 5],
      '#default_value' => $config->get('node_menu_depth'),
    ];

    // Build the Mobile Breakpoint form element.
    $form['mobile_breakpoint'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Mobile Breakpoint'),
      '#default_value' => $config->get('mobile_breakpoint'),
    ];

    // Hand off the form build and return results.
    return parent::buildForm($form, $form_state);
  }

  /**
   * Returns an associative array of menus where the key is the machine name
   *   and the value is the human-readable text.
   *
   * @return array
   */
  public function getMenuOptionList() {
    // Initialize what we're working with here - the menu entities and the options list we'll return.
    $entities = [];
    $menu_option_list = [];

    // Try to handle any errors while trying to fetch the menu entities.
    try {
      $entities = Drupal::entityTypeManager()
        ->getStorage('menu')
        ->loadMultiple();
    } catch (Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException $e) {
      Drupal::messenger()
        ->addMessage(t('An error occurred while trying to get the menu items.'), 'error');
    } catch (Drupal\Component\Plugin\Exception\PluginNotFoundException $e) {
      Drupal::messenger()
        ->addMessage(t('An error occurred while trying to get the menu items.'), 'error');
    }

    // Build up the menu option list using the entities we just fetched.
    foreach ($entities as $id => $menu) {
      $menu_option_list[$id] = $this->t($menu->label());
    }

    // Let's add an empty value.
    $menu_option_list['_none'] = 'None';

    // Send these options along their way.
    return $menu_option_list;
  }


  /** Return a list of menus available in the system.
   *
   * @return array
   */
  private function getSearchMenuOptionList() {
    // Initialize what we're working with here
    $menu_option_list = [];

    // Get all of the blocks.
    //    $entities = Drupal\block\Entity\Block::loadMultiple();

    // Get the custom blocks.
    $block_ids = \Drupal::entityQuery('block_content')->execute();
    $blocks = Drupal\block_content\Entity\BlockContent::loadMultiple($block_ids);

    // Build up the menu option list using the entities we just fetched.
    foreach ($blocks as $id => $entity) {
      // Some blocks may not be labeled so we take care of that here.
      if (is_string($entity->label())) {
        // Add the processed menu option to the array.
        $menu_option_list[$id] = $this->processSearchMenuOption($entity);
      }
    }

    // Sort the array for humans.
    asort($menu_option_list);

    // Let's add the default search value.
    $menu_option_list['_default_search'] = 'Default Drupal Search';

    // Let's add an empty value.
    $menu_option_list['_none'] = 'None';

    // Let's just not go down this road. Prevent block recursion.
    unset($menu_option_list['commonheaderblock']);

    // Send these options along their way.
    return $menu_option_list;
  }

  public function processSearchMenuOption(Drupal\Core\Entity\EntityBase $entity) {
    // Set the label.
    $label = $entity->label();

    // Build up the option label.
    $type = $entity->getEntityType()->getLabel();
    $info = $entity->bundle();
    $option_text = "$label ($type::$info)";

    // Add the menu to the list
    return $this->t($option_text);
  }

  /**
   * The help text rendered on the Common Header configuration page.
   *
   * @return string
   */
  public function getHelpText() {
    $image_name = 'cvs_common_header_legend.png';
    $module_path = drupal_get_path('module', 'cvs_common_header');
    $image_path = "/" . $module_path . "/images/" . $image_name;

    return "
    <p>Choose below which menus should show in the particular areas.</p>
    <p>Visit <a href='/admin/structure/block'>/admin/structure/block</a> to place the Common Header block in the appropriate region for your theme.</p>
    <p>CVS Common Header Block configuration is at: <a href='/admin/structure/block/manage/cvscommonheader'>/admin/structure/block/manage/cvscommonheader</a>.</p>

    <img src='$image_path' alt='Common Header component positioning chart.'>
    ";
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Set which config we're using.
    $config = $this->config('cvs_common_header.settings');

    // Set the Primary Menu config.
    $config->set('primary_menu', $form_state->getValue('primary_menu'))
      ->save();

    // Set the Secondary Menu config.
    $config->set('secondary_menu', $form_state->getValue('secondary_menu'))
      ->save();

    // Set the Search Menu config.
    $config->set('search_menu', $form_state->getValue('search_menu'))
      ->save();

    // Set the Show Logo config.
    $config->set('show_logo', $form_state->getValue('show_logo'))
      ->save();

    // Set the wrap logo h1 config.
    $config->set('show_logo_h1', $form_state->getValue('show_logo_h1'))
      ->save();

    // Set the Menu Depth config.
    $config->set('node_menu_depth', $form_state->getValue('node_menu_depth'))
      ->save();

    // Set the Mobile Breakpoint config.
    $config->set('mobile_breakpoint', $form_state->getValue('mobile_breakpoint'))
      ->save();

    // Call the parent submitForm to handle the remainder of the submit.
    parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'cvs_common_header.settings',
    ];
  }

}
