import type { Schema, Struct } from '@strapi/strapi';

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
      'elements.link': ElementsLink;
      'elements.social-link': ElementsSocialLink;
      'layout.header': LayoutHeader;
    }
  }
}
