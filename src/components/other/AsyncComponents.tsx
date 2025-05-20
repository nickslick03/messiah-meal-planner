import React, { ReactNode } from 'react';

interface AsyncState {
  isPending: boolean;
  error: Error | null;
  data: unknown | null; // Use `unknown` for better type safety
}

interface IfPendingProps {
  state: AsyncState;
  children: ReactNode;
}

export const IfPending: React.FC<IfPendingProps> = ({ state, children }) => {
  return state.isPending ? <>{children}</> : null;
};

interface IfRejectedProps {
  state: AsyncState;
  children: ReactNode;
}

export const IfRejected: React.FC<IfRejectedProps> = ({ state, children }) => {
  return state.error ? <>{children}</> : null;
};

interface IfFulfilledProps {
  state: AsyncState;
  children: ReactNode;
}

export const IfFulfilled: React.FC<IfFulfilledProps> = ({
  state,
  children
}) => {
  return !state.isPending && !state.error ? <>{children}</> : null;
};
