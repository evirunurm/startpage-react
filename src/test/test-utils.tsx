import React from 'react'
import { render } from '@testing-library/react'
import AllTheProviders from './all-providers'


interface CustomRenderOptions extends Omit<Parameters<typeof render>[1], 'wrapper'> { }

const customRender = (ui: React.ReactElement, options?: CustomRenderOptions) =>
	render(ui, { wrapper: AllTheProviders, ...options })

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/jest-dom/vitest';
export { customRender as render }