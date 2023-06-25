import React, { ChangeEvent, useState } from 'react';

import { Box, Typography, Checkbox, styled, IconButton } from '@mui/material';
import {
  ArrowDownwardRounded,
  EditAttributesRounded,
  EditRounded
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const HeadContainer = styled(Box)(({ theme }) => ({
  borderRadius: '0.75rem',
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.dark,
  width: '100%',
  padding: '0.25rem',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[2],
    cursor: 'pointer'
  },

  '& .checkboxC': {
    color: theme.palette.primary.contrastText
  }
}));

type Props = {
  title: string;
  details?: string;
  checked: boolean;
  setChecked: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  mb?: number | string;
  mt?: number | string;
  beginDate: string;
  endDate: string;
  disabled: boolean;
  setDelete: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  deleteChecked: boolean;
  editable?: boolean;
  setEdit?: () => void;
};

const ToDoListCard: React.FC<Props> = ({
  checked,
  setChecked,
  title,
  details,
  mb,
  mt,
  beginDate,
  endDate,
  disabled,
  setDelete,
  deleteChecked,
  editable,
  setEdit
}) => {
  const { t } = useTranslation();

  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <Box
      mb={mb}
      mt={mt}
      sx={{
        maxWidth: '800px',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <HeadContainer>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          sx={{
            ...(!disabled
              ? {
                  '& .MuiSvgIcon-root': {
                    color: 'primary.contrastText'
                  }
                }
              : {
                  '& .MuiSvgIcon-root': {
                    color: 'primary.main'
                  }
                })
          }}
          disabled={disabled}
        />

        <Typography variant="h5" color="primary.contrastText">
          {title}
        </Typography>

        {disabled ? (
          <Checkbox
            checked={deleteChecked}
            onChange={setDelete}
            sx={{
              position: 'absolute',
              right: '0.25rem',
              top: '0.25rem',
              cursor: 'pointer',

              '& .MuiSvgIcon-root': {
                color: 'primary.contrastText'
              }
            }}
          />
        ) : (
          <>
            {editable && (
              <IconButton
                sx={{
                  position: 'absolute',
                  right: '3.25rem',
                  top: '0.25rem',
                  cursor: 'pointer',

                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
                onClick={setEdit}
              >
                <EditRounded sx={{ color: 'primary.contrastText' }} />
              </IconButton>
            )}

            <IconButton
              sx={{
                position: 'absolute',
                right: '0.25rem',
                top: '0.25rem',
                cursor: 'pointer',
                ...(showDetails
                  ? {
                      animation: 'rotateDown 0.2s ease-in-out',
                      '@keyframes rotateDown': {
                        '0%': {
                          transform: 'rotate(0deg)'
                        },
                        '100%': {
                          transform: 'rotate(180deg)'
                        }
                      },
                      transform: 'rotate(180deg)'
                    }
                  : {
                      animation: 'rotateUp 0.2s ease-in-out',
                      '@keyframes rotateUp': {
                        '0%': {
                          transform: 'rotate(180deg)'
                        },
                        '100%': {
                          transform: 'rotate(0deg)'
                        }
                      }
                    }),

                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
              onClick={() => {
                setShowDetails(!showDetails);
              }}
            >
              <ArrowDownwardRounded
                sx={{
                  color: 'primary.contrastText'
                }}
              />
            </IconButton>
          </>
        )}
      </HeadContainer>

      <Box
        sx={{
          opacity: showDetails ? 1 : 0,
          visibility: showDetails ? 'visible' : 'hidden',
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'primary.main',
          width: '80%',
          borderRadius: '0px 0px 0.75rem 0.75rem',
          p: showDetails ? 1 : '0px',
          height: showDetails ? 'auto' : '0px'
        }}
      >
        {beginDate && (
          <Typography ml={2} variant="body1" color="primary.contrastText">
            {`${t('createAt')} ${beginDate}`}
          </Typography>
        )}

        {endDate && (
          <Typography ml={2} variant="body2" color="primary.contrastText">
            {`${t('finalizedAt')} ${endDate}`}
          </Typography>
        )}

        {details && (
          <Typography color="primary.contrastText" variant="body2">
            {details}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ToDoListCard;
