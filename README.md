# Littlejohn (a Robinhood mock)

![Toggling Timeframes](https://github.com/zebranrain/jason-service/blob/master/images/01_timeframes.gif)

Littlejohn is an interactive stock chart, modeled after the one at Robinhood.com. It may not be as handsome as Robinhood, but it's every bit as brave and true.

It makes calls to an endpoint serving historical stock price data and renders this data as a simple line chart. The user can toggle between timeframes (e.g. 1D, 1W), and the chart is dynamically updated with datapoints for that timeframe.

For a charting library, Littlejohn uses react-vis (//add link). While a little light on documentation, react-vis is a powerful and flexible library that looks pretty great right out of the box. As the name implies, it's fully integrated into the React API. Incidentally, that makes it perfect for this project, which is built in React.

![Slider and Ticker](https://github.com/zebranrain/jason-service/blob/master/images/02_slider.gif)

The chart offers some compelling interactivity: As the user hovers over the chart area, a vertical line (react-vis calls it a 'crosshair') moves with the cursor, reporting the date and/or time associated with each point. As the crosshair moves, an animated price ticker rapidly updates, reporting the price at each point.

Also displayed are dynamic change indicators, showing the dollar and percentage change in the price from the beginning of the period to the crosshair location. 

![Increases and Decreases](https://github.com/zebranrain/jason-service/blob/master/images/03_increase-decrease.gif)

By default (i.e. if the user isn't moving the mouse in the chart area), the change values reflect the change from the beginning to the end of the selected timeframe. The whole chart responds to these values as well, by showing a green line series if the price increased over the timeframe and a red line if it decreased.

## Related Projects

  - https://github.com/zebranrain/jason-service-2 > A duplicate using the Odometer package
  - https://github.com/zebranrain/tj-service > An Analyst Recommendation widget

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> To render data for a particular ticker, simply add the desired ticker symbol (e.g. AAPL) to the root URL. React Router will ensure that you aren't redirected and a GET request will be sent via Axios to the endpoint, with the ticker symbol and current timeframe as query parameters.

![Ticker API](https://github.com/zebranrain/jason-service/blob/master/images/04_ticker-api.gif)

> When the API receives the request, it queries a Postgres database using the provided ticker and timeframe, retrieving price data at the appropriate interval and back to the appropriate date. For the 1D and 1W intervals, records are fetched at a 5-minute interval. For the 1M, 3M, 1Y, and 5Y intervals, records are fetched at a 1-day interval. Note that for the 1W interval, only 10-minute intervals are sent back to the client. Likewise, for the 5Y interval, only 1-week intervals are sent back. This is simply because smaller intervals aren't visually useful at those scales.

> Once you receive price data back from the API, it's reformatted into x and y values for easy consumption by react-vis and passed as props to the chart. That's it!

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.12.0
- Postgres

## Installing Dependencies

From within the root directory:

```sh
npm install
```

