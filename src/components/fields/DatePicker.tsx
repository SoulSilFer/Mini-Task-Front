import React from 'react';
import i18n from 'i18n';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR, enUS } from 'date-fns/locale';

type Props = {
  onChange: (date: Date) => void;
  label: string;
  disabled?: boolean;
};

const DatePickerValue: React.FC<Props> = ({ onChange, label, disabled }) => {
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
      <DatePicker
        label={label}
        onChange={(newValue: any) => onChange(newValue.$d)}
        format="DD/MM/YYYY"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.75rem',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main'
            }
          }
        }}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default DatePickerValue;
