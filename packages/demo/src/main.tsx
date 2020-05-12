/// <reference path="./types.d.ts" />

import React from 'react';

import blessed from 'neo-blessed';

import NashReconciler from '@thorough/nash-reconciler';

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'nash-reconciler hello world',
});

interface BoxProps {
  width?: string;
  height?: string;
  title?: string;
  border?: any; // TODO fix
}

const Box: React.FC<BoxProps> = ({ title, ...rest }) => {
  return <box {...(title && { label: ` ${title} ` })} {...rest} />;
};

const { render } = NashReconciler.withBlessed(blessed);

render(
  <layout width="100%" height="100%" layout="inline">
    <layout width="100%" height="100%-1" layout="inline">
      <Box
        title="Sidebar"
        border={{ type: 'line', fg: 'blue' }}
        width="20%"
        height="100%"
      >
        my first box
      </Box>
      <Box
        width="80%"
        title="Main"
        border={{ type: 'line', fg: 'blue' }}
        height="100%"
      >
        my second box
      </Box>
    </layout>
    <box
      width="100%"
      height={1}
      padding={{ left: 1, right: 1 }}
      style={{ bg: 'green', fg: 'white' }}
      content="Status Line"
    ></box>
  </layout>,
  { screen, blessed }
);

/** Close the program if Escape, q, or Control-C is pressed. */
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
