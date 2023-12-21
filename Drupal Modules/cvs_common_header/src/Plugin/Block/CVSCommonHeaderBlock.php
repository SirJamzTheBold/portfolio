<?php

namespace Drupal\cvs_common_header\Plugin\Block;

use Drupal;
use Drupal\block\Entity\Block;
use Drupal\block_content\Entity\BlockContent;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\cvs_common_header\Model\CommonHeader;

/**
 * Creates a 'CVS Common Header' block.
 *
 * @Block(
 *   id = "cvs_common_header_block",
 *   admin_label = @Translation("CVS Common Header"),
 * )
 */
class CVSCommonHeaderBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'cvs_common_header',
      '#attached' => [
        'library' => [
          'cvs_common_header/cvs_common_header',
        ],
      ],
      '#data' => $this->getCommonHeaderData(),
    ];
  }

  /**
   * Provides a CommonHeader object typically for use in Twig template to
   * access member data.
   *
   * @return \Drupal\cvs_common_header\Model\CommonHeader
   */
  public function getCommonHeaderData() {
    // Set which config we're using.
    $config = Drupal::config('cvs_common_header.settings');

    // Get the stored configurations.
    $primary_menu = $config->get('primary_menu');
    $secondary_menu = $config->get('secondary_menu');
    $search_menu = $config->get('search_menu');
    $show_logo = $config->get('show_logo');
    $show_logo_h1 = $config->get('show_logo_h1');
    $breakpoint = $config->get('mobile_breakpoint');

    // Create default empty menu arrays
    $primary_menu_array = [
      'label' => '',
      'markup' => ''
    ];
    $secondary_menu_array = [
      'label' => '',
      'markup' => ''
    ];

    // Get primary menu markup & label
    if ($primary_menu != '_none') {
      $primary_menu_entity = \Drupal::entityTypeManager()->getStorage('menu')->load($primary_menu);
      $primary_menu_array = [
        'label' => $primary_menu_entity ? $primary_menu_entity->label() : '',
        'markup' => $this->getRenderedMenuItems($primary_menu)
      ];
    }

    // Get secondary menu markup & labels
    if ($secondary_menu != '_none') {
      $secondary_menu_entity = \Drupal::entityTypeManager()->getStorage('menu')->load($secondary_menu);
      $secondary_menu_array = [
        'label' => $secondary_menu_entity ? $secondary_menu_entity->label() : '',
        'markup' => $this->getRenderedMenuItems($secondary_menu)
      ];
    }

    // Get the rendered markup for the Search block if an option was chosen.
    $search_menu_markup = $search_menu != '_none' ? $this->getRenderedSearchMenu($search_menu) : "";

    // Build up the logo information.
    $logo_url = file_create_url(theme_get_setting('logo.url'));
    $site_name = Drupal::config('system.site')->get('name');

    // Send back a CommonHeader instance.
    return new CommonHeader(
      $primary_menu_array,
      $secondary_menu_array,
      $search_menu_markup,
      $logo_url,
      $site_name,
      $show_logo,
      $show_logo_h1,
      $breakpoint
    );
  }

  /**
   * Provides a rendered menu based on menu name.
   *
   * @param string $menu_name The name of the menu to build.
   *
   * @return mixed
   */
  private function getRenderedMenuItems($menu_name) {
    // Grab the menuTree service.
    $menu_tree = Drupal::menuTree();

    // Build the typical default set of menu tree parameters.
    $parameters = new MenuTreeParameters();

    //Adjust max depth
    $parameters->setMaxDepth(4);

    // Load the tree based on this set of parameters.
    $tree = $menu_tree->load($menu_name, $parameters);

    // Transform the tree using the manipulators you want.
    $manipulators = [
      // Only show links that are accessible for the current user.
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      // Use the default sorting of menu links.
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];

    $tree = $menu_tree->transform($tree, $manipulators);

    // Finally, build a renderable array from the transformed tree.
    $menu = $menu_tree->build($tree);

    return Drupal::service('renderer')->render($menu);
  }

  /**
   * Provides a 'render array''of the search menu block.
   *
   * @param $search_menu
   *
   */
  private function getRenderedSearchMenu($search_menu) {
    // Handle Block Content Block
    if($search_menu != '_default_search') {
      // Load the selected search menu block.
      $block = BlockContent::load($search_menu);

      // If the block doesn't load then send something back.
      // TODO: Should determine best method for handling null block.
      if (is_null($block)) {
        return ["<p>Block content not rendered for Block ID: $search_menu</p>"];
      }

      // Return the block_content uuid info for the twig tpl to update.
      return 'block_content:' . $block->uuid();
    }

    // Send back the default search form.
    return 'search_form_block';
  }

  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return array
   */
  public function blockForm($form, Drupal\Core\Form\FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    $form['help'] = [
      '#type' => 'item',
      '#title' => t('Instructions'),
      '#markup' => t($this->getHelpText()),
    ];

    return $form;
  }

  /**
   * The help text rendered on the block configuration page.
   *
   * @return string
   */
  private function getHelpText() {
    return "<p>Visit <a href='/admin/config/cvs_common_header'>/admin/config/cvs_common_header</a> to place the Common Header components.</p>";
  }


  /**
   * Returns cache max age. Set to 0 for development purposes;
   *
   * @return int
   */
  public function getCacheMaxAge() {
    // Don't cache this block.
    // TODO: May want to revisit this but for now setting this to see config changes immediately.
    return 0;
  }

}
