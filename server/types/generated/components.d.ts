import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    newsTicker: Schema.Attribute.Component<'blocks.news-ticker', false>;
    title: Schema.Attribute.String;
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
    hideLinksOnHome: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
    navigation: Schema.Attribute.Component<'elements.link', true>;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.hero-section': BlocksHeroSection;
      'blocks.news-ticker': BlocksNewsTicker;
      'elements.link': ElementsLink;
      'elements.social-link': ElementsSocialLink;
      'elements.ticker-item': ElementsTickerItem;
      'layout.header': LayoutHeader;
    }
  }
}
