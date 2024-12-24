# DateRangePicker

The DateRangePicker is a custom set of inputs that deal with a range of dates. It is composed by a fieldset with two inputs with type date inside, each one handling half of the date range.

## Example

The following example describes the full composition that mounts the Filter component:

```tsx
import { DateRangePicker } from '@concepta/react-material-ui';

<DateRangePicker
  label="Date range"
  error="Error message"
  sx={{ margin: '16px' }}
  onRangeUpdate={(range) => setDateRangeOnState(range)}
/>;
```

## Props

| Name | Type | Description | Optional |
| --- | --- | --- | --- |
| label | `string` | The label of the field, similar to MUI's `Input` | No
| error | `string` | Error message displayed on the bottom of the field | No
| sx | `object` | Custom styles to be applied to the fieldset container | No
| onRangeUpdate | `function` | Handler for updates in the date range. Returns an object containing `startDate` and `endDate` | No

> The rest of the DateRangePicker props extend from [HTML `fieldset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset).
