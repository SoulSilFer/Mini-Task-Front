import React, { Fragment, MouseEventHandler, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { AddAlertRounded } from '@mui/icons-material';

export interface SelectFieldBaseProps {
  label: string;
  placeholder?: string;
  name: string;
  value: string | number | boolean;
  margin?: 'none' | 'normal' | 'dense';
  id: string;
  autoComplete?: string;
  fullWidth: boolean;
  sx?: any;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: SelectChangeEvent<unknown>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  shrink?: boolean;
  helperText?: string;
  error?: boolean;
  inputProps?: object;
  tooltipTitle?: string;
  tooltipContent?: string;
  editabled?: boolean;
  data?: [string | number, string | number][];
  defaultValue?: string | number;
  size?: 'small' | 'medium' | undefined;
  onClick?: MouseEventHandler<HTMLDivElement>;
  fullItem?: boolean;
}

function labelField(props: any) {
  const { label } = props;
  return <Fragment>{label}</Fragment>;
}

const SelectField: React.FC<SelectFieldBaseProps> = ({
  id,
  fullWidth,
  label,
  value,
  name,
  margin,
  onChange,
  data,
  tooltipTitle,
  tooltipContent,
  editabled,
  disabled,
  defaultValue,
  required,
  size,
  onClick,
  fullItem,
  ...rest
}) => {
  const [editCheck, setEditCheck] = useState<boolean>(false);

  const icons = editabled === true ? '45px !important' : '';
  const handleClickEdit = () => {
    setEditCheck(!editCheck);
  };

  const editableField = (editabled?: boolean) => {
    return (
      <InputAdornment position="end">
        {editabled && (
          <IconButton onClick={handleClickEdit} edge="end">
            <ModeEditIcon />
          </IconButton>
        )}
      </InputAdornment>
    );
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      margin={margin}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'primary',
          borderWidth: 2,
          borderRadius: 4
        },

        '& .MuiFormLabel-root': {
          display: 'flex',
          alignItems: 'center',

          '& .helpIcon': {
            paddingLeft: '8px',
            fontSize: 30,
            order: 999
          }
        },
        ...rest.sx
      }}
      focused
      size={size}
    >
      <InputLabel
        id={`${id}-label`}
        shrink={true}
        disabled={disabled || (editabled && !editCheck)}
        required={required}
      >
        {labelField({
          label: label,
          tooltipTitle: tooltipTitle,
          tooltipContent: tooltipContent
        })}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={`${id}-select`}
        name={name}
        value={value}
        label={labelField({
          label: label,
          tooltipTitle: tooltipTitle,
          tooltipContent: tooltipContent
        })}
        onChange={onChange}
        {...rest}
        sx={{
          '& .MuiSelect-icon': {
            right: icons
          }
        }}
        endAdornment={editableField(editabled)}
        disabled={disabled || (editabled && !editCheck)}
        defaultValue={defaultValue}
        onClick={onClick}
      >
        {data &&
          data.map((item, index) => (
            <MenuItem
              value={!fullItem ? item[1] : item[0]}
              key={`${id}-select-${index}`}
            >
              {!fullItem ? (
                <>{item[0]}</>
              ) : (
                <>
                  {item[0]} - {item[1]}
                </>
              )}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
