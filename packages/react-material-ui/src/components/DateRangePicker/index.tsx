import React, { useState, useRef, FieldsetHTMLAttributes } from 'react';
import {
  Box,
  Popover,
  Button,
  Typography,
  Grid,
  IconButton,
  SxProps,
  ClickAwayListener,
  FormHelperText,
  Stack,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {
  DateCalendar,
  PickersDay,
  PickersDayProps,
  PickersCalendarHeaderProps,
} from '@mui/x-date-pickers';
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

const CustomCalendarHeaderRoot = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 16px',
  alignItems: 'center',
});

function CustomStartCalendarHeader(props: PickersCalendarHeaderProps<Date>) {
  const { currentMonth } = props;

  const selectPreviousMonth = () => null;

  return (
    <CustomCalendarHeaderRoot>
      <Stack spacing={1} direction="row">
        <IconButton onClick={selectPreviousMonth} title="Previous month">
          <ChevronLeft />
        </IconButton>
      </Stack>
      <Typography variant="body2">
        {format(currentMonth, 'MMMM YYYY')}
      </Typography>
    </CustomCalendarHeaderRoot>
  );
}

function CustomEndCalendarHeader(props: PickersCalendarHeaderProps<Date>) {
  const { currentMonth } = props;

  const selectNextMonth = () => null;

  return (
    <CustomCalendarHeaderRoot>
      <Typography variant="body2">
        {format(currentMonth, 'MMMM YYYY')}
      </Typography>
      <Stack spacing={1} direction="row">
        <IconButton onClick={selectNextMonth} title="Next month">
          <ChevronRight />
        </IconButton>
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

const DateRangePicker = ({ label, error, ...props }: DateRangePickerProps) => {
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
  const [errorMessage, setErrorMessage] = useState('');

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
      ...dateRange,
      startDate: addDays(new Date(date), 1),
    });
    setErrorMessage(isAfterEndDate ? 'Invalid range' : '');
  };

  const handleEndDateChange = (date: string) => {
    const isBeforeStartDate =
      dateRange.startDate &&
      isBefore(addDays(new Date(date), 1), dateRange.startDate);

    setEndDateInputValue(date);
    setDateRange({
      ...dateRange,
      endDate: addDays(new Date(date), 1),
    });
    setErrorMessage(isBeforeStartDate ? 'Invalid range' : '');
  };

  const handleDateSelection = (date: Date | null) => {
    setDateRange((prev) => {
      if (dateSelectionMode === DateSelectionMode.FROM) {
        const isAfterEndDate = prev.endDate && date && date > prev.endDate;

        setErrorMessage(isAfterEndDate ? 'Invalid range' : '');
        setStartDateInputValue(date ? format(date, 'yyyy-MM-dd') : '');

        return { ...prev, startDate: date };
      } else if (dateSelectionMode === DateSelectionMode.TO) {
        const isBeforeStartDate =
          prev.startDate && date && date < prev.startDate;

        setErrorMessage(isBeforeStartDate ? 'Invalid range' : '');
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

  const renderDay = (props: PickersDayProps<Date>) => {
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
    const buttonRef =
      direction === 'previous'
        ? hiddenStartCalendarButtonRef
        : hiddenEndCalendarButtonRef;
    buttonRef?.current?.click();
  };

  return (
    <Box
      {...props}
      ref={fieldsetRef}
      component="fieldset"
      sx={{
        border: (theme) =>
          `1px solid ${
            error || errorMessage
              ? theme.palette.error.main
              : alpha(theme.palette.common.black, 0.23)
          }`,
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
            color: (theme) =>
              `${
                error || errorMessage
                  ? theme.palette.error.main
                  : alpha(theme.palette.common.black, 0.6)
              }`,
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
          data-testid="start-date-input"
        />
        <Typography
          sx={{ color: (theme) => alpha(theme.palette.common.black, 0.23) }}
        >
          -
        </Typography>
        <DateInput
          ref={endDateInputRef}
          value={endDateInputValue}
          onChange={(event) => handleEndDateChange(event.target.value)}
          data-testid="end-date-input"
        />
      </Box>

      {error || errorMessage ? (
        <FormHelperText
          sx={{
            marginTop: '12px',
            marginLeft: '4px',
            color: (theme) => theme.palette.error.main,
          }}
        >
          {error || errorMessage}
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
                    calendarHeader: CustomStartCalendarHeader,
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
                    calendarHeader: CustomEndCalendarHeader,
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

            <Box display="flex" justifyContent="end" width="100%">
              <Button
                onClick={() => {
                  setDateRange({
                    startDate: null,
                    endDate: null,
                  });
                  setStartDateInputValue('');
                  setEndDateInputValue('');
                }}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </ClickAwayListener>
      </Popover>
    </Box>
  );
};

export default DateRangePicker;
