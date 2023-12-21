<?php

namespace Drupal\cvs_common_header\Model;


/**
 * A Twig-friendly representation of the Common Header attributes.
 *
 * @package Drupal\cvs_common_header\Model
 */
class CommonHeader
{

  /**
   * The Markup for the Primary Menu.
   *
   * @var array
   */
  public $primary_menu;

  /**
   * The Markup for the Secondary Menu.
   *
   * @var array
   */
  public $secondary_menu;

  /**
   * The Markup for the Search Menu.
   *
   * @var string
   */
  public $search_menu;

  /**
   * The URL for the logo path.
   *
   * @var string
   */
  public $logo_url;

  /**
   * The name of the site.
   *
   * @var string
   */
  public $site_name;

  /**
   * Whether to show the logo (or not).
   * @var bool
   */
  public $show_logo;

  /**
   * Whether to wrap logo with h1 on homepage.
   * @var bool
   */
  public $show_logo_h1;

  /**
   * The mobile breakpoint.
   * @var string
   */
  public $breakpoint;

  /**
   * CommonHeader constructor.
   *
   * @param null $primary_menu
   * @param null $secondary_menu
   * @param null $search_menu
   * @param null $logo_url
   * @param null $site_name
   * @param null $show_logo
   * @param null $show_logo_h1
   * @param null $breakpoint
   */
  public function __construct(
    $primary_menu = null,
    $secondary_menu = null,
    $search_menu = null,
    $logo_url = null,
    $site_name = null,
    $show_logo = null,
    $show_logo_h1 = null,
    $breakpoint = null)
  {
    $this->setPrimaryMenu($primary_menu);
    $this->setSecondaryMenu($secondary_menu);
    $this->setSearchMenu($search_menu);
    $this->setLogoUrl($logo_url);
    $this->setSiteName($site_name);
    $this->setShowLogo($show_logo);
    $this->setShowLogoH1($show_logo_h1);
    $this->setBreakpoint($breakpoint);
  }

  /**
   * @return bool
   */
  public function getShowLogo()
  {
    return $this->show_logo;
  }

  /**
   * @return bool
   */
  public function getShowLogoh1()
  {
    return $this->show_logo_h1;
  }

  /**
   * @param $show_logo
   */
  public function setShowLogo($show_logo)
  {
    $this->show_logo = $show_logo;
  }

  /**
   * @param $show_logo_h1
   */
  public function setShowLogoH1($show_logo_h1)
  {
    $this->show_logo_h1 = $show_logo_h1;
  }

  /**
   * @return string
   */
  public function getPrimaryMenu()
  {
    return $this->primary_menu;
  }


  /**
   * @param $primary_menu
   */
  public function setPrimaryMenu($primary_menu)
  {
    $this->primary_menu = $primary_menu;
  }


  /**
   * @return string
   */
  public function getSecondaryMenu()
  {
    return $this->secondary_menu;
  }


  /**
   * @param $secondary_menu
   */
  public function setSecondaryMenu($secondary_menu)
  {
    $this->secondary_menu = $secondary_menu;
  }


  /**
   * @return string
   */
  public function getSearchMenu()
  {
    return $this->search_menu;
  }


  /**
   * @param $search_menu
   */
  public function setSearchMenu($search_menu)
  {
    $this->search_menu = $search_menu;
  }


  /**
   * @return string
   */
  public function getLogoUrl()
  {
    return $this->logo_url;
  }


  /**
   * @param $logo_url
   */
  public function setLogoUrl($logo_url)
  {
    $this->logo_url = $logo_url;
  }


  /**
   * @return string
   */
  public function getSiteName()
  {
    return $this->site_name;
  }


  /**
   * @param $site_name
   */
  public function setSiteName($site_name)
  {
    $this->site_name = $site_name;
  }

  /**
   * @param $breakpoint
   */
  public function setBreakpoint($breakpoint) {
    $this->breakpoint = $breakpoint;
  }

  /**
   * @return string
   */
  public function getBreakpoint(): string {
    return $this->breakpoint;
  }

}
