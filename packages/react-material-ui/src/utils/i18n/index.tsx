import * as React from 'react';
import { IntlProvider } from 'react-intl';

const messages = {
  simple: 'Hello world',
  placeholder: 'Hello {name}',
  date: 'Hello {ts, date}',
  time: 'Hello {ts, time}',
  number: 'Hello {num, number}',
  plural: 'I have {num, plural, one {# dog} other {# dogs}}',
  select: 'I am a {gender, select, male {boy} female {girl}}',
  selectordinal: `I am the {order, selectordinal,
        one {#st person}
        two {#nd person}
        =3 {#rd person}
        other {#th person}
    }`,
  richtext: 'I have <bold>{num, plural, one {# dog} other {# dogs}}</bold>',
  richertext:
    'I have & < &nbsp; <bold>{num, plural, one {# & dog} other {# dogs}}</bold>',
  unicode: 'Hello\u0020{placeholder}',
};

export const withTranslations = (BaseComponent) => {
  const TranslatedComponent = (props) => {
    return (
      <IntlProvider locale="en" messages={messages}>
        <BaseComponent {...props} />
      </IntlProvider>
    );
  };

  return TranslatedComponent;
};
