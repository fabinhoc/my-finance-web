import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'pt-BR',
    globalInjection: true,
    messages,
    numberFormats: {
      'pt-BR': {
        currency: {
          style: 'currency',
          currency: 'BRL',
          useGrouping: true,
          currencyDisplay: 'symbol',
        },
        decimal: {
          style: 'decimal',
          minimumSignificantDigits: 3,
          maximumSignificantDigits: 5,
        },
        percent: {
          style: 'percent',
          useGrouping: false,
        },
      },
      'en-US': {
        currency: {
          style: 'currency',
          currency: 'USD',
          notation: 'standard',
        },
        decimal: {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
        percent: {
          style: 'percent',
          useGrouping: false,
        },
      },
    },
    datetimeFormats: {
      'en-US': {
        short: {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        },
        long: {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        },
      },
      'pt-BR': {
        short: {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        },
        long: {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        },
      },
    },
  });

  // Set i18n instance on app
  app.use(i18n);
});
