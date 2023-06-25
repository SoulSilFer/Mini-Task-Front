import React from 'react';
import i18n from 'i18n';
import { ptBR, enUS } from 'date-fns/locale';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

type Props = {
  onChange: (date: Date) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
};

const Calendar: React.FC<Props> = ({
  onChange,
  disableFuture,
  disablePast
}) => {
  const findLocale = (locale: string) => {
    switch (locale) {
      case 'pt-BR':
        return ptBR;
      case 'en-US':
        return enUS;
      default:
        return ptBR;
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      locale={findLocale(i18n.language)}
      adapterLocale={findLocale(i18n.language)}
    >
      <StaticDatePicker
        slotProps={{
          toolbar: {
            hidden: true
          },
          actionBar: {
            sx: { display: 'none' }
          }
        }}
        onChange={(a: any) => onChange(a.$d)}
        disablePast={disablePast}
        disableFuture={disableFuture}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
