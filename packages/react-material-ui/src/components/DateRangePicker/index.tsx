import React, { useState, useRef, FieldsetHTMLAttributes } from 'react';
import {
  Box,
  Popover,
  Typography,
  Grid,
  IconButton,
  SxProps,
  ClickAwayListener,
  FormHelperText,
} from '@mui/material';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import {
  isWithinInterval,
  isSameDay,
  format,
  startOfDay,
  endOfDay,
  addMonths,
  addDays,
  isBefore,
  isAfter,
} from 'date-fns';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import DateInput from './DateInput';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

enum DateSelectionMode {
  FROM = 'from',
  TO = 'to',
}

export type DateRangePickerProps = {
  label?: string;
  sx?: SxProps;
  error?: string;
} & FieldsetHTMLAttributes<HTMLFieldSetElement>;

const hiddenButtonSx = {
  visibility: 'hidden',
  display: 'none',
};

const DateRangePicker = ({
  label,
  sx,
  error,
  ...props
}: DateRangePickerProps) => {
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  const hiddenStartCalendarButtonRef = useRef<HTMLButtonElement>(null);
  const leftArrowButtonRef = useRef<HTMLButtonElement>(null);
  const hiddenEndCalendarButtonRef = useRef<HTMLButtonElement>(null);
  const rightArrowButtonRef = useRef<HTMLButtonElement>(null);

  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [startDateInputValue, setStartDateInputValue] = useState('');
  const [endDateInputValue, setEndDateInputValue] = useState('');
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [dateSelectionMode, setDateSelectionMode] = useState<DateSelectionMode>(
    DateSelectionMode.FROM,
  );

  const handleOpen = () => {
    startDateInputRef?.current?.focus();
    setAnchorEl(fieldsetRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setHoveredDate(null); // Reset hover state
  };

  const open = Boolean(anchorEl);

  const isDateInRange = (date: Date) => {
    const { startDate, endDate } = dateRange;

    if (startDate && endDate) {
      return isWithinInterval(date, {
        start: startOfDay(startDate),
        end: endOfDay(endDate),
      });
    }

    if (startDate && hoveredDate) {
      return isWithinInterval(date, {
        start: startOfDay(startDate),
        end: endOfDay(hoveredDate),
      });
    }
    return false;
  };

  const handleStartDateChange = (date: string) => {
    const isAfterEndDate =
      dateRange.endDate &&
      isAfter(addDays(new Date(date), 1), dateRange.endDate);

    setStartDateInputValue(date);
    setDateRange({
      startDate: addDays(new Date(date), 1),
      endDate: isAfterEndDate ? null : dateRange.endDate,
    });

    if (isAfterEndDate) {
      setEndDateInputValue('');
    }
  };

  const handleEndDateChange = (date: string) => {
    const isBeforeStartDate =
      dateRange.startDate &&
      isBefore(addDays(new Date(date), 1), dateRange.startDate);

    setEndDateInputValue(date);
    setDateRange({
      startDate: isBeforeStartDate ? null : dateRange.startDate,
      endDate: addDays(new Date(date), 1),
    });

    if (isBeforeStartDate) {
      setStartDateInputValue('');
    }
  };

  const handleDateSelection = (date: Date | null) => {
    setDateRange((prev) => {
      if (dateSelectionMode === DateSelectionMode.FROM) {
        if (prev.endDate && date && date > prev.endDate) {
          // If "from" date is after the current "to" date, clear "to" date
          setStartDateInputValue(format(date, 'yyyy-MM-dd'));
          setEndDateInputValue('');

          return { startDate: date, endDate: null };
        }

        setStartDateInputValue(date ? format(date, 'yyyy-MM-dd') : '');

        return { ...prev, startDate: date };
      } else if (dateSelectionMode === DateSelectionMode.TO) {
        if (prev.startDate && date && date < prev.startDate) {
          // If "to" date is before the "from" date, reset selection to "from"
          setEndDateInputValue(format(date, 'yyyy-MM-dd'));
          setStartDateInputValue('');

          return { startDate: null, endDate: date };
        }

        setEndDateInputValue(date ? format(date, 'yyyy-MM-dd') : '');

        return { ...prev, endDate: date };
      }

      return prev;
    });

    // Toggle the selection mode after a date is selected
    setDateSelectionMode((prev) =>
      prev === DateSelectionMode.FROM
        ? DateSelectionMode.TO
        : DateSelectionMode.FROM,
    );
    setHoveredDate(null);
  };

  const renderDay = (props: any) => {
    const isSelected =
      (dateRange.startDate && isSameDay(props.day, dateRange.startDate)) ||
      (dateRange.endDate && isSameDay(props.day, dateRange.endDate));
    const isInRange = isDateInRange(props.day);

    return (
      <PickersDay
        {...props}
        disableMargin
        sx={{
          backgroundColor: isSelected
            ? 'primary.main'
            : !isSelected && isInRange
            ? 'primary.light'
            : undefined,
          color:
            isSelected || (!isSelected && isInRange)
              ? 'common.white'
              : undefined,
          '&:hover': {
            backgroundColor: !isSelected && 'primary.light',
          },
          borderRadius: '50%',
        }}
        onMouseEnter={() => {
          if (dateRange.startDate && !dateRange.endDate) {
            setHoveredDate(props.day);
          }
        }}
      />
    );
  };

  const handleMonthChange = (direction: 'next' | 'previous') => {
    if (direction === 'previous') {
      hiddenStartCalendarButtonRef?.current?.click();
    }

    if (direction === 'next') {
      hiddenEndCalendarButtonRef?.current?.click();
    }
  };

  return (
    <Box
      {...props}
      ref={fieldsetRef}
      component="fieldset"
      sx={{
        border: `1px solid ${error ? '#d32f2f' : 'rgba(0, 0, 0, 0.23);'}`,
        borderRadius: '4px',
        width: 'fit-content',
        height: '40px',
        fontSize: '1rem',
        padding: '8px',
        position: 'relative',
      }}
      onClick={handleOpen}
      aria-invalid={Boolean(error)}
    >
      {label && (
        <Typography
          component="legend"
          sx={{
            lineHeight: 1,
            fontSize: '12px',
            padding: '2px 4px',
            color: `${error ? '#d32f2f' : 'rgba(0, 0, 0, 0.6);'}`,
            height: '14px',
            float: 'unset',
            position: 'absolute',
            top: '-8px',
            background: 'white',
          }}
        >
          {label}
        </Typography>
      )}

      <Box display="flex">
        <DateInput
          ref={startDateInputRef}
          value={startDateInputValue}
          onChange={(event) => handleStartDateChange(event.target.value)}
        />
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>-</Typography>
        <DateInput
          ref={endDateInputRef}
          value={endDateInputValue}
          onChange={(event) => handleEndDateChange(event.target.value)}
        />
      </Box>

      {error ? (
        <FormHelperText
          sx={{
            marginTop: '12px',
            marginLeft: '4px',
            color: '#d32f2f',
          }}
        >
          {error}
        </FormHelperText>
      ) : null}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Select Date Range
            </Typography>

            <Grid container spacing={2}>
              {/* From Calendar */}
              <Grid item xs={6}>
                <DateCalendar
                  // value={dateRange.startDate}
                  onChange={handleDateSelection}
                  slots={{
                    day: (date) => renderDay(date),
                    leftArrowIcon: () => (
                      <IconButton
                        ref={leftArrowButtonRef}
                        onClick={() => handleMonthChange('previous')}
                      >
                        <ChevronLeft />
                      </IconButton>
                    ),
                    rightArrowIcon: () => (
                      <IconButton
                        ref={hiddenEndCalendarButtonRef}
                        sx={hiddenButtonSx}
                      />
                    ),
                  }}
                  referenceDate={dateRange.startDate || new Date()}
                  minDate={
                    dateSelectionMode === DateSelectionMode.TO
                      ? dateRange.startDate || undefined
                      : undefined
                  }
                />
              </Grid>

              {/* To Calendar */}
              <Grid item xs={6}>
                <DateCalendar
                  // value={dateRange.endDate}
                  onChange={handleDateSelection}
                  slots={{
                    day: (date) => renderDay(date),
                    leftArrowIcon: () => (
                      <IconButton
                        ref={hiddenStartCalendarButtonRef}
                        sx={hiddenButtonSx}
                      />
                    ),
                    rightArrowIcon: () => (
                      <IconButton
                        ref={rightArrowButtonRef}
                        onClick={() => handleMonthChange('next')}
                      >
                        <ChevronRight />
                      </IconButton>
                    ),
                  }}
                  referenceDate={addMonths(
                    dateRange.startDate || new Date(),
                    1,
                  )}
                  minDate={
                    dateSelectionMode === DateSelectionMode.TO
                      ? dateRange.startDate || undefined
                      : undefined
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </ClickAwayListener>
      </Popover>
    </Box>
  );
};

export default DateRangePicker;
