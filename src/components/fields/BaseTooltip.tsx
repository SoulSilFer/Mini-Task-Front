import {
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React from 'react';

interface TooltipBaseProps extends TooltipProps {
  tooltipContent?: string;
  tooltipContentArray?: string[];
  textColor?: string;
  styleNone?: string;
  backgroundColor?: string;
}

const BaseTooltip = styled(
  ({
    className,
    textColor,
    styleNone,
    backgroundColor,
    ...props
  }: TooltipBaseProps) => (
    <Tooltip
      {...props}
      title={
        <React.Fragment>
          <Typography color="primary">
            <b>{props.title}</b>
          </Typography>
          {props.tooltipContent}

          {props.tooltipContentArray &&
            props.tooltipContentArray.map((item, index) => (
              <Typography
                key={index}
                sx={{ color: textColor ? textColor : 'secondary' }}
                variant="body2"
              >
                <li
                  style={{ listStyleType: styleNone ? styleNone : 'initial' }}
                >
                  {item}
                </li>
              </Typography>
            ))}
        </React.Fragment>
      }
      classes={{ popper: className }}
    />
  )
)(({ theme, backgroundColor }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: backgroundColor ? backgroundColor : '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.8)',
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

export default BaseTooltip;
