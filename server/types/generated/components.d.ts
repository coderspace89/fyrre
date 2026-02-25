import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAuthorSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_author_sections';
  info: {
    displayName: 'Author Section';
  };
  attributes: {
    sectionTitle: Schema.Attribute.String;
    viewAllLink: Schema.Attribute.String;
    viewAllText: Schema.Attribute.String;
  };
}

export interface BlocksFeaturedContentSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_content_sections';
  info: {
    displayName: 'Featured Content Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    details: Schema.Attribute.Component<'elements.content-details', false>;
    image: Schema.Attribute.Media<'images'>;
    mainTitle: Schema.Attribute.String;
  };
}

export interface BlocksFooter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copyrightText: Schema.Attribute.String;
    mainFooterTitle: Schema.Attribute.String;
    navigationColumns: Schema.Attribute.Component<'elements.link-column', true>;
    newsletterSection: Schema.Attribute.Component<
      'blocks.footer-newsletter',
      false
    >;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
  };
}

export interface BlocksFooterNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_footer_newsletters';
  info: {
    displayName: 'Footer Newsletter';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    emailPlaceholder: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    scrollingText: Schema.Attribute.String;
  };
}

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    newsTicker: Schema.Attribute.Component<'blocks.news-ticker', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksMagazineAd extends Struct.ComponentSchema {
  collectionName: 'components_blocks_magazine_ads';
  info: {
    displayName: 'Magazine Ad';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    calloutLabel: Schema.Attribute.String;
    calloutName: Schema.Attribute.String;
    calloutType: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    issueNumber: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksMagazinePageHeader extends Struct.ComponentSchema {
  collectionName: 'components_blocks_magazine_page_headers';
  info: {
    displayName: 'Magazine Page Header';
  };
  attributes: {
    categoriesLabel: Schema.Attribute.String;
    defaultCategoryFilterText: Schema.Attribute.String;
    filterableCategories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    image: Schema.Attribute.Media<'images'>;
    pageTitle: Schema.Attribute.String;
  };
}

export interface BlocksNewsTicker extends Struct.ComponentSchema {
  collectionName: 'components_blocks_news_tickers';
  info: {
    displayName: 'News Ticker';
  };
  attributes: {
    showTicker: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    tickerItems: Schema.Attribute.Component<'elements.ticker-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksNewsletterSignup extends Struct.ComponentSchema {
  collectionName: 'components_blocks_newsletter_signups';
  info: {
    displayName: 'Newsletter Signup';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    placeholderText: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksPodcastSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_podcast_sections';
  info: {
    displayName: 'Podcast Section';
  };
  attributes: {
    title: Schema.Attribute.String;
    viewAllLink: Schema.Attribute.String;
    viewAllText: Schema.Attribute.String;
  };
}

export interface BlocksPopularArticles extends Struct.ComponentSchema {
  collectionName: 'components_blocks_popular_articles';
  info: {
    displayName: 'Popular Articles';
  };
  attributes: {
    popularPosts: Schema.Attribute.Relation<
      'oneToMany',
      'api::article.article'
    >;
    title: Schema.Attribute.String;
  };
}

export interface ElementsContentDetails extends Struct.ComponentSchema {
  collectionName: 'components_elements_content_details';
  info: {
    displayName: 'Content Details';
  };
  attributes: {
    author: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    label: Schema.Attribute.String;
    publicationDate: Schema.Attribute.Date;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsLinkColumn extends Struct.ComponentSchema {
  collectionName: 'components_elements_link_columns';
  info: {
    displayName: 'Link Column';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.link-column-item', true>;
  };
}

export interface ElementsLinkColumnItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_link_column_items';
  info: {
    displayName: 'Link Column Item';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsTickerItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_ticker_items';
  info: {
    displayName: 'Ticker Item';
  };
  attributes: {
    link: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
    navigation: Schema.Attribute.Component<'elements.link', true>;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.author-section': BlocksAuthorSection;
      'blocks.featured-content-section': BlocksFeaturedContentSection;
      'blocks.footer': BlocksFooter;
      'blocks.footer-newsletter': BlocksFooterNewsletter;
      'blocks.hero-section': BlocksHeroSection;
      'blocks.magazine-ad': BlocksMagazineAd;
      'blocks.magazine-page-header': BlocksMagazinePageHeader;
      'blocks.news-ticker': BlocksNewsTicker;
      'blocks.newsletter-signup': BlocksNewsletterSignup;
      'blocks.podcast-section': BlocksPodcastSection;
      'blocks.popular-articles': BlocksPopularArticles;
      'elements.content-details': ElementsContentDetails;
      'elements.link': ElementsLink;
      'elements.link-column': ElementsLinkColumn;
      'elements.link-column-item': ElementsLinkColumnItem;
      'elements.social-link': ElementsSocialLink;
      'elements.ticker-item': ElementsTickerItem;
      'layout.header': LayoutHeader;
    }
  }
}
