import React from 'react';
import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';

import { BaseRootContext } from '../core';
import { useNotify } from './useNotify';
import { useNotificationContext } from './useNotificationContext';

const Notify = ({
  type = undefined,
  message,
  undoable,
  autoHideDuration,
  multiLine,
}: any) => {
  const notify = useNotify();
  useEffect(() => {
    notify(message, {
      type,
      undoable,
      autoHideDuration,
      multiLine,
    });
  }, [notify]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
};

const Notifications = () => {
  const { notifications } = useNotificationContext();
  return <span>{JSON.stringify(notifications)}</span>;
};

describe('useNotify', () => {
  it('should show a multiline notification message', () => {
    render(
      <BaseRootContext>
        <Notify
          type="info"
          message={`One Line\nTwo Lines\nThree Lines`}
          multiLine
        />
        <Notifications />
      </BaseRootContext>
    );
    screen.getByText(
      JSON.stringify([
        {
          message: 'One Line\nTwo Lines\nThree Lines',
          type: 'info',
          notificationOptions: {
            multiLine: true,
          },
        },
      ])
    );
  });

  it('should show a notification message of type "warning"', () => {
    render(
      <BaseRootContext>
        <Notify
          type="warning"
          message="Notification message"
          autoHideDuration={4000}
        />
        <Notifications />
      </BaseRootContext>
    );
    screen.getByText(
      JSON.stringify([
        {
          message: 'Notification message',
          type: 'warning',
          notificationOptions: {
            autoHideDuration: 4000,
          },
        },
      ])
    );
  });

  it('should show a notification when no type is assigned', () => {
    render(
      <BaseRootContext>
        <Notify message="Notification message" />
        <Notifications />
      </BaseRootContext>
    );
    screen.getByText(
      JSON.stringify([
        {
          message: 'Notification message',
          type: 'info',
          notificationOptions: {},
        },
      ])
    );
  });
});
